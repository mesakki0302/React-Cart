import React, { useEffect, useState } from 'react'
import './Main.css';
import Product from './Product';
import { getProducts } from '../services/product';



function Main({addItem}) {
    // const products = [{
    //     name:"Couple Watch" , source:"https://media.vogue.in/wp-content/uploads/2016/01/grant-gift-set-1920x1080.png"
    // },{
    //     name:"Mens Watch" , source:"https://png.pngtree.com/png-clipart/20240906/original/pngtree-luxury-stainless-steel-watch-png-image_15950444.png"
    // }] 

const[product,setProduct]= useState([])
   

useEffect(() => {
  getProducts().then(res => setProduct(res.data))
}, []);

   
const addcart = (value)=>{
      addItem((prevdata) =>[...prevdata,value])
    }

const handleDelete = (id) => {
    setProduct(prev => prev.filter(item => item._id !== id));
};
    
return (
    <div>
        <div className='Main_All'>
            <div className='Main_1'>
              <Product prod={product} changeFunction={addcart} onDelete={handleDelete}/>
            </div>
            {/* <div className='Main_2'>
              <img src="https://png.pngtree.com/png-vector/20250320/ourmid/pngtree-happy-woman-holding-shopping-bags-png-image_15805447.png" alt="" />
            </div> */}
           </div>
    </div>
  )
}

export default Main