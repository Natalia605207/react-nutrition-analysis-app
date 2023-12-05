export const Nutrition = ({ label, quantity, unit }) => {
    return (
        <div>
            <p className="nutritionFacts"><span className="bold">{label}:</span> {quantity} {unit}</p>
            <hr />
        </div>
    )
}