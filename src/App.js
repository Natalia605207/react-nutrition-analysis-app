import { useState, useEffect } from "react";
import './App.css';
import { Nutrition } from "./components/Nutrition";
import { LoaderPage } from "./Loader/LoaderPage";
import video from './assets/salad.mp4';
import { IngredientsNutrition } from "./components/IngredientsNutrition";
import Swal from "sweetalert2";

function App() {

  const [mySearch, setMySearch] = useState();
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [myNutrition, setMyNutrition] = useState();
  const [stateLoader, setStateLoader] = useState(false);

  const APP_ID = '88745f9f';
  const APP_KEY = '44daed35286b7c6b74e03343a896677e';
  const APP_URL = 'https://api.edamam.com/api/nutrition-details';

  const fetchData = async (ingr) => {
    setStateLoader(true);
    const response = await fetch(`${APP_URL}?app_id=${APP_ID}&app_key=${APP_KEY}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingr: ingr })
    })

    if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setMyNutrition(data);
    } else {
      setStateLoader(false);
      Swal.fire({
        title: "Check the ingredients!",
        text: "They are entered incorrectly.",
        icon: "warning",
        confirmButtonColor: "#39aa20",
        confirmButtonText: "OK!"
      });
    }
  }

  const myRecipeSearch = e => {
    setMySearch(e.target.value);
  }

  const finalSearch = e => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  useEffect(() => {
    if (wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  }, [wordSubmitted])

  return (
    <div>
      <video autoPlay muted loop>
        <source src={video} type='video/mp4'/>
      </video>

      {stateLoader && <LoaderPage />}

      <div className="heading">
      <h1>Nutrition Analysis</h1>
      </div>
      <form className="container" onSubmit={finalSearch}>
        <input
          placeholder="Example: 150 g chicken, 10 tomatoes ..."
          onChange={myRecipeSearch}
          className="search"
        />
        </form>
        <div className="container">
        <button onClick={finalSearch} type="submit" className="btn">Analyze</button>
        </div>
      <div>
      <div className="container">
        {
          myNutrition && <IngredientsNutrition myNutrition={myNutrition}/>
        }
        </div>
        <div className="container">
        <div className="column">
        <div className="headingBackground">
        {
          myNutrition && <h2>Nutrition Facts</h2>
        }
        </div>
        {
          myNutrition && <p className="subheader"><span>*</span>Amount Per Serving</p>
        }
        {
          myNutrition && Object.values(myNutrition.totalNutrients)
            .map(({ label, quantity, unit }, index) =>
              <Nutrition key={index}
                label={label}
                quantity={quantity}
                unit={unit}
              />
            )
        }
        </div>
        </div>
        <div className="footer">
        <p className="bottomInfo">Developed by <a className="reference" href="https://natalia-musikhina-portfolio.glitch.me/" target="_blank" rel="noreferrer">Natalia Musikhina</a></p>
        <p className="bottomInfo">Powered by <a className="reference" href="https://www.edamam.com/" target="_blank" rel="noreferrer">www.edamam.com</a></p>
        </div>
      </div>
    </div>
  );
}

export default App;
