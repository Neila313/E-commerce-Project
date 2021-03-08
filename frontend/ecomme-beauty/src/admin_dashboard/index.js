import React from 'react';
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { connect } from 'react-redux';
// import { Alert } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
// import Breadcrumb from 'react-bootstrap/Breadcrumb';
import AddProduct from '../admin_addproduct'
import ListProducts from '../admin_listproduct'
import ListCateg from '../admin_category'
import AddCategory from '../admin_addcategory'
import './style.css'

class DashboardAdmin extends React.Component {
	state = {
		lastname: '',
		firstname: '',
		email: '',
		msgSuccessModif: ''
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

	logOutSubmit = () => {
		localStorage.clear();
		this.props.history.push('/admin');
	};
	// componentDidMount() {

	// 	axios
	// 	.get(`${process.env.REACT_APP_API_URL}/admin/${this.props.id}`)
	// 	.then((res) => {

	// 		console(res.data);
	// 	})
	// 	.catch((error) => {
	// 		// this.setState({ error : res.data });
	// 		console.log(error);
	// 	});
	// }

	handleSubmitEdition = async (event) => {
		// async parce que la requete doit attendre sinon elle passera dans else
		event.preventDefault();

		// const { id_admin } = this.props.match.params
		// let token = localStorage.getItem('MyToken')

		let resp = await axios.get(`${process.env.REACT_APP_API_URL}/admin/${this.props.id}`);
		// une requete axios GET et DELETE n'envoient jamais de req.body, elle ne le liront
		// console.log(resp);
		// console.log(resp.data);

		const editedAdmin = {
			//ce qui est avant les deux points est le req.body dans le back /!\
			// id_admin: parseInt(id_admin),
			lastname: this.state.lastname || resp.data[0]['lastname'], // soit tu me mets ce qu'il y a dans l'input OU ce qu'il y a
			firstname: this.state.firstname || resp.data[0]['firstname'],
			email: this.state.email || resp.data[0]['email']
		};
		console.log(editedAdmin);
		console.log('id', this.props.id);

		axios
			.put(`${process.env.REACT_APP_API_URL}/admin/${this.props.id}`, editedAdmin, {
				headers: { authorization: `Bearer ${localStorage.getItem('MyToken')}` }
			})
			.then((res) => {
				console.log(res);
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
<div>
			<Nav   className="navGestion">
			<div className="logoGestion"></div>
		</Nav>


			<div className="DashAdmin">
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
									<Nav.Link className="nav-link" eventKey="second">Ajoutez un produit
									</Nav.Link>
								</Nav.Item>

								<Nav.Item>
									<Nav.Link className="nav-link" eventKey="third">Les produits au catalogue
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link className="nav-link" eventKey="fourth">Ajoutez vos catégories de produits
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link className="nav-link" eventKey="fifth">Les catégories de produits
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
									<p className="nameUser">Bienvenue, <span>administrateur</span> !</p>
									<p className="welcomeUser">
										À partir du tableau de bord de votre compte, vous pouvez visualiser vos
										commandes récentes, gérer vos adresses de livraison et de facturation ainsi que
										changer votre mot de passe et les détails de votre compte.
									</p>
								</Tab.Pane>

								<Tab.Pane className="tab-pane" eventKey="second">
									<p>Ajouter un nouveau produit au catalogue</p>
									<AddProduct/>
								</Tab.Pane>

								<Tab.Pane className="tab-pane" eventKey="third">
									<p>Tous les produits du catalogue</p>
									<ListProducts/>
								</Tab.Pane>

								<Tab.Pane eventKey="fourth">
									<p>Ajouter une nouvelle catégorie de produits</p>
									<AddCategory/>
								</Tab.Pane>
								<Tab.Pane eventKey="fifth">
									<p>Toutes les catégories de produits</p>
									<ListCateg/>
								</Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</div>
	</div>
		);
	}
}

const mapStateToProps = (state /*, ownProps*/) => {
	return {
		token: state.adminReducer.token,
		id: state.adminReducer.id
	};
};

// const mapDispatchToProps = { loginAdmin }

export default connect(mapStateToProps)(DashboardAdmin);
