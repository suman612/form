import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"", password:""})
    let history = useHistory()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const response = await fetch("https://registration-form-4mhi.onrender.com/api/auth/login", { 
            method: 'POST',   
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}) 
    })
    const json = await response.json()
    console.log(json);
    if (json.success){
      // Save the auth token and redirect
    localStorage.setItem('token', json.authtoken)
    props.showAlert("Logged in Successfully", "success")
    history.push("/")
    }
    else{
        props.showAlert("Invalid Details", "danger")
    }
}

const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]:e.target.value})
}
    return (
        <div className='mt-2'>
          
          <h2 className='my-3'>Login to continue to iNotebook </h2>
           <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" value={credentials.email} onChange={onChange} name='email' id="email" aria-describedby="emailHelp" placeholder="Enter email" />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control"name='password' onChange={onChange} value={credentials.password} id="password" placeholder="Password" />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </div>
    )
}

export default Login
