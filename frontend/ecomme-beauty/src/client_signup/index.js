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
	validateForm = () => {
        // let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //----EMAIL
        if (!this.state.email) {
            formIsValid = false;
            errors["email"] = "*Entrez votre email.";
        }
        if (typeof this.state["email"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state["email"])) {
                formIsValid = false;
                errors["email"] = "*svp entrez un email valide.";
            }
        }
        //--PASSWORD
        if (!this.state.password.length) {
            formIsValid = false;
            errors["password"] = "*svp entrez votre mot de passe.";
        }
        
         else if (typeof this.state["password"] !== "undefined") {
            if (this.state.password.length < 8) {
                formIsValid = false;
                errors["password"] = "*Entrez un mot de passe valide.";
            }
        }

        //---PSEUDO            
        if (!this.state["lastname"]) {
            formIsValid = false;
            errors["lastname"] = "*Entrez votre nom de famille.";
        }

        if (typeof this.state["lastname"] !== "undefined") {
            if (!this.state["lastname"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["lastname"] = "*Entrez des caracteres seulement.";
            }
        }

        //---PRENOM          
        if (!this.state["firstname"]) {
            formIsValid = false;
            errors["firstname"] = "*Entrez votre prenom.";
        }

        if (typeof this.state["firstname"] !== "undefined") {
            if (!this.state["firstname"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["pseudo"] = "*Entrez des caracteres seulement.";
            }
        }

        this.setState({
            errors: errors
        });
        return formIsValid;
    }

	handleSubmit = (event) => {
		event.preventDefault();
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