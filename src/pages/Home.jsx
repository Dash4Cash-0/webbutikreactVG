import ProductCard from "../components/ProductCard.jsx";
import {useEffect, useState} from "react";
import {getProducts} from "../services/api.js";
import '../css/home.css'

function Home() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const allProducts = await getProducts();
                setProducts(allProducts);
            } catch (err) {
                console.log(err);
            }
            finally{
                setLoading(false);
            }
        }
        loadProducts();
    },[])


    return (
        <div className="Home">
            {loading ? (<div className="loading">Loading...</div>
            ) : (
                <div className="product-grid">
                {products.map((product) =>
                    (<ProductCard product={product} key={product.id}/>))}
            </div>)}

        </div>
    )
}

export default Home;