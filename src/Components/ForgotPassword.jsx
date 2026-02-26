import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { forgotPassword } from '../services/product';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {

    const[email,setEmail] = useState("")

    const navigate = useNavigate()

    const submit = async(e)=>{
        e.preventDefault()
        try{
        await forgotPassword(email)
        alert('OTP send Sucessfully')
        setEmail("")
        navigate('/resetPassword')
        }
        catch(error){
         alert(error.response?.data?.message)
            
        }
    }
  return (
     <Form onSubmit={submit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <h1 className='text-center'>Forgot Password</h1>
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' value={email} onChange={(e)=>setEmail( e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit">
       Submit
      </Button>
    </Form>
)
} 

export default ForgotPassword