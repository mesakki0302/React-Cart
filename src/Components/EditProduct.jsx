import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProduct } from '../services/product';
import { getProduct } from '../services/product';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: '',
    price: '',
    image: '',
    description:'',
    category:''
  });

  // LOAD PRODUCT
  useEffect(() => {
  if (id) {
    getProduct(id)
      .then(res => setProduct(res.data))
      .catch(err => {
        console.error(err);
        alert("Failed to load product");
      });
  }
}, [id]);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // SUBMIT UPDATE
  const handlesubmit = async (e) => {
    e.preventDefault();
    await updateProduct(id, product);
    alert('Product Updated ✅');
    navigate('/Product');
  };

  return (
    <div className='Main_Form'>
      <div className='Form'>
      <h1>Update Form</h1>
      <br></br>
      <form onSubmit={handlesubmit} >
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
          <input type="text" className="form-control" name="title"  value={product.title} onChange={handleChange} placeholder="Enter the title"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Description</label>
          <input type="text" className="form-control" name="description" value={product.description} onChange={handleChange} placeholder="Enter the description"/>
        </div>
         <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">ImageURL</label>
          <input type="text" className="form-control" name="image" value={product.image} onChange={handleChange} placeholder="Enter the Image"/>
        </div>
         <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Category</label>
          <input type="text" className="form-control" name="category" value={product.category} onChange={handleChange} placeholder="Enter the Category"/>
        </div>
          <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Price</label>
          <input type="number" className="form-control" name="price" value={product.price} onChange={handleChange} placeholder="Enter the Price"/>
        </div>
        <div className="mb-3">
          <button className='btn btn-primary'>Update</button>
        </div>
      </form>
      </div>
    </div>
  
  );
}

export default EditProduct;