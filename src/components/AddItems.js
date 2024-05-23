import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const AddItems = () => {
    const [product, setProduct] = useState({
        productName: "",
        productDescription: "",
        stockQuantity: "",
        productPrice: "",
        category: ""
    });

    const [image, setImage] = useState(null);

    const handleImg = (e) => {
        setImage(e.target.files[0]);
    };

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };
    const postData = async (e) => {
        try {
            e.preventDefault();

            // Check if any required field is empty
            if (!product.productName || !product.productDescription || !product.productPrice || !product.stockQuantity || !product.category) {
                window.alert("Please fill in all fields.");
                return; // Stop execution if any required field is empty
            }

            const formData = new FormData();
            formData.append("image", image); // Assuming `image` is the file object
            formData.append("productName", product.productName);
            formData.append("productDescription", product.productDescription);
            formData.append("productPrice", product.productPrice);
            formData.append("stockQuantity", product.stockQuantity);
            formData.append("category", product.category);


            const { productName, productDescription, stockQuantity, productPrice, category } = product;
            console.log('image', image)

            const res = await axios.post("http://localhost:5000/postProduct", { image, productName, productDescription, stockQuantity, productPrice, category }, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
           
            
            
            if (res.status === 200) {
                window.alert("Your Product was Successfully Added!");
                setProduct({
                    productName: "",
                    productDescription: "",
                    stockQuantity: "",
                    productPrice: "",
                    category: ""
                });
                setImage(null);
            } else {
                window.alert("Your Product was Not Added!");
                console.log("res:", res);
            }
        } catch (error) {
            console.log("error:", error);
            // Handle other errors if necessary
        }
    };



    return (
        <>
         <div className="form-container">
         <form className="admin-form">
                <label htmlFor="Upload Image"> </label>
                    <input
                      className="image form-control-file form-control"
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImg}
                    />
               
                <label htmlFor="productName">Product Name</label>
                <input
                    className="form-control"
                    type="text"
                    name="productName"
                    onChange={handleInputs}
                    value={product.productName}
                />
                <label htmlFor="productDescription">Product Description</label>
                <textarea
                 className="form-control"
                    type="text"
                    name="productDescription"
                    onChange={handleInputs}
                    value={product.productDescription}
                />
                <label htmlFor="productPrice">Product Price</label>
                <input
                 className="form-control"
                    type="text"
                    name="productPrice"
                    onChange={handleInputs}
                    value={product.productPrice}
                />
                <label htmlFor="stockQuantity">Stock Quantity</label>
                <input
                    className="form-control"
                    type="text"
                    name="stockQuantity"
                    onChange={handleInputs}
                    value={product.stockQuantity}
                />
                <label htmlFor="category">category</label>
                <input
                 className="form-control"
                    type="text"
                    name="category"
                    onChange={handleInputs}
                    value={product.category} />
                <button className="btn btn-primary postData"
                    type="submit"
                    onClick={postData}
                >
                    Add
                </button>
            </form>
  
            </div> 
                  </>
    );
};

export default AddItems;
