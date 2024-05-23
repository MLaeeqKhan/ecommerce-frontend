import React from 'react'
import deliveryBox from '../images/package.png'

const Order = () => {
    return (
        <>
            {/* <img src={deliveryBox}/> */}

            <section className='order'>
                <div className='inner-order'>
                    <div className='container'>
                        <div className='order-card' style={{border:"1px solid grey"}}>
                            <div className='card d-flex flex-row justify-content-around box-none border-0 ' style={{boxShadow:"none", border:""}}>
                            <img src={deliveryBox} alt='deliveryBox img card-img-top' style={{ width: "50px" }} />
                            <p>Apple Gadgets<i class="bi bi-x"></i>4, Mobile IPad<i className="bi bi-x">2</i> </p>
                            <p>Items:4</p>
                            <p>$4478.85</p> 


                            <select id="cars" style={{padding:"",background:"#ebccff", color:"white",border:"1px solid grey"}}>
                                <option value="volvo">Delivery Processing</option>
                                <option value="saab">Out for dilivery</option>
                                <option value="opel">Delivered</option>
                            </select>
                            </div>
                            <div className='container d-flex flex-column mt-5' > 
                            <p>Muhammad Laeeq Khan</p>
                            <p>Pakistan, Laohore</p>
                            <p>Defence Road Lahore, Cant Lahore</p>
                            <p>Post Code#2300</p>
                           </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Order