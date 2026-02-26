import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { getProduct } from '../services/product'


function Nav() {
  const { id } = useParams()
  const [prods, setProds] = useState([]) // ✅ array from start

  useEffect(() => {
   getProduct(id).then(res => {
        // 🔥 make sure response is array
        setProds(res.data)
      })
      .catch(err => {
        console.log(err)
        setProds([]) // fail-safe
      })
  }, [id])

  if (prods.length === 0) {
    return <h3>Loading...</h3>
  }

  return (
    <div>
      {prods.map(item => (
        <div key={item._id}>
          <img src={item.image} alt={item.title} width="150" />
          <h2>{item.title}</h2>
        </div>
      ))}
    </div>
  )
}

export default Nav