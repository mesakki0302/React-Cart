import React from 'react'
import './Product.css'
import { deleteProduct } from '../services/product';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Product({ prod, changeFunction, onDelete }) {

  const navigate = useNavigate();

  const [search, setSearch] = useState("")

  const filteredProducts = Array.isArray(prod)? prod.filter((item)=>item.title.toLowerCase().includes(search.toLowerCase())):[]

  const deleteProductHandler = async (id) => {
    await deleteProduct(id);
    alert('Product Deleted ✅');
    onDelete(id);   // 🔥 update UI
  };

  return (
    <>
    <div className='search1'>
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      /></div>

    <div className="product-container">
      {filteredProducts.map(item => (
        <div className="card" key={item._id}>
          <div className="card-body">
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
            <p>₹ {item.price}</p>
 
    <div className="action-buttons">
    <button onClick={() => changeFunction(item)}>
      Add to Cart
    </button>

    <button onClick={() => navigate(`/edit/${item._id}`)}>
      Edit
    </button>

    <button onClick={() => deleteProductHandler(item._id)}>
      Delete
    </button>
    </div>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default Product