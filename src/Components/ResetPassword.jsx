import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { resetPassword } from '../services/product'

function ResetPassword() {
    const[form,setForm]=useState({
        email:'',
        otp:'',
        password:''

    })

    const handlesubmit = (e)=>{
     setForm({...form,[e.target.name]:e.target.value})
    }

    const submit = async (e) =>{
        try{
            await resetPassword(form)
            alert('Password Changed Sucessfully')
            setForm('')

        }
        catch(err){
            alert(err.response?.data?.message)
        }
    }

  return (
    <Form onSubmit={submit}>
      <h1 className='text-center'> Reset Password</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' value={form.email} onChange={handlesubmit} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>OTP</Form.Label>
        <Form.Control type="text" placeholder="Enter OTP" name='otp' value={form.otp} onChange={handlesubmit} />
      </Form.Group>
       <Form.Group className="mb-3">
        <Form.Label>New Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" name='password' value={form.password} onChange={handlesubmit} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default ResetPassword