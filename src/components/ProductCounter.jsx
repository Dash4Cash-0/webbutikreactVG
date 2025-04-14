import '../css/productcounter.css'
import {useEffect, useRef, useState} from "react";
import {Popover} from 'bootstrap'

function ProductCounter({product}) {

    const [value, setValue] = useState(1);
    const decrementBtnRef = useRef(null);
    const popoverInstance = useRef(null);

    useEffect(() => {
        if (decrementBtnRef.current) {
            popoverInstance.current = new Popover(decrementBtnRef.current, {
                content: "Please remove the product from the cart",
                placement: "top",
                trigger: "manual",
            })
        }
    }, []);

    const updateCartInStorage = (newQuantity) => {
        const cart = JSON.parse(localStorage.getItem("ordered-products") || []);
        const updatedCart = cart.map(item => item.id === product.id ? {...item, quantity: newQuantity } : item);

        localStorage.setItem('ordered-products', JSON.stringify(updatedCart));
        window.dispatchEvent(new CustomEvent('cart-updated'))
    }



    const increment = () => {
        const newValue = value + 1;
        setValue(newValue);
        updateCartInStorage(newValue);

    };

    const decrement = () => {
            const newValue = value - 1;
            if (newValue < 1) {
                if(popoverInstance.current) {
                    popoverInstance.current.show();
                    setTimeout(() =>
                    {popoverInstance.current.hide();}, 3000);
                }
                return;
            }
            setValue(newValue);
            updateCartInStorage(newValue);

    };

    return (
        <>
            <div className="product-counter">
                <button
                    className="decrement"
                    onClick={decrement}
                    ref={decrementBtnRef}
                    data-bs-toggle="popover">-</button>

                <input type="number" className="amount" value={value} min="1" readOnly/>
                <button className="increment" onClick={increment}>+</button>
            </div>

        </>
    )
}

export default ProductCounter;