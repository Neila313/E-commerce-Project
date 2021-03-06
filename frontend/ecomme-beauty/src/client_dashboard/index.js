import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import TabPane from 'react-bootstrap/TabPane'

class DashboardClient extends React.Component {
	logOutSubmit = () => {
		localStorage.clear();
		this.props.history.push('/home');
	};
	render() {
		return (
			<div>
				<Tab.Container id="left-tabs-example" defaultActiveKey="first">
					<Row>
						<Col sm={3}>
							<Nav variant="pills" className="flex-column">
								<Nav.Item>
									<Nav.Link eventKey="first">Tableau de bord</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="second">Commandes</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="third">Détails du compte</Nav.Link>
								</Nav.Item>
									<Button className="btn" onClick={this.logOutSubmit.bind(this)}>
										Sign Out
									</Button>
							
							</Nav>
						</Col>
						<Col sm={9}>
							<Tab.Content>
								<Tab.Pane eventKey="first">
									<p>
										Bonjour Utilisateur À partir du tableau de bord de votre compte, vous pouvez
										visualiser vos commandes récentes, gérer vos adresses de livraison et de
										facturation ainsi que changer votre mot de passe et les détails de votre compte.
									</p>
								</Tab.Pane>
								<Tab.Pane eventKey="second">
									<p>Vos commandes ici</p>
								</Tab.Pane>
								<Tab.Pane eventKey="third">
									<p>Formulaires</p>
									<Form>
										<Form.Group controlId="formGroupClientLastName">
											<Form.Label>Last Name</Form.Label>
											<Form.Control
												type="lastname"
												placeholder="Enter your lastname"
											/>
										</Form.Group>
										<Form.Group controlId="formGroupClientFirstName">
											<Form.Label>First Name</Form.Label>
											<Form.Control
												type="firstname"
												placeholder="Enter your firstname"
											/>
										</Form.Group>
										<Form.Group controlId="formGroupClientEmail">
											<Form.Label>Email address</Form.Label>
											<Form.Control
												type="email"
												placeholder="Enter email"
											/>
										</Form.Group>
										<p>Changement de mots de passe</p>
										<br/>
										<Form.Group controlId="formGroupClientPassword">
											<Form.Label>Mots de passe actuel</Form.Label>
											<Form.Control
												type="password"
												placeholder="Password"
											/>
											<Form.Label>Nouveau mots de passe</Form.Label>
											<Form.Control
												type="password"
												placeholder="Password"
											/>
											<Form.Label>Confirmer le nouveau mots de passe</Form.Label>
											<Form.Control
												type="password"
												placeholder="Password"
											/>
										</Form.Group>
										<Button variant="info" type="submit">
											Enregistrez les modifications
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

export default DashboardClient;
