
import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default function Login(){
    const [user, setUser] = useState({
        email: "", 
        password: ""
    });

    const history = useHistory();

    const HandleChange= (event) =>{
        user[event.target.name] = event.target.value;
        setUser(user)
    }

    const callApi =()=>{
        fetch(`https://container2-7guhalfpeq-uc.a.run.app/login/`, {
            method: 'POST',
            body: JSON.stringify(user) ,
            headers:{          
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        })
        .then(res =>{
          if (res.status == 404){
            alert ('User does not exist, please register!');
          } else if(res.status == 202){
            alert('Invalid credentials, please check the credentials and try again!')
          }else if(res.status == 200){
            return res.json();
          } 
        }).then(data =>{
            if(data){
                localStorage.setItem('loggedInUser',user['email'])
                history.push('/userPage');      
            }
        })
      }

    return (
        <form>
        <h3>Log In</h3>
        <div className="form-group">
            <label>Email address</label>
            <input onChange={HandleChange} name="email" type="email" className="form-control" placeholder="Enter email" />
        </div>
  
        <div className="form-group">
            <label>Password</label>
            <input onChange={HandleChange} name="password" type="password" className="form-control" placeholder="Enter password" />
        </div>  
        <button type="button" onClick={callApi} className="btn btn-primary btn-block mt-3">Login</button>
          <br></br>
            <Link to='/register'>Sign Up?</Link>
        </form>
    );
}