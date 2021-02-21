import React from 'react';
import './style.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Alert } from 'react-bootstrap';

class AdminSignup extends React.Component {
	state = {
		lastname: '',
		firstname: '',
		email: '',
		password: '',
		msgConnexion: ''
	};

	inputLastName = (event) => {
		this.setState({ lastname: event.target.value });
	};
	inputFirstName = (event) => {
		this.setState({ firstname: event.target.value });
	};
	inputEmail = (event) => {
		this.setState({ email: event.target.value });
	};
	inputPassword = (event) => {
		this.setState({ password: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const admin = {
			lastname: this.state.lastname,
			firstname: this.state.firstname,
			email: this.state.email,
			password: this.state.password
		};
		axios.post(process.env.REACT_APP_API_URL + '/sign-up', admin).then((res) => {
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

					<Form.Group controlId="formGroupLastName">
						<Form.Label>Last Name</Form.Label>
						<Form.Control type="lastname" placeholder="Enter your lastname" onChange={this.inputLastName} />
					</Form.Group>
					<Form.Group controlId="formGroupFirstName">
						<Form.Label>First Name</Form.Label>
						<Form.Control
							type="firstname"
							placeholder="Enter your firstname"
							onChange={this.inputFirstName}
						/>
					</Form.Group>
					<Form.Group controlId="formGroupEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" onChange={this.inputEmail} />
					</Form.Group>
					<Form.Group controlId="formGroupPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" onChange={this.inputPassword} />
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

export default AdminSignup;
