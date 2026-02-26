import { useState } from "react";
import { Registers } from "../services/product";
import { useNavigate } from "react-router-dom";
import './Register.css';

function Register() {
  const [form, setForm] = useState({
    email:'',
    name:'',
    password:''
  });
  const [errors,setErrors] = useState({})
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";

    if (name === "name") {
      if (!value) {
        error = "Name is required";
      } else if (!/^[A-Z]/.test(value)) {
        error = "First letter must be capital";
      }
    }

    if (name === "email") {
      if (!value) {
        error = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Invalid email format";
      }
    }

    if (name === "password") {
      if (!value) {
        error = "Password is required";
      } else if (value.length < 3) {
        error = "Minimum 3 characters required";
      } else if (value.length > 5) {
        error = "Maximum 5 characters allowed";
      }
    }

    return error;
  };

  const handlersubmit = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})

    if (touched[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: validateField(e.target.name, e.target.value),
      });
    }
  }

  const handleBlur = (e) => {
    setTouched({...touched,[e.target.name]:true})

    setErrors({...errors,[e.target.name]:validateField(e.target.name,e.target.value)})
  }

  const submit = async (e) => {
  e.preventDefault();

  let newErrors = {};

  Object.keys(form).forEach((field) => {
    newErrors[field] = validateField(field, form[field]);
  });

  setErrors(newErrors);
  setTouched({
    name: true,
    email: true,
    password: true
  });

  const hasError = Object.values(newErrors).some((error) => error);

  if (!hasError) {
    try {
      await Registers(form);
      alert("Registration Successful ✅");
      navigate("/Login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  }
};

  return (
    <div className="Main_Form">
      <div className="Form">  
      <form onSubmit={submit}>
      <h2>Register</h2>
      <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
          <input type="email" className="form-control" name='email' value={form.email} onChange={handlersubmit} onBlur={handleBlur} placeholder="Enter the email"/>
          {errors.email ? <p style={{color:'red'}}>{errors.email}</p>: null}
      </div>
      <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handlersubmit} onBlur={handleBlur} placeholder="Enter the name"/>
          {errors.name ? <p style={{color:'red'}}>{errors.name}</p>: null}
      </div>
      <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' value={form.password} onChange={handlersubmit} onBlur={handleBlur} placeholder="Enter the password"/>
          {errors.password ? <p style={{color:'red'}}>{errors.password}</p>: null}
      </div>
      <div className="mb-3">
          <button>Register</button>
      </div>
    </form>
      </div>
    </div>
  );
}

export default Register;
