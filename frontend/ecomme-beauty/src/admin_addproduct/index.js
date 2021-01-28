import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './style.css';
import { connect } from 'react-redux';
import { newProduct } from '../store/action/products';
import { listCategory } from '../store/action/category';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Alert } from 'react-bootstrap';
import axios from 'axios';

class AddProduct extends React.Component {
	state = {
		name: '',
		description: '',
		price: '',
		image: '',
		id_category: '',
		msgSuccess: '',
		categories: []
	};

	returnSubmit = () => {
		this.props.history.push('/admin/dashboard');
	};

	// /!\ Bien écrire les elements exactement comme dans la db
	inputNameProduct = (event) => {
		this.setState({ name: event.target.value });
	};
	inputDesc = (event) => {
		this.setState({ description: event.target.value });
	};

	inputPrice = (event) => {
		this.setState({ price: event.target.value });
	};
	inputImage = (event) => {
		this.setState({ image: event.target.value });
	};
	inputCategory = (event) => {
		this.setState({ id_category: event.target.value });
	};

	componentDidMount() {
		axios
			.get('http://localhost:8080/category', {
				headers: { authorization: `Bearer ${localStorage.getItem('MyToken')}` }
			})
			.then((res) => {
				this.setState({ categories: res.data });
				console.log(res.data);

				this.props.listCategory(res.data);
			})
			.catch((error) => {
				// this.setState({ error : res.data });
				console.log(error);
			});
	}

	handleSubmit = (event) => {
		event.preventDefault();

		const product = {
			name: this.state.name,
			description: this.state.description,
			price: this.state.price,
			image: this.state.image,
			id_category: this.state.id_category
		};

		axios
			.post('http://localhost:8080/products', product, {
				headers: { authorization: `Bearer ${localStorage.getItem('MyToken')}` }
			})
			//recuperation du token stocké dans le localStorage comme ca y'a plus "no token"
			.then((res) => {
				if (res.status === 200) {
					console.log(res);
					console.log(res.data);
					this.setState({ msgSuccess: 'Produit ajouté avec succès' });
					this.props.newProduct(res.data[0]);
				}
			})
			.catch((error) => {
				// this.setState({ error : res.data });
				console.log(error);
			});
	};

	render() {
		return (
			<div>
				<Jumbotron>
					<h1>Gérer nos produits</h1>
					<Button variant="info" type="submit" onClick={this.returnSubmit.bind(this)}>
						Retour sur mon Dashboard
					</Button>
				</Jumbotron>

				<Form onSubmit={this.handleSubmit}>
					{this.state.msgSuccess ? <Alert variant="success"> {this.state.msgSuccess} </Alert> : null}

					<Form.Group controlId="formGroupName">
						<Form.Label>Nom</Form.Label>
						<Form.Control
							type="name"
							placeholder="Enter the name of your product"
							onChange={this.inputNameProduct}
						/>
					</Form.Group>
					<Form.Group controlId="formGroupDescription">
						<Form.Label>Description</Form.Label>
						<Form.Control
							type="description"
							placeholder="Enter the description of your product"
							onChange={this.inputDesc}
						/>
					</Form.Group>
					<Form.Group controlId="formGroupCategory">
						<Form.Label>Catégorie</Form.Label>
						<Form.Control
							type="category"
							placeholder="Choose the category"
							as="select"
							custom
                            onChange={this.inputCategory}> 
                            {this.categories}
							<option>1</option>
						
						</Form.Control>
					</Form.Group>
					<Form.Group controlId="formGroupPrice">
						<Form.Label>Prix</Form.Label>
						<Form.Control type="price" placeholder="Price" onChange={this.inputPrice} />
					</Form.Group>
					<Form.Group controlId="formGroupImage">
						<Form.Label>Image</Form.Label>
						<Form.Control placeholder="copy your link picture" onChange={this.inputImage} />
					</Form.Group>
					<Button variant="info" type="submit">
						Ajouter mon produit
					</Button>
				</Form>
			</div>
		);
	}
}

const mapStateToProps = (state /*, ownProps*/) => {
	return {
		product: state.productsReducer.payload,
		category: state.categoryReducer.categories
	};
};

const mapDispatchToProps = { newProduct, listCategory };

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
