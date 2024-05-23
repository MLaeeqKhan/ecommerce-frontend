import { getProducts } from '../Apis/getProductsApis';
import { useState, useEffect } from 'react';
import { deleteProducts } from '../Apis/deleteProductApi';

const AdminListProducts = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(9);
    const [selectedCategory, setSelectedCategory] = useState('All');

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


    console.log('Selected category:', selectedCategory);
    console.log('Filtered products:', filteredProducts);

    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    const goToPreviousPage = () => setCurrentPage(prev => prev - 1);
    const goToNextPage = () => setCurrentPage(prev => prev + 1);


    const productDelete = async (productId) => {
        await deleteProducts(productId);
        fetchProducts();
    }


    return (
        <>
            <div className="container my-3">
                <div className="row justify-content-center">
                    <div className="col-md-6 d-flex justify-content-around">
                        <img className='filtr' style={{ width: '100%', height: '100px', objectFit: 'contain' }}
                            src='https://res.cloudinary.com/dv9xktj1y/image/upload/v1715963407/products/kzia2vde41zjhswytvkk.jpg' onClick={() => setSelectedCategory('Mobile')} Mobile />
                        <img className='filtr' style={{ width: '100%', height: '100px', objectFit: 'contain' }} src='https://res.cloudinary.com/dv9xktj1y/image/upload/v1715959452/products/v8ptthal287n0rikhxx1.webp' onClick={() => setSelectedCategory('IPad')} Pad />
                        <img className='filtr' style={{ width: '100%', height: '100px', objectFit: 'contain' }} src='https://res.cloudinary.com/dv9xktj1y/image/upload/v1715960433/products/uk31muu4oaln1xe3ofti.webp' onClick={() => setSelectedCategory('Watch')} Watch />
                        <button className='filtr' style={{ width: '100%', height: '100px', objectFit: 'contain' }} onClick={() => setSelectedCategory('All')}>All</button>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row m-2'>
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product, index) => (
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

                                        <button onClick={()=>productDelete(product._id)} className='remove admin-card-content border-0'> <i class="bi bi-trash-fill"></i></button>
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

export default AdminListProducts;
