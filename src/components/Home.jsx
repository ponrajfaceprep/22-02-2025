import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";

const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesAndUpdateProducts = async () => {
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/product/${product.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...product, imageUrl };
            } catch (error) {
              console.error(
                "Error fetching image for product ID:",
                product.id,
                error
              );
              return { ...product, imageUrl: "placeholder-image-url" };
            }
          })
        );
        setProducts(updatedProducts);
      };

      fetchImagesAndUpdateProducts();
    }
  }, [data]);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  if (isError) {
    return (
      <h2 className="container" style={{padding:"50px 0px", textAlign:"center"}}>
        Something went wrong...
      </h2>
    );
  }
  return (
    <div className="home-container container">
      {
        filteredProducts.map((product) => {
          const { id, brand, name, price, productAvailable, imageUrl } = product;
          return (
            <Link
              key={id}
              to={`/product/${id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="product-card">
                    
                    <div className="product-card-image">
                        <img src={imageUrl} alt="product" />
                    </div>
                    <div className="product-card-info" style={{marginTop:"-6px"}}>
                        <div className="product-card-details">
                            <p className="product-name" style={{fontSize:".9rem", height:"30%", margin:"1px"}}>{name}</p>
                            <p className="product-price" style={{fontSize:".8rem"}}>Rs. <span>{price}</span></p>
                        </div>
                        <div className="product-buttons" style={{height:"50%", marginTop:"-13px"}}>
                            <button className="edit-button">Buy</button>
                            <button className="delete-button">Cart</button>
                        </div>
                    </div>
                </div>
            </Link>
          )
        })
      }
    </div>
  );
};

export default Home;
