import React from 'react';
import { connect } from 'react-redux';
import { listProducts } from '../store/action/products';
import axios from 'axios';
// import Card from 'react-bootstrap/Card';
// import ListGroup from 'react-bootstrap/ListGroup';
// import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image'
import '../admin_listproduct/style.css'


// import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/esm/Button';

class ListProducts extends React.Component {
	state = {
		products: []
	};

	returnSubmit = () => {
		this.props.history.push('/admin/dashboard');
    };
    
	ModifProductSubmit = (id_product) => {
		this.props.history.push('/admin/modifyproduct/' + id_product);
    };
    


	componentDidMount() {
		console.log(this);
		axios
			.get('http://localhost:8080/products')
			.then((res) => {
				this.setState({ products: res.data });
				this.props.listProducts(res.data);
			})
			.catch((error) => {
				// this.setState({ error : res.data });
				console.log(error);
			});
    }
    

	render() {
		return (
			<div>
				<Button variant="info" type="submit" onClick={this.returnSubmit.bind(this)}>
					Retour sur mon Dashboard
				</Button>

				<p>Vos produits</p>

                        <Table striped bordered hover size="sm">
					<thead>
						<tr>
							<th>ID Produit</th>
							<th>ID Admin</th>
							<th>Nom du produit</th>
							<th>Description produit</th>
							<th>Catégorie</th>
							<th>Prix</th>
							<th>Image</th>
							<th>Modifier le produit</th>
						</tr>
					</thead>
					<tbody>
                        {this.state.products.map((elem) =>
                        { return (

                            <tr>
                            <td>{elem.id_product}</td>
							<td>{elem.id_admin}</td>
							<td>{elem.name}</td>
							<td>{elem.description}</td>
							<td>{elem.id_category}</td>
							<td>{elem.price}</td>
							<td><Image src={elem.image} className="image-table"thumbnail /></td>
							<td><Button variant="info" type="submit" onClick={this.ModifProductSubmit.bind(this, elem.id_product)}>modifier produits</Button></td>
						</tr>
                            
                        )}
                        )} 
                        </tbody>
				</Table>
			</div>
		);
	}
}

const mapStateToProps = (state /*, ownProps*/) => {
	return {
		products: state.productsReducer.products
	};
};

const mapDispatchToProps = { listProducts };

export default connect(mapStateToProps, mapDispatchToProps)(ListProducts);
