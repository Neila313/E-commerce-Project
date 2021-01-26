import React from 'react';
import './style.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Alert} from 'react-bootstrap';

class ClientSignup extends React.Component {
	state = {
		lastname: '',
		firstname: '',
		email: '',
		password: '',
		msgConnexion: ''
	};

	inputClientLastName = (event) => {
		this.setState({ lastname: event.target.value });
	};
	inputClientFirstName = (event) => {
		this.setState({ firstname: event.target.value });
	};
	inputClientEmail = (event) => {
		this.setState({ email: event.target.value });
	};
	inputClientPassword = (event) => {
		this.setState({ password: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const user = {
			lastname: this.state.lastname,
			firstname: this.state.firstname,
			email: this.state.email,
			password: this.state.password
		};
		axios.post('http://localhost:8080/auth_client/sign-up', user).then((res) => {
			if (res.status === 200) {
				console.log(res);

				this.setState({ msgConnexion: 'Bien ajouté' });
			}
			console.log(res);
			console.log(res.data);
		});
	};

	render() {
		return (
			<div>
			
				<h2>Création compte</h2>

				<Form onSubmit={this.handleSubmit}>
					{this.state.msgConnexion ? <Alert variant="success"> {this.state.msgConnexion} </Alert> : null}

					<Form.Group controlId="formGroupClientLastName">
						<Form.Label>Last Name</Form.Label>
						<Form.Control type="lastname" placeholder="Enter your lastname" onChange={this.inputClientLastName} />
					</Form.Group>
					<Form.Group controlId="formGroupClientFirstName">
						<Form.Label>First Name</Form.Label>
						<Form.Control
							type="firstname"
							placeholder="Enter your firstname"
							onChange={this.inputClientFirstName}
						/>
					</Form.Group>
					<Form.Group controlId="formGroupClientEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" onChange={this.inputClientEmail} />
					</Form.Group>
					<Form.Group controlId="formGroupClientPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" onChange={this.inputClientPassword} />
					</Form.Group>
					<Button variant="info" type="submit">
						Créer mon compte
					</Button>
				</Form>
				<br />
			</div>
		);
	}
}

export default  ClientSignup;