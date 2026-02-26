import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'
import { Link } from 'react-router-dom';
import { Logins } from "../services/product";

function Login() {
  const[form,setForm] = useState({
    email: '',
    password: ''
  });
  const[error,setError] = useState({});
  const[touched,setTouched] = useState({})
  const navigate = useNavigate();

  const handlerchange = (e) => {
      setForm({...form, [e.target.name]:e.target.value})
  }
 
  const handlererror = (name, value) =>{

     let error = ''
    
     if(name === 'email'){
        if(!value){
          error ='Email is required'
        }
        else if(!/\S+@\S+\.\S+/.test(value)){
          error = 'Email is Not Valid'
        }
      }

      if(name === 'password'){
        if(!value){
          error ='Password is Required'
        }
        else if (value.length < 3){ error =  "Minimum length is 3"}
        else if (value.length > 6){ error =  "Maximum length is 6"}
      }

      return error
  }

  const handlerblur = (e)=>{
    setTouched({...touched,[e.target.name]:true})
    setError({...error,[e.target.name]:handlererror(e.target.name,e.target.value)})
  }


  const submit = async e => {
    e.preventDefault();

       let newerrors = {}

       Object.keys(form).forEach(field => {
         newerrors[field] = handlererror(field,form[field])
       });

       setError(newerrors)
       setTouched({
        email:true,
        password:true
       })

       const hasherror = Object.values(newerrors).some((error)=>error)

       if(!hasherror){
        try{
        const res = await Logins(form);
        localStorage.setItem("token", res.data.token);
        navigate("/Product");
        }
        catch(err){
          alert(err.response?.data?.message||'Login Details Failed')
        }
       }
  };
 return (
    <div className="Main_Form">
    <div className="Form">
      <form onSubmit={submit}>
      <h2>Login</h2>
      <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
          <input type="email" className="form-control" name='email' value={form.email} onChange={handlerchange} onBlur={handlerblur} placeholder="Enter the email" />
          {error.email ? <p style={{color:'red'}}>{error.email}</p>: null}
        </div>
      <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' value={form.password} onChange={handlerchange} onBlur={handlerblur} placeholder="Enter the password"/>
          {error.password ? <p style={{color:'red'}}>{error.password}</p>: null}
        </div>
    <div className="mb-3"> 
        <button>Login</button>
        <Link to='/forgotPassword'>Forgot Password</Link>
    </div>    
    </form>
    </div>
    </div>
  );
}

export default Login;