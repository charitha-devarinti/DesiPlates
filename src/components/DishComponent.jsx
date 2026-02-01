const DishCard = ({ dish }) => {
    return (
        <>
            <div className='dishCard'>
                <img  className="dish-image" src={dish.image} loading="lazy"/>
                <div className="dish-info">
                     <p><strong>Name:</strong>{dish.dishName}</p>
                      <p className="price-text"><strong>Price: {dish.price}</strong></p>
                     <p><strong>Rating: </strong>{dish.rating}</p>
                    <p><strong>Place: </strong> {dish.place}</p>
                    <p><strong>Description: </strong>{dish.description}</p>
                   
                    <p><strong>Category: </strong>{dish.category}</p>
                    <p><strong>Suggested Combo: </strong>{dish.combosBestFor}</p>
                   
                </div>

                <button className='add-cart-btn'>Add to Cart</button>

            </div>

        </>
    );
}

export default DishCard;