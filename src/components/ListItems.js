import { getProducts } from '../Apis/getProductsApis';
import { useState, useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { addToCart } from '../ReduxToolKit/Slice';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const ListItems = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(9);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const userData = useSelector((state) => state.users);
    console.log('userData', userData);
  


    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const fetchProducts = async () => {
        const productData = await getProducts();
        setProducts(productData.data.products);
    }

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    // Filter products based on the selected category
    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase());

    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    const goToPreviousPage = () => setCurrentPage(prev => prev - 1);
    const goToNextPage = () => setCurrentPage(prev => prev + 1);

    const decrement = (id) => {
        const updatedProducts = products.map(product => {
            if (product._id === id && (product.quantity || 0) > 0) {
                return { ...product, quantity: (product.quantity || 0) - 1 };
            }
            return product;
        });
        setProducts(updatedProducts);
    }

    const increment = (id) => {
        const updatedProducts = products.map(product => {
            if (product._id === id) {
                return { ...product, quantity: (product.quantity || 0) + 1 };
            }
            return product;
        });
        setProducts(updatedProducts);
    }

    const addCart = async(productId) => {
        const productToAdd = products.find(product => product._id === productId);
        if (productToAdd && (productToAdd.quantity || 0) > 0) {
            const userId = userData._id;
            console.log('listItem userId: ', userId);

            const quantity=productToAdd.quantity;
            try {
                const res = await axios.post('http://localhost:5000/addToCart', { productId,userId,quantity });
                if (res.status === 200) {
                    toast.success("Product Added To Cart Successfully!");
                } else {
                    toast.error("Error in Adding Product To Cart!");
                }
            } catch (error) {
                toast.error("Error in Adding Product To Cart!");
                console.error('Error adding product to cart:', error);
            }

        }
      }
    
    
    return (
        <>
          <ToastContainer />
            <div className="container my-3" >
                <div className="row justify-content-center">
                    <div className="col col-md-3 d-flex justify-content-around">
                        <img className='filtr' style={{ height: '100px', objectFit: 'contain' }}
                            src='https://res.cloudinary.com/dv9xktj1y/image/upload/v1715963407/products/kzia2vde41zjhswytvkk.jpg' onClick={() => setSelectedCategory('Mobile')} alt='Mobile' />
                    </div>
                    <div className="col col-md-3 d-flex justify-content-around">
                        <img className='filtr' style={{ height: '100px', objectFit: 'contain' }} src='https://res.cloudinary.com/dv9xktj1y/image/upload/v1715959452/products/v8ptthal287n0rikhxx1.webp' onClick={() => setSelectedCategory('IPad')} alt='IPad' />
                    </div>
                    <div className="col col-md-3 d-flex justify-content-around">
                        <img className='filtr' style={{  height: '100px', objectFit: 'contain' }} src='https://res.cloudinary.com/dv9xktj1y/image/upload/v1715960433/products/uk31muu4oaln1xe3ofti.webp' onClick={() => setSelectedCategory('Watch')} alt='Watch' />
                    </div>
                    <div className="col col-md-3 d-flex justify-content-around">
                        <button className='filtr' style={{  height: '100px', objectFit: 'contain' }} onClick={() => setSelectedCategory('All')}>All</button>
                    </div>
                </div>
            </div>

            <div className='container'>
                <div className='row m-2'>
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product) => (
                            <div key={product._id} className='col-md-4'>
                                <div className='card mb-2'>
                                    <img
                                        className="card-img-top"
                                        src={product.image.url}
                                        alt="Product"
                                        style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                                    />
                                    <div className='card-body d-flex flex-column'>
                                        <h5 className='card-title'>{product.productName}</h5>
                                        <p className='card-text'>{product.productDescription.substring(0, 50)}</p>
                                        <p className='card-text'>Price: {product.productPrice}</p>
                                        <div className='stock-quntity'> <span className='stock card-text'>Stock: {product.stockQuantity}</span><span className='decrement-increment'><button className='decrement' onClick={() => decrement(product._id)}><i className="bi bi-dash-circle"></i></button><span className='selected-quantity'>{product.quantity || 0}</span><button className='increment' onClick={() => increment(product._id)}><i className="bi bi-plus-circle"></i></button></span></div>
                                        <button className='add-to-cart-btn' onClick={() => addCart(product._id)}>Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>
            </div>
            {/* Pagination controls */}
            <div className="container mb-5">
                <div className="row justify-content-center mb-5">
                    <div className="col-md-6">
                        <div className="pagination d-flex justify-content-center">
                            <button className='pagination-button btn btn-primary' onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
                            {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
                                <button className='pagination-button btn btn-primary' key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
                            ))}
                            <button className='pagination-button btn btn-primary' onClick={goToNextPage} disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListItems;
