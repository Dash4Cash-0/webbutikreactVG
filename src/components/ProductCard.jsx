import '../css/productcard.css'



function ProductCard({product}) {


    const onBuyClick = () => {

        try{

            const stored = localStorage.getItem("ordered-products")
            const existingCart = stored ? JSON.parse(stored) : [];
            const updatedCart = [...existingCart,product];

            localStorage.setItem('ordered-products', JSON.stringify(updatedCart));

        }catch(err) {
            console.log(err);
        }

    }


    return (
        <div className="product-card">
            <div className="product-card-image">
                <h3>{product.title}</h3>
                <img src={product.image}/>
            </div>
            <div className="product-description">
                <p>{product.description}</p>
            </div>
            <div className="product-buy">
                <button className="buy-button" onClick={onBuyClick}>Buy</button>
                <h4>{"$" + product.price}</h4>
            </div>
        </div>
    )

}

export default ProductCard;