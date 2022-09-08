import React from 'react';
import { Button,Form, FormGroup, Label, Col, Input } from 'reactstrap';
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Login() {

    const navigate = useNavigate();
    if (localStorage.getItem('isLogin'))
        navigate("/user");

    const onClickButton = () => {
        let email = document.getElementById('exampleEmail').value;
        let password = document.getElementById('examplePassword').value;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email,password:password })
        };
        fetch('http://localhost:3003/login', requestOptions)
            .then(response => response.json())
            .then(data => getData(data));        
    }

    const getData = (data) => {
        console.log('data --- ',data.estado_p)
        if(data.estado_p && data.estado_p === 200)
            localStorage.setItem('isLogin',JSON.stringify(data.data));
        else
            localStorage.removeItem('isLogin');
        
        if (localStorage.getItem('isLogin')) 
            navigate("/user");
    }

    return(
        <div>                
        <h1>Bienvenido! Ingresa tus datos</h1>
        <hr></hr>
        <Form>
            <FormGroup row>
                <Label for="exampleEmail" sm={3} > Email </Label>
                <Col sm={5}>
                <Input id="exampleEmail" name="email" placeholder="with a placeholder" type="email"/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="examplePassword"sm={3}> Password </Label>
                <Col sm={5}>
                <Input id="examplePassword" name="password" placeholder="password placeholder" type="password" />
                </Col>
            </FormGroup>          
            <FormGroup check row >
                <Col sm={{ offset: 1, size: 5 }} >
                <Button onClick={onClickButton} color="success"> Submit </Button>
                {/*<Link to="/about">About</Link>*/}
                </Col>
            </FormGroup>
        </Form>
    </div>
    );
}

export default Login;
