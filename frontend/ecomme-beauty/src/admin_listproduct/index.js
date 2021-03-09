import React from 'react';
import { connect } from 'react-redux';
import { deleteProduct } from '../store/action/products';
import axios from 'axios';
// import Card from 'react-bootstrap/Card';
// import ListGroup from 'react-bootstrap/ListGroup';
// import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import '../admin_listproduct/style.css';
import { Alert } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './style.css';

// import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/esm/Button';

class ListProducts extends React.Component {
	state = {
		msgSuccess: ''
	};

	ModifProductSubmit = (id_product) => {
		this.props.history.push('/admin/dashboard/modifyproduct/' + id_product);
	};

	deleteRow(id_product) {
		axios
			.delete(`${process.env.REACT_APP_API_URL}/products/${id_product}`, {
				headers: { authorization: `Bearer ${localStorage.getItem('MyToken')}` }
			})
			.then((res) => {
				if (res.status === 200) {
					this.props.deleteProduct(id_product);
					this.setState({ msgSuccess: 'Produit supprimé avec succès' });
				}
			});
	}

	render() {
		return (
			<div className="listProdAdmin">
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
							<th>Modifier</th>
							<th>Supprimer</th>
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
										{
											this.props.categories.find((ele) => ele.id_category === elem.id_category)
												.denomination
										}
									</td>
									<td>{elem.price}</td>
									<td>
										<Image src={elem.image} className="image-table" thumbnail />
									</td>
									<td >
										<Button variant="dark"onClick={this.ModifProductSubmit.bind(this, elem.id_product)}>
											Modifier
											</Button>
									</td>
									<td >
										<Button variant="dark" onClick={this.deleteRow.bind(this, elem.id_product)}>
											Supprimer
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

const mapDispatchToProps = { deleteProduct };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListProducts));
