import React from 'react';
import HTTP from '../provider/http';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import CommandeClient from '../commande_client/index'
import { Alert } from 'react-bootstrap';


import { connect } from 'react-redux';
// import { listCommande } from '../store/action/commande_client';

import './style.css';

// import TabPane from 'react-bootstrap/TabPane'

class DashboardClient extends React.Component {
	state = {
		dataUser: [],
		lastname: '',
		firstname: '',
		email: '',
		msgSuccessModif:''

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

	logOutSubmit = () => {
		localStorage.clear();
		this.props.history.push('/home');
	};

	componentDidMount() {
		this.loadCustomer();
	}
	loadCustomer() {
		HTTP.get('/customer/user').then((res) => {
			this.setState({dataUser: res.data,
				lastname: res.data[0].lastname,
				firstname: res.data[0].firstname,
				email: res.data[0].email
			 });
			console.log("user", this.state);
		});
	}

	handleSubmitEdition = (event) => {
		event.preventDefault();

		const user = {
			lastname: this.state.lastname,
			firstname: this.state.firstname,
			email: this.state.email,
		};

		HTTP.put('/customer/put-user/', user)
			.then((res) => {
				console.log(res.data);
				this.setState({ msgSuccessModif: 'Votre profil a bien été modifié !' });
			})
			.catch((error) => {
				console.log('catch error');
				console.log(error);
			});
	};




	render() {
		return (
			<div className="tabcontainer">
				<Breadcrumb className="breadcrumb">
					<Breadcrumb.Item className="breadcrumb-item" href="/home">
						Accueil
					</Breadcrumb.Item>
					<Breadcrumb.Item active>Mon compte</Breadcrumb.Item>
				</Breadcrumb>

				<Tab.Container id="left-tabs-example" className="tabcontainer" defaultActiveKey="first">
					<Row className="rowDash">
						<Col className="col" sm={3}>
							<Nav variant="link" className="flex-column">
								<Nav.Item className="nav-item">
									<Nav.Link className="nav-link" eventKey="first">Tableau de bord
									<span className="iconeDashboard"></span>
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link className="nav-link" eventKey="second">Commandes
									<span className="iconeCommande"></span>
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link className="nav-link" eventKey="third">Détails du compte
									<span className="iconeCompte"></span>
									</Nav.Link>
								</Nav.Item>
								<Button className="btn2 effect02" onClick={this.logOutSubmit.bind(this)}>
									<span>Déconnexion</span>
								</Button>
							</Nav>
						</Col>
						<Col sm={9}>
							<Tab.Content className="tab-content">
								<Tab.Pane className="tab-pane" eventKey="first">
									<p className="nameUser">Bienvenue, <span>{this.state.firstname}</span> !</p>
									<p className="welcomeUser">
										À partir du tableau de bord de votre compte, vous pouvez visualiser vos
										commandes récentes, gérer vos adresses de livraison et de facturation ainsi que
										changer votre mot de passe et les détails de votre compte.
									</p>
								</Tab.Pane>
								<Tab.Pane className="tab-pane" eventKey="second">
									<p>Vos commandes ici</p>
									<CommandeClient></CommandeClient>
								</Tab.Pane>
								<Tab.Pane className="tab-pane" eventKey="third">
									<Form onSubmit={this.handleSubmitEdition} className="formUser">
									{this.state.msgSuccessModif ? (
						<Alert variant="success"> {this.state.msgSuccessModif} </Alert>
					) : null}
										<Form.Group controlId="formGroupClientLastName">
											<Form.Label className="form-label">Nom</Form.Label>
											<Form.Control value={this.state.lastname} className="custom" type="lastname" onChange={this.inputClientLastName}/>
										</Form.Group>
										<Form.Group controlId="formGroupClientFirstName">
											<Form.Label>Prénom</Form.Label>
											<Form.Control value={this.state.firstname} className="custom" type="firstname" onChange={this.inputClientFirstName}/>
										</Form.Group>
										<Form.Group controlId="formGroupClientEmail">
											<Form.Label>Email</Form.Label>
											<Form.Control value={this.state.email}  className="custom" type="email" onChange={this.inputClientEmail}/>
										</Form.Group>
										<Button className="btn2 effect02" type="submit">
											<span>Enregistrez les modifications</span>
										</Button>
									</Form>
								</Tab.Pane>
								{/* <Tab.Pane eventKey="fourth">
									<Button className="btn" onClick={this.logOutSubmit.bind(this)}>
										Sign Out
									</Button>
								</Tab.Pane> */}
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {

		recapCommande:state.commandeReducer.recapCommande,
		id: state.clientReducer.id,
		email: state.clientReducer.email,


		
	};
};

// const mapDispatchToProps = { listCommande};

export default connect(mapStateToProps)(DashboardClient);