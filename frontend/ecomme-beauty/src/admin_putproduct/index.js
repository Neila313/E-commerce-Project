import React from 'react';
import { connect } from 'react-redux';
import { changeProduct } from '../store/action/products';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Alert, Nav } from 'react-bootstrap';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { withRouter } from 'react-router-dom';
import './style.css'

class PutProduct extends React.Component {
	state = {
		name: '',
		description: '',
		details: '',
		price: '',
		image: '',
		id_category: 0,
		msgSuccess: '',
		selectedOption: ''
	};

	returnSubmit = () => {
		this.props.history.push('/admin/dashboard');
	};
	handleSelect = ({target}) => {
		this.setState({ selectedOption: target.value });
	};

	// /!\ Bien écrire les elements exactement comme dans la db
	putNameProduct = (event) => {
		this.setState({ name: event.target.value });
	};
	putDesc = (event) => {
		this.setState({ description: event.target.value });
	};
	putDetails = (event) => {
		this.setState({ details: event.target.value });
	};

	putPrice = (event) => {
		this.setState({ price: event.target.value });
	};
	putImage = (event) => {
		this.setState({ image: event.target.value });
	};
	putCategory = (event) => {
		this.setState({ id_category: event.target.value });
	};

	componentDidMount() {
		const { id_product } = this.props.match.params;
		const product = this.props.products.filter((elem) => elem.id_product === parseInt(id_product));

		this.setState({
			name: product[0].name,
			description: product[0].description,
			details: product[0].details,
			price: product[0].price,
			image: product[0].image,
			id_category: product[0].id_category
		});
        console.log(this.state);
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		const { id_product } = this.props.match.params;

		let token = localStorage.getItem('MyToken');
		token = await jwt.decode(token);

		const product = {
			id_product: parseInt(id_product),
			id_admin: parseInt(token.id),
			name: this.state.name,
			description: this.state.description,
			details: this.state.details,
			price: parseInt(this.state.price),
			image: this.state.image,
			id_category: parseInt(this.state.id_category)
		};
		axios
			.put(process.env.REACT_APP_API_URL + '/products/' + id_product, product, {
				headers: { authorization: `Bearer ${localStorage.getItem('MyToken')}` }
			})
			//recuperation du token stocké dans le localStorage comme ca y'a plus "no token"
			.then((res) => {
				if (res.status === 200) {
					console.log(res);
					console.log(res.data);
					this.setState({ msgSuccess: 'Produit modifié avec succès' });
					this.props.changeProduct(product);
				}
			})
			.catch((error) => {
				// this.setState({ error : res.data });
				console.log(error);
			});
	};
    

	render() {
				const { id_product } = this.props.match.params;

		return (
			<div className="PutContainer">
                <Nav className="navGestion"></Nav>
				
					<Breadcrumb className="breadcrumb">
					<Breadcrumb.Item className="breadcrumb-item" href="/admin/dashboard/">
						Dashboard
					</Breadcrumb.Item>
					<Breadcrumb.Item active>Modifier le produits n°{id_product}</Breadcrumb.Item>
				</Breadcrumb>
			
				<Form onSubmit={this.handleSubmit} className="FormGroup">
					{this.state.msgSuccess ? <Alert variant="success"> {this.state.msgSuccess} </Alert> : null}

					<Form.Group controlId="formGroupName" className="form-group">
						<Form.Label>Nom</Form.Label>
						<Form.Control
							type="name"
							value={this.state.name}
							onChange={this.putNameProduct}
						/>
					</Form.Group>
					<Form.Group controlId="formGroupDescription"  className="form-group">
						<Form.Label>Description</Form.Label>
						<Form.Control
							type="description"
							onChange={this.putDesc}
							value={this.state.description}
						/>
					</Form.Group>
					<Form.Group controlId="formGroupDetails"  className="form-group">
						<Form.Label>Détails du produit</Form.Label>
						<Form.Control
							type="détails"
							onChange={this.putDetails}
							value={this.state.details}
						/>
					</Form.Group>
					<Form.Group controlId="formGroupCategory"  className="form-group">
						<Form.Label>Catégorie</Form.Label>
						<select className="selectFilter" value={this.state.selectedOption} onChange={this.handleSelect}>
							<option>Veuillez selectionnez une categorie</option>
							{this.props.categories.map(({ id_category, denomination }) => (
								<option key={id_category} value={id_category}>{denomination}</option>
							))}
						</select>
					</Form.Group>
					<Form.Group controlId="formGroupPrice"  className="form-group">
						<Form.Label>Prix</Form.Label>
						<Form.Control
							type="price"
							value={this.state.price}
							onChange={this.putPrice}
						/>
					</Form.Group>
					<Form.Group controlId="formGroupImage"  className="form-group">
						<Form.Label>Image</Form.Label>
						<Form.Control
							value={this.state.image}
							onChange={this.putImage}
						/>
					</Form.Group>
					<Button className="btn1 effect01" variant="light"  type="submit">
						<span>Modifier mon produit</span>
					</Button>
				</Form>
			</div>
		);
	}
}

const mapStateToProps = (state /*, ownProps*/) => {
	return {
		products: state.productsReducer.products,
		categories: state.categoryReducer.categories

	};
};

const mapDispatchToProps = {changeProduct};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PutProduct));
