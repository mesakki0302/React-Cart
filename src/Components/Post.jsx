import React, { useState } from 'react'
import './Post.css'
import {addProduct} from '../services/product'

function Post() {

const [product, setProduct] = useState({
    title: '',
    description:'',
    image: '',
    price: '',
    category: '',
  })

  const handlesubmit = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleForm = async (e) => {
    e.preventDefault()

    const result = await addProduct(product)

    

    if (result) {
      alert("Product Added Successfully ✅")
      setProduct({ title: '', image: '', description:'', price:'', category:'' })
    }
  }
  return (
    <div className='Main_Form'>
      <div className='Form'>
      <h2>Post Form</h2>
      <form onSubmit={handleForm} >
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
          <input type="text" className="form-control" name="title"  value={product.title} onChange={handlesubmit} placeholder="Enter the title"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Description</label>
          <input type="text" className="form-control" name="description" value={product.description} onChange={handlesubmit} placeholder="Enter the description"/>
        </div>
         <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">ImageURL</label>
          <input type="text" className="form-control" name="image" value={product.image} onChange={handlesubmit} placeholder="Enter the Image"/>
        </div>
         <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Category</label>
          <input type="text" className="form-control" name="category" value={product.category} onChange={handlesubmit} placeholder="Enter the Category"/>
        </div>
          <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Price</label>
          <input type="number" className="form-control" name="price" value={product.price} onChange={handlesubmit} placeholder="Enter the Price"/>
        </div>
        <div className="mb-3">
          <button className='btn btn-primary'>Submit</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Post