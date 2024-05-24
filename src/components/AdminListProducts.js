import { getProducts } from '../Apis/getProductsApis';
import { useState, useEffect } from 'react';
import { deleteProducts } from '../Apis/deleteProductApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminListProducts = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(9);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [modalVisible, setModalVisible] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const fetchProducts = async () => {
        const productData = await getProducts();
        setProducts(productData.data.products);
    }

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase());

    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    const goToPreviousPage = () => setCurrentPage(prev => prev - 1);
    const goToNextPage = () => setCurrentPage(prev => prev + 1);

    const handleDeleteClick = (productId) => {
        setProductToDelete(productId);
        setModalVisible(true);
    }

    const confirmDelete = async () => {
        if (productToDelete) {
            await deleteProducts(productToDelete);
            fetchProducts();
            setModalVisible(false);
        }
    }

    return (
        <>
            <div className="container my-3">
                <div className="row justify-content-center">
                    <div className="col-md-6 d-flex justify-content-around">
                        <img className='filtr' style={{ width: '100%', height: '100px', objectFit: 'contain' }}
                            src='https://res.cloudinary.com/dv9xktj1y/image/upload/v1715963407/products/kzia2vde41zjhswytvkk.jpg' onClick={() => setSelectedCategory('Mobile')} alt="Mobile" />
                        <img className='filtr' style={{ width: '100%', height: '100px', objectFit: 'contain' }} src='https://res.cloudinary.com/dv9xktj1y/image/upload/v1715959452/products/v8ptthal287n0rikhxx1.webp' onClick={() => setSelectedCategory('IPad')} alt="IPad" />
                        <img className='filtr' style={{ width: '100%', height: '100px', objectFit: 'contain' }} src='https://res.cloudinary.com/dv9xktj1y/image/upload/v1715960433/products/uk31muu4oaln1xe3ofti.webp' onClick={() => setSelectedCategory('Watch')} alt="Watch" />
                        <button className='filtr' style={{ width: '100%', height: '100px', objectFit: 'contain' }} onClick={() => setSelectedCategory('All')}>All</button>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row m-2'>
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product) => (
                            <div key={product._id} className='row'>
                                <div className='admin-product-card card mb-2'>
                                    <img
                                        className="card-img-top admin-card-img"
                                        src={product.image.url}
                                        alt="Product"
                                        style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                                    />
                                    <div className='card-body d-flex flex-row'>
                                        <h5 className='admin-card-title card-title admin-card-content '>{product.productName}</h5>
                                        <p className='admin-card-text card-text admin-card-content'>{product.productDescription.substring(0, 50)}</p>
                                        <p className='admin-card-price card-text admin-card-content'>Price: {product.productPrice}</p>
                                        <div className='stock-quntity admin-card-content'> <span className='admin-stock stock card-text'>Stock: {product.stockQuantity}</span></div>

                                        <button onClick={() => handleDeleteClick(product._id)} className='remove admin-card-content border-0'> 
                                          <i className="bi bi-trash-fill"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>
            </div>
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

            {modalVisible && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button type="button" className="btn-close" onClick={() => setModalVisible(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this product?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setModalVisible(false)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminListProducts;
