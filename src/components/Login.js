import React , {useState} from 'react'
import { useNavigate } from "react-router-dom";


const Login = () => {

    const [credentials, setCredentials] = useState({email : "" , password : ""}) ;
    
    const navigate = useNavigate();

    const handleSubmit =async (e)=>{
        e.preventDefault();
        console.log("submitting");

        const url = `http://localhost:5000/api/auth/login`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' ,               
            },
            body : JSON.stringify({email : credentials.email , password : credentials.password})           
        });
        const json = await response.json();
        console.log(json);

        if(json.success){
            localStorage.setItem('token' , json.authToken);
            navigate('/')
        }else{
            alert("You have entered wrong credetials");
            setCredentials({email:"" , password:""})
        }

        // console.log(navigate);
    }

    const onChange = (e) =>{
        
        e.preventDefault();
        setCredentials({ ...credentials , [e.target.name] : e.target.value });
        
    }

    return (

        

        <div>

            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password'  value={credentials.password} onChange={onChange}/>
                </div>
                
                <button type="submit" className="btn btn-primary">Login</button>
            </form>

        </div>
    )
}

export default Login