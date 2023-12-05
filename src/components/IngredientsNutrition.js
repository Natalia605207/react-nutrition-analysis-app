export const IngredientsNutrition = ({ myNutrition }) => {
    return (
        <div className="column">
            <div className="headingBackground">
            {
                myNutrition && <h2>Ingredients Information</h2>
            }
            </div>
            <table>
                <thead>
                <tr>
                    <th className="head">Qty</th>
                    <th className="head">Unit</th>
                    <th className="head">Food</th>
                    <th className="head">Calories</th>
                    <th className="head">Weight</th>
                </tr>
                </thead>
                <tbody>
                {myNutrition.ingredients.map((food, index) => {
                    return (
                        <tr key={index}>
                            <td className="row">{food.parsed[0].quantity}</td>
                            <td className="row">{food.parsed[0].measure}</td>
                            <td className="row">{food.parsed[0].foodMatch}</td>
                            <td className="row">{(food.parsed[0].nutrients.ENERC_KCAL.quantity).toFixed()}</td>
                            <td className="row">{(food.parsed[0].weight).toFixed()}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div className="container margin">
            {
                myNutrition && <p className="totalInfo">Total calories: <span className="totalNumbers">{myNutrition.calories}</span> kcal</p>
            }
            {
                myNutrition && <p className="totalInfo">Total weight: <span className="totalNumbers">{(myNutrition.totalWeight).toFixed()}</span> g</p>
            }
            </div>
        </div>
    )
}