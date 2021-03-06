import React from 'react';
import { connect } from 'react-redux';
import {  deleteProduct } from '../store/action/products';
import axios from 'axios';
// import Card from 'react-bootstrap/Card';
// import ListGroup from 'react-bootstrap/ListGroup';
// import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import '../admin_listproduct/style.css';
import { Alert } from 'react-bootstrap';

// import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/esm/Button';

class ListProducts extends React.Component {
	state = {
		// products: [],
		msgSuccess: ''
	};

	returnSubmit = () => {
		this.props.history.push('/admin/dashboard');
	};

	ModifProductSubmit = (id_product) => {
		this.props.history.push('/admin/modifyproduct/' + id_product);
	};

	// componentDidMount() {
	// 	console.log(this);

	// 	axios
	// 		.get(process.env.REACT_APP_API_URL + '/products')
	// 		.then((res) => {
	// 			this.setState({ products: res.data });
	// 			this.props.listProducts(res.data);
	// 		})
	// 		.catch((error) => {
	// 			// this.setState({ error : res.data });
	// 			console.log(error);
	// 		});
	// }

	deleteRow(id_product, e) {
		axios
			.delete(`${process.env.REACT_APP_API_URL}/products/${id_product}`, {
				headers: { authorization: `Bearer ${localStorage.getItem('MyToken')}` }
			})
			.then((res) => {
				if(res.status === 200) {
					this.props.deleteProduct(id_product)
					this.setState({ msgSuccess: 'Produit supprimé avec succès' });
				} 
				// console.log(res);
				// console.log(res.data);
				// const products = this.state.products.filter((item) => item.id_product !== id_product);
				// this.setState({ products });
			});
	}

	render() {
		return (
			<div>
				<Button variant="info" type="submit" onClick={this.returnSubmit.bind(this)}>
					Retour sur mon Dashboard
				</Button>

				<p>Vos produits</p>
				{this.state.msgSuccess ? <Alert variant="success"> {this.state.msgSuccess} </Alert> : null}

				<Table striped bordered hover size="sm">
					<thead>
						<tr>
							<th>ID Produit</th>
							<th>ID Admin</th>
							<th>Nom du produit</th>
							<th>Description produit</th>
							<th>Détail du produit</th>
							<th>Catégorie</th>
							<th>Prix</th>
							<th>Image</th>
							<th>Modifier le produit</th>
						</tr>
					</thead>
					<tbody>

						{this.props.products.map((elem) => {
							console.log(elem);
							
							return (
								<tr key={elem.id_product}>
									<td>{elem.id_product}</td>
									<td>{elem.id_admin}</td>
									<td>{elem.name}</td>
									<td>{elem.description}</td>
									<td>{elem.details}</td>
									<td>
										{this.props.categories.find((ele) => 
											ele.id_category === elem.id_category
										).denomination
									}
									</td>
									<td>{elem.price}</td>
									<td>
										<Image src={elem.image} className="image-table" thumbnail />
									</td>
									<td>
										<Button
											variant="info"
											type="submit"
											onClick={this.ModifProductSubmit.bind(this, elem.id_product)}
										>
											modifier produits
										</Button>
									</td>
									<td>
										<Button
											variant="info"
											type="submit"
											onClick={(e) => this.deleteRow(elem.id_product, e)}
										>
											supprimer produits
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.productsReducer.products,
		categories: state.categoryReducer.categories
	};
};

const mapDispatchToProps = {  deleteProduct};

export default connect(mapStateToProps, mapDispatchToProps)(ListProducts);
