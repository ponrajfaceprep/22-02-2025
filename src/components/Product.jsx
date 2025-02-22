

const Product = () => {
    const product = {
        id: 1,
        name: "Nike Air Max 270",
        brand: "Nike",
        category: "Shoes",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 150,
        releaseDate: "2021-06-01",
        imageName: "nike_air_max_270.jpg"
    }
    const imageUrl = `https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg`;
  
    return (
        <div className="product">
            <div className="image_container">
                <img src={imageUrl} alt={product.imageName} />
            </div>
            <div className="product_info">
                <div className="product_info1">
                    <p>{product.category}</p>
                    <p>Listed <span> <i> {new Date(product.releaseDate).toLocaleDateString()}</i></span></p>
                </div>
                <div className="product_info2">
                <p className="font-2 poppins-semibol" style={{fontSize:"2.1rem"}}>{product.name}</p>
                    <p>{product.brand}</p>
                    <p>{product.description}</p>
                </div>
                <div className="product_info3">
                    <p>Price : <span>{product.price}</span></p>
                </div>
                <div className="product_info4">
                    <p>Stock Available : </p>
                    <button type="button" class="fill_1">Edit</button>
                    <button type="button" class="fill_2">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Product;