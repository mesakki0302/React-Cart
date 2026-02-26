import './App.css';
import Main from './Components/Main';
import Cart from './Components/Cart';
import { Routes, Route, Link } from 'react-router-dom';
import About from './Components/About';
import Login from './Components/Login';
import { useState } from 'react';
import Post from './Components/Post';
import Nav from './Components/Nav';
import EditProduct from './Components/EditProduct';
import Register from './Components/Register';
import ProtectedRoute from './Components/ProtectedRoute';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';

function App() {
  const [userName, setUserName] = useState("Guest");
  const [cartItem, setItem] = useState([]);

  return (
    <div className="App">

      {/* HEADER */}
      <div className="header">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/053/964/117/small/a-silhouette-of-a-person-with-a-circular-head-and-a-minimalistic-body-structure-showcasing-a-simple-design-png.png"
          alt=""
        />
        <h3>{userName}</h3>
      </div>

      {/* NAVBAR */}
      <div className="header1">
        <header>
          <table>
            <tbody>
              <tr>
                <td><Link to="/">Register</Link></td>
                <td><Link to="/About">About</Link></td>
                <td><Link to="/Cart">Cart</Link></td>
                <td><Link to="/Login">Login</Link></td>
                <td><Link to="/Post">Post</Link></td>

                {/* example category */}
                <td><Link to="/product/category/electronics">Category</Link></td>
              </tr>
            </tbody>
          </table>
        </header>
      </div>

      {/* ROUTES */}
      <Routes>
        <Route path="/Product" element={<Main addItem={setItem} />} />
        <Route path="/About" element={<About />} />
        <Route path="/Cart" element={<Cart cart={cartItem} />} />
        <Route path="/Login" element={<Login setName={setUserName} />} />
        <Route path="/Post" element={<Post />} />
        <Route path="/product/:id" element={<Nav />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        } />
        <Route path='/forgotPassword' element={<ForgotPassword/>}/>
        <Route path='/resetPassword' element={<ResetPassword/>}/>
      </Routes> 

    </div>
  );
}

export default App;