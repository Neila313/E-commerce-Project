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
import { Link, withRouter } from 'react-router-dom';
import AddProduct from '../admin_addproduct';
import ListProducts from '../admin_listproduct';
import ListCateg from '../admin_category';
import AddCategory from '../admin_addcategory';
import './style.css';

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
	handleSubmitEdition = async (event) => {
		event.preventDefault();

		let resp = await axios.get(`${process.env.REACT_APP_API_URL}/admin/${this.props.id}`);

		const editedAdmin = {
			lastname: this.state.lastname || resp.data[0]['lastname'],
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
				<Nav className="navGestion">
					<div className="logoGestion" />
				</Nav>

				<div className="DashAdmin">
					<Tab.Container id="left-tabs-example" className="tabcontainer" defaultActiveKey="first">
						<Row className="rowDash">
							<Col className="col" sm={3}>
								<Nav variant="link" className="flex-column">
									<Nav.Item className="nav-item">
										<Nav.Link className="nav-link" eventKey="first"
										as={Link} to="/admin/product">
											Tableau de bord
											<span className="iconeDashboard" />
										</Nav.Link>
									</Nav.Item>

									<Nav.Item>
										<Nav.Link className="nav-link" eventKey="second" >
											Ajoutez un produit
										</Nav.Link>
									</Nav.Item>

									<Nav.Item>
										<Nav.Link className="nav-link" eventKey="third">
											Les produits au catalogue
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link className="nav-link" eventKey="fourth">
											Ajoutez vos catégories de produits
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link className="nav-link" eventKey="fifth">
											Les catégories de produits
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
										<p className="nameUser">
											Bienvenue, <span>administrateur</span> !
										</p>
										<p className="welcomeUser">
											À partir du tableau de bord, vous pouvez gérer de manière autonome le site e-commerce My precious argan. 
										</p>
									</Tab.Pane>

									<Tab.Pane className="tab-pane" eventKey="second">
										<p>Ajouter un nouveau produit au catalogue</p>
										<AddProduct />
									</Tab.Pane>

									<Tab.Pane className="tab-pane" eventKey="third">
										<p>Tous les produits du catalogue</p>
										<ListProducts />
									</Tab.Pane>

									<Tab.Pane eventKey="fourth">
										<p>Ajouter une nouvelle catégorie de produits</p>
										<AddCategory />
									</Tab.Pane>
									<Tab.Pane eventKey="fifth">
										<p>Toutes les catégories de produits</p>
										<ListCateg />
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

export default withRouter(connect(mapStateToProps)(DashboardAdmin));
