const DishCard = ({dish}) => {
    return ( 
        <>
               <div className='dishCard'>
                       <img className="dish-image" src={dish.image}/>
                       <p><strong>Place: </strong> {dish.place}</p>
                       <p><strong>Description: </strong>{dish.description}</p>
                       <p><strong>Price: </strong>{dish.price}</p>
                       <p><strong>Category: </strong>{dish.category}</p>
                       <p><strong>Suggested Combo: </strong>{dish.combosBestFor}</p>
                       <p><strong>Rating: </strong>{dish.rating}</p>
                       <button className='add-cart-btn'>Add to Cart</button>

                    </div>

        </>
     );
}
 
export default DishCard;