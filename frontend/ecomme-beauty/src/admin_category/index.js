import React from 'react';
import { connect } from 'react-redux';
import { deleteCategory } from '../store/action/category';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Alert } from 'react-bootstrap';

// import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/esm/Button';

class ListCateg extends React.Component {
	state = {
		msgSuccess: ''
	};

	returnSubmit = () => {
		this.props.history.push('/admin/dashboard');
	};

	// ModifProductSubmit = (id_product) => {
	// 	this.props.history.push('/admin/modifyproduct/' + id_product);
	// };

	deleteRow(id_category, e) {
		axios
			.delete(process.env.REACT_APP_API_URL + `/category/${id_category}`, {
				headers: { authorization: `Bearer ${localStorage.getItem('MyToken')}` }
			})
			.then((res) => {
				if (res.status === 200) {
					this.props.deleteCategory(id_category);
				}
			});
	}

	render() {
		return (
			<div>
				<Table striped bordered hover size="lg">
					<thead>
						<tr>
							<th>ID Categorie</th>
							<th>Dénomination</th>
							<th>Supprimer votre catégorie</th>
						</tr>
					</thead>
					<tbody>
						{this.state.msgSuccess ? <Alert variant="success"> {this.state.msgSuccess} </Alert> : null}
						{this.props.categories.map((elem) => {
							return (
								<tr key={elem.id_category}>
									<td>{elem.id_category}</td>
									<td>{elem.denomination}</td>
									<td>
										<Button
											variant="dark"
											type="submit"
											onClick={(e) => this.deleteRow(elem.id_category, e)}
										>
											supprimer categorie
										</Button>
									</td>
									{/* <td><Button variant="info" type="submit" onClick={this.ModifProductSubmit.bind(this, elem.id_product)}>modifier produits</Button></td>
							<td><Button variant="info" type="submit" onClick={(e) => this.deleteRow(elem.id_product, e)}>supprimer produits</Button></td> */}
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
		categories: state.categoryReducer.categories
	};
};

const mapDispatchToProps = { deleteCategory };

export default connect(mapStateToProps, mapDispatchToProps)(ListCateg);
