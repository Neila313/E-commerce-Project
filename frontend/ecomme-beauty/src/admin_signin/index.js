import React from 'react';
import './style.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {connect} from 'react-redux'
import { loginAdmin } from '../store/action/admin_connect';
import {Alert} from 'react-bootstrap';
var jwt = require('jsonwebtoken');

class AdminSignin extends React.Component {

    state = {
        email: '',
        password: '',
        message: '',
    };
  
  signinEmail = event => {
    this.setState({ email: event.target.value });
  };
  signinPassword = event => {
    this.setState({ password: event.target.value });
  };
  
  handleSubmit = event => {
    event.preventDefault();

    const adminSignin = {
        email: this.state.email,
        password: this.state.password,};

    axios.post(process.env.REACT_APP_API_URL + "/sign-in",  adminSignin )
  .then(res => {
    if(res.status === 200){
      console.log(res);
      let decoded = jwt.decode(res.data.token);
      let loggedAdmin = {
        token: res.data.token,
        id: decoded.id,
        email: decoded.email
      };         
      this.props.loginAdmin(loggedAdmin)
      localStorage.setItem("MyToken", res.data.token) 
      this.props.history.push('/admin/dashboard/');

      console.log(decoded)
      console.log(loggedAdmin)
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
						<Form.Control type="email" placeholder="Enter email" onChange={this.signinEmail} />
					</Form.Group>
					<Form.Group controlId="formPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" onChange={this.signinPassword} />
					</Form.Group>
					<Button variant="info" type="submit">
						Connexion
					</Button>
				</Form>

                </div>
    )
}
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {

  }
}

const mapDispatchToProps = { loginAdmin }



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminSignin) ;
 