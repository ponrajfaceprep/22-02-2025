import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../Context/Context";
import axios from "../axios";

const Product = () => {
    const { id } = useParams();
  const { data, addToCart, removeFromCart, cart, refreshData } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}`
        );
        setProduct(response.data);
        if (response.data.imageName) {
          fetchImage();
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchImage = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/product/${id}/image`,
        { responseType: "blob" }
      );
      setImageUrl(URL.createObjectURL(response.data));
    };

    fetchProduct();
  }, [id]);

  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/product/${id}`);
      // removeFromCart(id);
      console.log("Product deleted successfully");
      alert("Product deleted successfully");
      refreshData();
      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = () => {
    navigate(`/product/update/${id}`);
  };

  
    return (
        <div className="container">
            {
                product == null ? (
                    <p className="center">Loading...</p>
                ) : (
                    <div className="product">
                        <div className="image_container">
                            <img src={imageUrl == "" ? null : imageUrl} alt={product.imageName} />
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
                                <button type="button" class="fill_1"  onClick={handleEditClick}>Edit</button>
                                <button type="button" class="fill_2" onClick={deleteProduct}>Delete</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Product;