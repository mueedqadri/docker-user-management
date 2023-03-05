import React , { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default function UserPage () {
    
    const [activeUsers, setActiveUsers] = useState([]);

    const history = useHistory();

    const logout =()=>{
        localStorage.getItem('loggedInUser');
        fetch('https://container3-7guhalfpeq-uc.a.run.app/logout', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username:  localStorage.getItem('loggedInUser')})
        }).then (res=>{
            if(res.ok){
                history.push('/');   
                localStorage.removeItem('loggedInUser');
            }
        })
    }

    useEffect(() => {
        if(localStorage.getItem('loggedInUser')){
            fetch(`https://container3-7guhalfpeq-uc.a.run.app/allUsers`)
            .then(res =>{
                if(res.ok){
                    return res.json();
                }
                }).then(data =>{
                    console.log(data)
                    if(data ){
                        let users = data.data.map(user =>{
                            return <li class="list-group-item list-group-item-success">{user}</li>
                        })
                        setActiveUsers(users)
                    }
                })
        } else{
            history.push('/');
        }
        
      }, []);
    
    return (
        <div>
            <h2>Hey, {localStorage.getItem('loggedInUser')} you are logged in.</h2>
            <h4>Here are other logged in users:</h4>
            <ul class="list-group">
                {activeUsers}
            </ul>
            <button type="submit" onClick={logout} className="btn btn-danger btn-block mt-3">Logout</button>
          <br></br>
        </div>
    );
  }
  