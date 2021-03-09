import React from 'react';
import './style.css';
import { connect } from 'react-redux';
import { newProduct } from '../store/action/products';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Alert } from 'react-bootstrap';
import axios from 'axios';

class AddProduct extends React.Component {
	state = {
		name: '',
		description: '',
		details: '',
		price: '',
		image: '',
        msgSuccess: '',
		selectedOption: '',
		// categories: []
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
	inputDetails = (event) => {
		this.setState({ details: event.target.value });
	};

	inputPrice = (event) => {
		this.setState({ price: event.target.value });
	};
	inputImage = (event) => {
		this.setState({ image: event.target.value });
	};

    handleSelect = ({target}) => {
		this.setState({ selectedOption: target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();

		const product = {
			name: this.state.name,
			description: this.state.description,
			details: this.state.details,
			price: this.state.price,
			image: this.state.image,
			id_category: this.state.selectedOption
		};

		axios
			.post(process.env.REACT_APP_API_URL + '/products', product, {
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
			<div className="addProdi">
				<Form onSubmit={this.handleSubmit} className="FormGroup">
					{this.state.msgSuccess ? <Alert variant="success"> {this.state.msgSuccess} </Alert> : null}

					<Form.Group controlId="formGroupName" className="form-group">
						<Form.Label>Nom</Form.Label>
						<Form.Control
							type="name"
							placeholder="Enter the name of your product"
							onChange={this.inputNameProduct}
						/>
					</Form.Group>
					<Form.Group controlId="formGroupDescription" className="form-group">
						<Form.Label>Description</Form.Label>
						<Form.Control
							type="description"
							placeholder="Enter the description of your product"
							onChange={this.inputDesc}
						/>
					</Form.Group>
					<Form.Group controlId="formGroupDetails" className="form-group">
						<Form.Label>Détails</Form.Label>
						<Form.Control
							type="détails"
							placeholder="Enter the details of your product"
							onChange={this.inputDetails}
						/>
					</Form.Group>
					<Form.Group controlId="formGroupCategory" className="form-group">
						<Form.Label>Catégorie</Form.Label>
						<select className="selectFilter" value={this.state.selectedOption} onChange={this.handleSelect}>
							<option>Veuillez selectionnez une categorie</option>
							{this.props.categories.map(({ id_category, denomination }) => (
								<option key={id_category} value={id_category}>{denomination}</option>
							))}
						</select>
						{/* <Form.Control
							type="category"
							placeholder="Choose the category"
							as="select"
							value={this.state.selectedOption}
							custom
							onChange={this.handleSelect}
						>
							{this.state.categories.map(({ id_category, denomination }) => {
								return <option value={id_category}>{denomination}</option>;
							})}
						</Form.Control> */}
					</Form.Group>
					<Form.Group controlId="formGroupPrice" className="form-group">
						<Form.Label>Prix</Form.Label>
						<Form.Control type="price" placeholder="Price" onChange={this.inputPrice} />
					</Form.Group>
					<Form.Group controlId="formGroupImage" className="form-group">
						<Form.Label>Image</Form.Label>
						<Form.Control placeholder="copy your link picture" onChange={this.inputImage} />
					</Form.Group>
					<Button className="btn1 effect01" variant="light" type="submit">
						<span>Ajouter mon produit</span>
					</Button>
				</Form>
			</div>
		);
	}
}

const mapStateToProps = (state /*, ownProps*/) => {
	console.log(state)
	return {
		product: state.productsReducer.payload,
		categories: state.categoryReducer.categories
	};
};

const mapDispatchToProps = { newProduct};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
