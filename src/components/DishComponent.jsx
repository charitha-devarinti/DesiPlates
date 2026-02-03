import { useState, useContext } from "react";
import { DishContext } from "../context/DishContext";


const DishCard = ({ dish }) => {
    const { dishes, setVisibleCount } = useContext(DishContext)

    const [showmore, setShowMore] = useState(false);

    const stateColors = {
        AP: "#E91E63",
        TS: "#9C27B0",
        PB: "#FF9800",
        RJ: "#795548",
        KL: "#2E7D32"
    }

    const badgeColor = stateColors[dish.stateId] || "#666"

    const showmoreFun = () => {
        setShowMore(prev => !prev)
    }

    const scrollToCombo = (targetId) => {
        const element = document.getElementById(targetId);

        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: 'center' });
            element.classList.add('flash-highlight');
            setTimeout(() => element.classList.remove('flash-highlight'), 2000)
        } else {
            const targetIndex = dishes.findIndex((d) => d.id === targetId)

            if (targetIndex !== -1) {
                setVisibleCount(prev => Math.max(prev, targetIndex + 1));
                setTimeout(() => {
                    const newElement = document.getElementById(targetId);
                    if (newElement) {
                        newElement.scrollIntoView({ behavior: "smooth", block: 'center' });
                        newElement.classList.add('flash-highlight');
                        setTimeout(() => newElement.classList.remove('flash-highlight'), 2000);
                    }
                }, 500)
            }
        }

    }

    return (
        <>
            <div className='dishCard' id={dish.id}>
                <div className="image-container">
                    <img className="dish-image" src={dish.image} loading="lazy" />

                    <div className="rating-badge">
                        <span className="star-icon">★</span>
                        <span className="dish-rating">{dish.rating}</span>
                    </div>
                    <div className="state-badge" style={{ backgroundColor: badgeColor }}><strong>{dish.state}</strong></div>
                </div>

                <div className="dish-info">
                    <p style={{ fontSize: '18px' }}>{dish.dishName}</p>
                    <p className="price-text" style={{ fontSize: '20px', fontWeight: 'bold', margin: '10px 0', color: badgeColor }}> ₹ {dish.price}</p>
                    <p style={{ color: '#666', fontSize: '12px', margin: '4px 0' }}>📍{dish.place}</p>
                    <p className="combo-box">
                        <strong>Best with: </strong>
                        {dish.pairingIds && dish.pairingIds.length > 0 ? (
                            dish.pairingIds.map((pId) => {
                                const pairedDish = dishes.find((d) => d.id === pId);
                                return (
                                    <span key={pId} className="combo-link" onClick={() => scrollToCombo(pId)}>
                                        {pairedDish ? pairedDish.dishName : dish.combosBestFor} ➔
                                    </span>
                                )
                            })
                        ) : (
                            // if there is no pairing ids
                            <span>{dish.combosBestFor}</span>
                        )
                        }
                    </p>

                    <p onClick={showmoreFun} style={{textDecoration:'underline'}}>{showmore ? 'Show less' : 'View Details'}</p>

                    {
                        showmore && (
                            <div className="extra-info">
                                <p style={{ fontSize: '13px', color: '#444' }}><strong>Description: </strong>{dish.description}</p>
                                <p><strong>Category: </strong>{dish.category}  ({dish.diet})</p>
                                
                                <p style={{textDecoration:'none'}}><strong>Quantity: </strong>{dish.quantity}</p>



                            </div>
                        )
                    }




                </div>

                <button className='add-cart-btn'>Add to Cart</button>

            </div>

        </>
    );
}

export default DishCard;