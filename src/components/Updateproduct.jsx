import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [image, setImage] = useState();
    const [updateProduct, setUpdateProduct] = useState({
        id: null,
        name: "",
        description: "",
        brand: "",
        price: "",
        category: "",
        releaseDate: "",
        productAvailable: true,
        quantity: "",
    });
      
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    
  const converUrlToFile = async(blobData, fileName) => {
    const file = new File([blobData], fileName, { type: blobData.type });
    return file;
  }
 

    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await axios.get(
              `http://localhost:8080/api/product/${id}`
            );
    
            setProduct(response.data);
          
            const responseImage = await axios.get(
              `http://localhost:8080/api/product/${id}/image`,
              { responseType: "blob" }
            );

            const imageFile = await converUrlToFile(responseImage.data,response.data.imageName)
            setImage(imageFile);     
            setUpdateProduct(response.data);

            console.log(response.data);
          } 
          catch (error) {
            console.error("Error fetching product:", error);
          }
        };
    
        fetchProduct();
      }, [id]);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
        console.log(product)
      };

      const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("images", image)
        console.log("productsdfsfsf", updateProduct)
        const updatedProduct = new FormData();
        updatedProduct.append("imageFile", image);
        updatedProduct.append(
          "product",
          new Blob([JSON.stringify(product)], { type: "application/json" })
        );
      
        axios
          .put(`http://localhost:8080/api/product/${id}`, updatedProduct, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("Product updated successfully:", updatedProduct);
            alert("Product updated successfully!");
          })
          .catch((error) => {
            console.error("Error updating product:", error);
            console.log("product unsuccessfull update",updateProduct)
            alert("Failed to update product. Please try again.");
          });
          console.log(updateProduct)
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
                            value={product.name}
                            name="name"/>
                    </td>
                    <td>
                        <label>Product Brand</label><br/>
                        <input 
                            type="text" 
                            // placeholder="Product Brand" 
                            onChange={handleInputChange} 
                            value={product.brand}
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
                            value={product.description}
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
                            value={product.price}
                            name="price"/>
                    </td>
                    <td>
                        <label>Product Category</label><br/>
                        <select
                            value={product.category}
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
                            value={product.quantity}
                            name="quantity"
                            id="quantity"/>
                    </td>
                    <td>
                        <label>Release Date</label><br/>
                        <input
                            type="date"
                            value={product.releaseDate}
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
                        name="available"
                        checked={product.available}
                        onChange={(e) => {
                            console.log(e.target.checked)
                            setProduct({ ...product, available: e.target.checked })
                            console.log(product.available)
                            }
                        }
                        onClick={handleInputChange}
                        />
                        <label>Product Available</label>
                    </td>
                    <td>
                        <label>Upload Product Image</label>
                        <img
                            src={image ? URL.createObjectURL(image) : "Image unavailable"}
                            alt={product.imageName}
                            style={{
                                width: "50%",
                                height: "100px",
                                objectFit: "cover",
                                padding: "5px",
                                margin: "0",
                            }}
                            />
                        <input
                            type="file"
                            // value={image}
                            onChange={handleImageChange}
                            name="imageUrl"
                            id="imageUrl"
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <button
                            type="submit"
                            className="edit-button"
                            onClick={handleSubmit}
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

export default UpdateProduct