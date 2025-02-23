import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {

    const [product, setProduct] = useState({
        name: "",
        brand: "",
        description: "",
        price: "",
        category: "",
        stockQuantity: "",
        releaseDate: "",
        productAvailable: true,
      });
      const [image, setImage] = useState(null);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
        console.log(product)
      };

      const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        // setProduct({...product, image: e.target.files[0]})
      };

      const submitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("imageFile", image);
        formData.append(
          "product",
          new Blob([JSON.stringify(product)], { type: "application/json" })
        );
    
        axios
          .post("http://localhost:8080/api/product", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("Product added successfully:", response.data);
            alert("Product added successfully");
          })
          .catch((error) => {
            console.error("Error adding product:", error);
            alert("Error adding product");
          });
      };

    return (
        <div className="add-product container">
            <table style={{fontSize:".8rem"}}>
                <tbody>
                <tr>
                    <td>
                        <label>Product Name</label><br/>
                        <input 
                            type="text" 
                            // placeholder="Product Name" 
                            onChange={handleInputChange} 
                            // value={product.name}
                            name="name"/>
                    </td>
                    <td>
                        <label>Product Brand</label><br/>
                        <input 
                            type="text" 
                            // placeholder="Product Brand" 
                            onChange={handleInputChange} 
                            // value={product.brand}
                            name="brand"/>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <label>Product Description</label><br/>
                        <input 
                            type="text" 
                            // placeholder="Product Description" 
                            onChange={handleInputChange} 
                            // value={product.description}
                            name="description" style={{width:"77%"}}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Product Price</label><br/>
                        <input 
                            type="number" 
                            // placeholder="Product Price" 
                            onChange={handleInputChange} 
                            // value={product.price}
                            name="price"/>
                    </td>
                    <td>
                        <label>Product Category</label><br/>
                        <select
                            // value={product.category}
                            onChange={handleInputChange}
                            name="category"
                            id="category" style={{height:"23px", width:"60%"}}
                        >
                            <option value="">Select category</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Headphone">Headphone</option>
                            <option value="Mobile">Mobile</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Toys">Toys</option>
                            <option value="Fashion">Fashion</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Stock Quantity</label><br/>
                        <input 
                            type="number" 
                            // placeholder="stock Quantity" 
                            onChange={handleInputChange} 
                            // value={product.stockQuantity}
                            name="stockQuantity"
                            id="stockQuantity"/>
                    </td>
                    <td>
                        <label>Release Date</label><br/>
                        <input
                            type="date"
                            // value={product.releaseDate}
                            onChange={handleInputChange}
                            name="releaseDate"
                            id="releaseDate"
                            
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input
                        type="checkbox"
                        name="productAvailable"
                        checked={!product.productAvailable}
                        onChange={(e) => {
                            console.log(e.target.checked)
                            setProduct({ ...product, productAvailable: e.target.checked })
                            console.log(product.productAvailable)
                            }
                        }
                        onClick={handleInputChange}
                        />
                        <label className="form-check-label">Product Available</label>
                    </td>
                    <td>
                        <label>Upload Product Image</label>
                        <input
                            className="form-control"
                            type="file"
                            onChange={handleImageChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <button
                            type="submit"
                            className="edit-button"
                            onClick={submitHandler}
                        >
                            Submit
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default AddProduct