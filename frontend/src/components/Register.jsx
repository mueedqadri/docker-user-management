import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default function Register (){

    const [user, setUser] = useState({
        email: "", 
        password: "",
        name: "", 
        course: ""
    });

    const [submit, setSubmit] = useState(true);

    const history = useHistory();
    const HandleChange = (event)=>{
        user[event.target.name] = event.target.value;
        if( user['email']
        && user['name']
        && user['password']
        && user['course']
        && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user['email'])
        ){
            setSubmit(false)
        }else{
            setSubmit(true)
        }
        setUser(user)
        console.log(user)

    }

    const callApi =()=>{
        fetch(`https://container1-7guhalfpeq-uc.a.run.app/register/`, {
            method: 'POST',
            body: JSON.stringify(user) ,
            headers:{          
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        })
        .then(res =>{
          if(res.ok){
    
            return res.json();
          }
        }).then(data =>{
            alert('Account created, please login!')
            history.push('/')
        })
      }

      const showError = ()=>{
          if (submit){
              return <p>Please fill all the fields properly.</p>
          }
      }

    return (
      <form>
        <h3>Sign Up</h3>
        {showError()}
        <div className="form-group">
            <label>Name</label>
            <input onChange={HandleChange} name="name" type="text" className="form-control" placeholder="Enter your Name" />
        </div>
        <div className="form-group">
            <label>Email address</label>
            <input onChange={HandleChange} name="email" type="email" className="form-control" placeholder="Enter email" />
        </div>
  
        <div className="form-group">
            <label>Password</label>
            <input onChange={HandleChange} name="password" type="password" className="form-control" placeholder="Enter password" />
        </div>  
        <div class="form-floating">
            
            <select onChange={HandleChange} name ="course" class="form-select mt-3" id="floatingSelect" aria-label="Floating label select example">
                <option selected>None</option>
                <option value="Serverless">Serverless</option>
                <option value="Cloud">Cloud</option>
                <option value="Communication">Communication</option>
            </select>
            <label for="floatingSelect">Select a course</label>
        </div>
        <button type="button" disabled={submit} onClick={callApi} className="btn btn-primary btn-block mt-3">Register</button>
          <br></br>
          <Link to='/'>Log In?</Link>
      </form>
    );
  }