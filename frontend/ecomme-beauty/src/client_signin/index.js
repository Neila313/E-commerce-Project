import React from 'react';
import './style.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Alert} from 'react-bootstrap';
var jwt = require('jsonwebtoken');

class ClientSignin extends React.Component {

    state = {
        email: '',
        password: '',
        message: '',
    };
  
  signinClientEmail = event => {
    this.setState({ email: event.target.value });
  };
  signinClientPassword = event => {
    this.setState({ password: event.target.value });
  };
  
  handleSubmit = event => {
    event.preventDefault();

    const userSignin = {
        email: this.state.email,
        password: this.state.password,};

    axios.post("http://localhost:8080/sign-in",  userSignin )
  .then(res => {
    if(res.status === 200){
      console.log(res);
      let decoded = jwt.decode(res.data.token);
      let loggedUser = {
        token: res.data.token,
        id: decoded.id,
        email: decoded.email
      }; 
      console.log(decoded)
      console.log(loggedUser)
    } else if (res.status === 203){
    this.setState({ message : res.data });



    }
  })
  .catch(error => {
    // this.setState({ error : res.data });
    console.log(error);
  })
};


render() {
    return (

        <div>

            <h2>Connexion</h2>
        
				<Form onSubmit={this.handleSubmit}>

                { this.state.message ?  <Alert variant="danger" > {this.state.message} </Alert> : null }
					<Form.Group controlId="formEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" onChange={this.signinClientEmail} />
					</Form.Group>
					<Form.Group controlId="formPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" onChange={this.signinClientPassword} />
					</Form.Group>
					<Button variant="info" type="submit">
						Connexion
					</Button>
				</Form>

                </div>
    )
}
}

export default ClientSignin;