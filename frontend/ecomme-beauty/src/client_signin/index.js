import React from 'react';
import './style.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import HTTP from '../provider/http';
import { connect } from 'react-redux';
// import { loginClient } from '../store/action/admin_connect';
import { Alert } from 'react-bootstrap';
var jwt = require('jsonwebtoken');

class ClientSignin extends React.Component {
	state = {
		email: '',
		password: '',
		message: '',
		errors: {}
	};

	signinClientEmail = (event) => {
		this.setState({ email: event.target.value });
	};
	signinClientPassword = (event) => {
		this.setState({ password: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		if (this.validateForm()) {
			const userSignin = {
				email: this.state.email,
				password: this.state.password
			};

			HTTP.post('/customer/sign-in', userSignin)
				.then((res) => {
					if (res.status === 200) {
						console.log(res);
						let decoded = jwt.decode(res.data.token);
						let loggedUser = {
							token: res.data.token,
							id: decoded.id,
							email: decoded.email
						};
						// this.props.loginClient(loggedUser)
						localStorage.setItem('tokenUser', res.data.token);
						//re-diriger vers dashboard
						this.props.history.push('/mon-compte');
						console.log(decoded);
						console.log(loggedUser);
					} else if (res.status === 203) {
						this.setState({ message: res.data });
					}
				})
				.catch((error) => {
					// this.setState({ error : res.data });
					console.log(error);
				});
		}
	};

	validateForm = () => {
		let errors = {};
		let formIsValid = true;

		//______Email validation
		if (!this.state['email']) {
			formIsValid = false;
			errors['email'] = "*L'email est un champ obligatoire.Veuillez le renseigner";
		}

		if (typeof this.state['email'] !== 'undefined') {
			//regular expression for email validation
			var pattern = new RegExp(
				/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
			);
			if (!pattern.test(this.state['email'])) {
				formIsValid = false;
				errors['email'] = '*Veuillez entrer un email valide.';
			}
		}

		//_______Password
		if (!this.state['password']) {
			formIsValid = false;
			errors['password'] = '*Le mot de passe est un champ obligatoire.Veuillez le renseigner';
		}
		this.setState({
			errors: errors
		});
		return formIsValid;
	};

	render() {
		return (
			<div className="containerForm">
				<h2>Connexion</h2>
				<p>Veuillez indiquer votre email et mot de passe :</p>

				<Form onSubmit={this.handleSubmit} className="FormGroup">
					{this.state.message ? <Alert variant="danger"> {this.state.message} </Alert> : null}
					<Form.Group controlId="formEmail" className="form-group">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" onChange={this.signinClientEmail} />
						<div className="form">{this.state.errors.email}</div>
					</Form.Group>
					<Form.Group controlId="formPassword" className="form-group">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" onChange={this.signinClientPassword} />
						<div className="form">{this.state.errors.password}</div>
					</Form.Group>
					<Button className="btn2 effect02" variant="light" type="submit">
						Connexion
					</Button>
				</Form>
			</div>
		);
	}
}
const mapStateToProps = (state /*, ownProps*/) => {
	return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ClientSignin);
