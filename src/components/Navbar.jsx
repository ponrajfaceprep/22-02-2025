import React, { useEffect, useState } from "react";
import axios from "axios";
import { TabPane } from "react-bootstrap";

const Navbar = ({onSelectCategory}) => {

    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const categories = [
        "Laptop",
        "Headphone",
        "Mobile",
        "Electronics",
        "Toys",
        "Fashion",
    ];

    useEffect(() => {
        fetchData();
    }, []);
      
    const fetchData = async (value) => {
        try {
          const response = await axios.get("http://localhost:8080/api/products");
          setSearchResults(response.data);
          console.log(response.data);
        } 
        catch (error) {
          console.error("Error fetching data:", error);
        }
    };

    const handleCategorySelect = (category) => {
        console.log(category)
        setSelectedCategory(category);
        onSelectCategory(category);
    };

    return (
        <div className="navbar">
            <a className="nav-item" style={{border:"1px solid #ffffff"}}>Admin Page</a>
            <div>
                <a className="nav-item" href="/">Home</a>
                <a className="nav-item" href="/add_product">Add Product</a>
                <select id="categoryy" name="categoryy" onClick={() => handleCategorySelect(categoryy.value)} style={{height:"25px", width:"130px", backgroundColor:"ECEBF4", fontSize:".9rem", padding:"2px"}}>
                    <option value="" >All Products</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Headphone">Headphone</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Toys">Toys</option>
                    <option value="Fashion">Fashion</option>
                </select>
            </div>
            <a className="nav-item" href="/" style={{color:"steelblue"}}></a>
        </div>
    )
}

export default Navbar