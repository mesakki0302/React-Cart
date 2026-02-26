import React from 'react'
import'./Cart.css'


function Cart({cart}) {
return (
    <div>
       {cart.length===0?(<h1>Your Cart is Empty Now</h1>):(<div className='product-container'>
        {cart.map((data)=>(
            <div className="card" key={data._id}>
            <div className="card-body">
               <img src={data.image} alt={data.title} />
               <h4>{data.title}</h4>
       </div>
    </div>
        ))}
       </div>)}
    </div>
  )
}

export default Cart