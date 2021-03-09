import React from 'react';
import './style.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import HTTP from '../provider/http';
import {Alert} from 'react-bootstrap';

class ClientSignup extends React.Component {
	state = {
		lastname: '',
		firstname: '',
		email: '',
		password: '',
		msgConnexion: '',
		errors: {
			
		},
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
		if (this.validateForm()) {
		const user = {
			lastname: this.state.lastname,
			firstname: this.state.firstname,
			email: this.state.email,
			password: this.state.password
		};
		HTTP.post('customer/sign-up', user).then((res) => {
			if (res.status === 200) {
				console.log(res);

				this.setState({ msgConnexion: 'Bien ajouté' });
			}
			console.log(res);
			console.log(res.data);
		});
	}
	};
	validateForm = () => {

		let errors = {};
		let formIsValid = true;
	
		//_______Name
		if (!this.state.lastname) {
		  formIsValid = false;
		  errors["lastname"] = "*Le nom de famille est un champ obligatoire.Veuillez le renseigner";
		}
	
		if (typeof this.state["lastname"] !== "undefined") {
		  if (!this.state["lastname"].match(/^[a-zA-Z ]*$/)) {
			formIsValid = false;
			errors["lastname"] = "*Veuillez entrer uniquement des lettres.";
		  }
		}
	
		  //_______Last Name
		  if (!this.state.firstname) {
			formIsValid = false;
			errors["firstname"] = "*Le prénom est un champ obligatoire.Veuillez le renseigner";
		  }
	
		  if (typeof this.state["firstname"] !== "undefined") {
			if (!this.state["firstname"].match(/^[a-zA-Z ]*$/)) {
			  formIsValid = false;
			  errors["firstname"] = "*Veuillez entrer uniquement des lettres.";
			}
		  }
	
		//______Email validation
		if (!this.state["email"]) {
		  formIsValid = false;
		  errors["email"] = "*L'email est un champ obligatoire.Veuillez le renseigner";
		}
	
		if (typeof this.state["email"] !== "undefined") {
		  //regular expression for email validation
		  var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		  if (!pattern.test(this.state["email"])) {
			formIsValid = false;
			errors["email"] = "*Veuillez entrer un email valide.";
		  }
		}
	
	  //_______Password
		if (!this.state["password"]) {
		  formIsValid = false;
		  errors["password"] = "*Le mot de passe est un champ obligatoire.Veuillez le renseigner";
		}
	
	  // Must be at least 8 characters
	  // At least 1 special character from @#$%&
	  // At least 1 number, 1 lowercase, 1 uppercase lette
		if (typeof this.state["password"] !== "undefined") {
		  if (!this.state["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
			formIsValid = false;
			errors["password"] = "*Entrez un mot de passe sécurisé. Il doit contenir 8 caractères, 1 caractère spécial (@#$%&), 1 nombre, 1 lettre minuscule, 1 lettre majuscule";
		  }
		}
	
		this.setState({
		  errors: errors
		});
		return formIsValid;
	
	  }

	render() {
		console.log(this.state);
		return (
			<div className="containerForm">

<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap" rel="stylesheet"></link>

			
				<h2>Inscription</h2>
				<p>veuillez remplir les champs suivants</p>

				<Form onSubmit={this.handleSubmit} className="FormGroup">
					{this.state.msgConnexion ? <Alert variant="success"> {this.state.msgConnexion} </Alert> : null}

					<Form.Group controlId="formGroupClientLastName" className="form-group">
						<Form.Label>Nom de famille</Form.Label>
						<Form.Control type="lastname"  onChange={this.inputClientLastName} />
						<div className="form">{this.state.errors.lastname}</div>


					</Form.Group>
					<Form.Group controlId="formGroupClientFirstName" className="form-group">
						<Form.Label>Prénom</Form.Label>
						<Form.Control
							type="firstname"
							onChange={this.inputClientFirstName}
						/>
						<div className="form">{this.state.errors.firstname}</div>

					</Form.Group>
					<Form.Group controlId="formGroupClientEmail" className="form-group">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" onChange={this.inputClientEmail} />
						<div className="form">{this.state.errors.email}</div>

					</Form.Group>
					<Form.Group controlId="formGroupClientPassword" className="form-group">
						<Form.Label>Mot de passe</Form.Label>
						<Form.Control className="{'form-control'}" type="password" onChange={this.inputClientPassword} />
						<div className="form">{this.state.errors.password}</div>
					</Form.Group>
					<Button className="btn1 effect01" type="submit" variant="light"
>
						<span>Créer mon compte</span>
					</Button>
				</Form>
				<br />
			</div>
		);
	}
}

export default  ClientSignup;