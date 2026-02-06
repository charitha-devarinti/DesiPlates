import { useState, useContext } from "react";
import { DishContext } from "../context/DishContext";


const DishCard = ({ dish }) => {
    const { dishes, setVisibleCount, handleClearAll } = useContext(DishContext)

    const [showmore, setShowMore] = useState(false);

    const stateColors = {
        AP: "var(--color-state-ap)",
        TS: "var(--color-state-ts)",
        PB: "var(--color-state-pb)",
        RJ: "var(--color-state-rj)",
        KL: "var(--color-state-kl)"
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

            handleClearAll()// here it is used when user uses many filters like telangana,evening,curries=> then this show that respective
            //dishes only  in that when we click on combo link it will not work so by using " handleClearAll()" function we are reseting all filters so all dishes will show in that the combo we will find out
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
        <div className='dishCard' id={dish.id}>
            <div className="image-container">
                <img className="dish-image" src={dish.image} loading="lazy" alt={dish.dishName} />

                <div className="rating-badge">
                    <span className="star-icon">★</span>
                    <span className="dish-rating">{dish.rating}</span>
                </div>
                <div className="state-badge" style={{ backgroundColor: badgeColor }}>
                    <strong>{dish.state}</strong>
                </div>
            </div>

            <div className="dish-info">
                <p className="dish-name">{dish.dishName}</p>
                <p className="dish-price" style={{ color: badgeColor }}>₹ {dish.price}</p>
                <p className="dish-place">📍 {dish.place}</p>
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
                        <span>{dish.combosBestFor}</span>
                    )
                    }
                </p>

                <p className="view-details-toggle" onClick={showmoreFun}>
                    {showmore ? 'Show less' : 'View Details'}
                </p>

                {
                    showmore && (
                        <div className="extra-info">
                            <p><strong>Description: </strong>{dish.description}</p>
                            <p><strong>Category: </strong>{dish.category} ({dish.diet})</p>
                            <p><strong>Quantity: </strong>{dish.quantity}</p>
                        </div>
                    )
                }
            </div>

            <button className='add-cart-btn'>Add to Cart</button>
        </div>
    );
}

export default DishCard;
