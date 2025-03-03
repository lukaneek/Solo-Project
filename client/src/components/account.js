import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Account(props) {
    const { email } = props;
    const { saveEmail } = props;
    const navigate = useNavigate();

    const [newEmail, setNewEmail] = useState("")
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [address, setAddress] = useState("");
    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        console.log("in pizzas useEffect");
        axios.post("http://localhost:8000/pizzas", {
            email, 
        })
        .then((res) => {
            console.log(res.data.pizzas);
            setPizzas(res.data.pizzas);
            setNewEmail(res.data.email);
            setCity(res.data.city);
            setState(res.data.state);
            setAddress(res.data.address);
        })
        .catch((err) => {
            console.log(err);
        })
    },[]);

    async function deleteHandler(e) {
        e.preventDefault();
        try{
        await axios.post("http://localhost:8000/delete", {
            email
        })
        .then((res) => {
            saveEmail("");
            navigate("/");
        })
        .catch((err) => {
            console.log(err);
        })
    }
    catch(err) {
        console.log(err);
    }
    }


    async function logoutHanlder(e) {
        e.preventDefault();
        
        saveEmail("");
        navigate("/");
    }
        
   


    async function sumbit(e) {
        e.preventDefault();

        try {
            await axios.put("http://localhost:8000/account", {
                email, newEmail, password, city, state, address
            })
                .then(res => {
                    console.log(res.data);
                    if (res.data == "exists") {
                        alert("account already exists with this email")
                    }
                    else if (res.data == "nonexist") {
                        saveEmail(newEmail);
                        navigate("/home");
                    }
                })
                .catch(e => {
                    alert("something went wrong");
                    console.log(e);
                })
        }
        catch (e) {
            console.log(e)
        }
    }


    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light text-black">
                <a class="navbar-brand">Welcome {email}</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <NavLink to="/home" class="nav-link"><a class="nav-link">Home</a></NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink to="/order" class="nav-link"><a class="nav-link">Orders</a></NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink to="/account" class="nav-link"><a class="nav-link">Account</a></NavLink>
                        </li>
                        <li class="nav-item">
                            <a onClick={logoutHanlder} class="nav-link">Log Out</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <br />
            <div className="login template d-flex justify-content-start align-items-center 100-w 100-vh bg primary">
                <div style={{ paddingLeft: 50 }}>
                    <h1>Update Account Info</h1>
                    <form class action="PUT">

                        <div data-mdb-input-init class="form-outline mb-2">
                            <input type="email" value={newEmail} id="form2Example1" onChange={(e) => { setNewEmail(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example1">Email address</label>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-2">
                            <input type="text" placeholder="Your Password:" id="form2Example2" onChange={(e) => { setPassword(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">Password</label>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="text" value={city} id="form2Example2" onChange={(e) => { setCity(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">City</label>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="text" value={state} id="form2Example2" onChange={(e) => { setState(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">State</label>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="text" value={address} id="form2Example2" onChange={(e) => { setAddress(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">Address</label>
                        </div>
                        <div class=" d-flex justify-content-center align-items-center">
                        <div>
                            <   button type="submit" onClick={sumbit} data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Update</button>
                        </div>
                       
                        <div>
                            <   button type="submit" onClick={deleteHandler} data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Delete Account</button>
                        
                        </div>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <div>
                    <h2>Previous Orders:</h2>
                        {
                            pizzas.map((pizza, index) => (
                                <ul class="list-group-item" key={index}>
                                    <h2>Pizza:</h2>
                                    <li>{pizza.toppings.join(", ")}</li>
                                    <li>{pizza.crust}</li>
                                    <li>{pizza.size}</li>
                                    <li>{pizza.method}</li>
                                    <li>{pizza.quantity}</li>
                                </ul>
                            ))
                        }
                        
                    
                </div>
            </div>
        </div>
    )

}

export default Account;