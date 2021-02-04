import React from 'react';
import { connect } from 'react-redux';
// import { listCategory} from '../store/action/category';
// import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import {Alert} from 'react-bootstrap';


// import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/esm/Button';

class ListCateg extends React.Component {
	state = {
		msgSuccess: ""
	};

	returnSubmit = () => {
		this.props.history.push('/admin/dashboard');
    };
    
	// ModifProductSubmit = (id_product) => {
	// 	this.props.history.push('/admin/modifyproduct/' + id_product);
    // };

	// deleteRow(id_product, e){
	// 	axios.delete(`http://localhost:8080/products/${id_product}`, {headers: {authorization: `Bearer ${localStorage.getItem('MyToken')}`}})
	// 	  .then(res => {
	// 		console.log(res);
	// 		console.log(res.data);
	  
	// 		const products = this.state.products.filter(item => item.id_product !== id_product);
	// 		this.setState({ products });
	// 		this.setState({msgSuccess: "Produit supprimé avec succès"})

	// 	  })
	  
	//   }

	render() {	         
    
           
		return (
			<div>
				<Button variant="info" type="submit" onClick={this.returnSubmit.bind(this)}>
					Retour sur mon Dashboard
				</Button>

				<p>Vos catégorie</p>
                        <Table striped bordered hover size="sm">
					<thead>
						<tr>
							<th>ID Categorie</th>
							<th>Dénomination</th>
						</tr>
					</thead>
					<tbody>
					{this.state.msgSuccess ? <Alert variant="success"> {this.state.msgSuccess} </Alert> : null}
                        {this.props.categories.map((elem) =>
                        { return (
                            <tr key={elem.id_category}>
                            <td>{elem.id_category}</td>
                            <td>{elem.denomination}</td>
							{/* <td><Button variant="info" type="submit" onClick={this.ModifProductSubmit.bind(this, elem.id_product)}>modifier produits</Button></td>
							<td><Button variant="info" type="submit" onClick={(e) => this.deleteRow(elem.id_product, e)}>supprimer produits</Button></td> */}
						</tr>
                        )}
                        )} 
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

export default connect(mapStateToProps)(ListCateg);