import '../css/navbar.css'
import carticon from '../assets/carticon.svg'
import ProductCounter from '../components/ProductCounter'
import {useEffect, useState} from "react";

function NavBar() {

    const [cartItems, setCartItems] = useState([]);
    const [fix, setFix] = useState(false);


    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.js')
        import('bootstrap/dist/css/bootstrap.css');

        const offCanvas = document.getElementById('offcanvasExample')

        const updateCart = () => {
            const storedCart = JSON.parse(localStorage.getItem('ordered-products') || []);
            setCartItems(Array.isArray(storedCart) ? storedCart : []);
        };
        const handleScroll = () => {
            if (window.scrollY >= 1) {
                setFix(true);
            }else{
                setFix(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        window.addEventListener("cart-updated", updateCart);
        offCanvas.addEventListener('show.bs.offcanvas', updateCart);

        return () => {
            offCanvas?.removeEventListener('show.bs.offcanvas', updateCart);
            window.removeEventListener("scroll", handleScroll);
        }
    },[]);


    return (
        <>
            {fix && <div className="navbar-placeholder"/>}
            <nav className={`navbar ${fix ? "fixed" : ""}`}>
                <div className="navbar-brand">
                    <a href="/">Super Store</a>
                </div>
                <div className="navbar-cart">
                    <a className="btn btn-dark" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button"
                       aria-controls="offcanvasExample">
                        <img src={carticon} alt="carticon"/>
                    </a>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample"
                         aria-labelledby="offcanvasExampleLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasExampleLabel">Your Cart</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                                    aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            {cartItems.length === 0 ? (<p>Your cart is empty</p>
                            ) : (cartItems.map((item, index) => (<div key={index}>
                                        <h5>{item.title}</h5>
                                        <img src={item.image}/>
                                        <p>{"$" + item.price}</p>
                                        <ProductCounter product={item} />
                                        <p><strong>Total: ${(item.price * item.quantity ).toFixed(2)}</strong></p>


                                        <button onClick={() =>{
                                            const stored = localStorage.getItem("ordered-products");
                                            const existingCart = stored ? JSON.parse(stored) : [];

                                            const updatedCart = existingCart.filter((product, i) => i !== index);
                                            localStorage.setItem("ordered-products", JSON.stringify(updatedCart));
                                            setCartItems(updatedCart);
                                        }}>Remove</button>
                                    </div>
                                ))
                            )}
                            <button onClick={() => {
                                localStorage.removeItem("ordered-products");
                                setCartItems([]);
                            }}> Clear Cart
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            </>
    )
}

export default NavBar;

