import React from 'react';
import { connect } from 'react-redux';
import HTTP from '../provider/http';
// import { newCartProduct } from '../store/action/cartproducts';
import Button from 'react-bootstrap/esm/Button';
import { newFavorisProduct } from '../store/action/favoris';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
// import FilterCateg from '../Filter';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import '../client_product/style.css';
// import axios from 'axios';

class ProductClient extends React.Component {
	state = {
		id_product: '',
		msgSuccess: '',
		filteredProduct: []
	};
	// componentDidMount() {
	// 	console.log(this);
	// 	this.loadProduct();
	// }
	// loadProduct() {
	// 	const { id_product } = this.props.match.params;
	// 	HTTP.get(`/products/${id_product}`).then((res) => {
	// 		this.state.id_product(res.data[0]);
	// 		// this.setState({productdetails: res.data[0]});
	// 	});
	// }
	// filterProduct = async (e) => {
	// 	console.log(e.target.value);
	// 	if(e.target.value) {
	// 		if(e.target.value === 'Categorie') {
	// 			this.setState({filteredProduct : []})
	// 			return
	// 		}
	// 		console.log(e);
	// 		try {
	// 			let
	// 		}
	// 	}
	// }

	handleSubmit = (id_product) => {
		// event.preventDefault();
		const favorisProduct = {
			id_product: id_product
		};
		console.log(favorisProduct);

		HTTP.post('/favoris', favorisProduct)
			//recuperation du token stocké dans le localStorage comme ca y'a plus "no token"
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					console.log(res.data);
					this.setState({ msgSuccess: 'ajouté avec succès au favoris' });
					this.props.newFavorisProduct(favorisProduct);
				}
				console.log(favorisProduct);
			})
			.catch((error) => {
				// this.setState({ error : res.data });
				console.log(error);
			});
	};

	render() {
		return (
			<div className="Prod">
				{this.state.msgSuccess ? <Alert variant="success"> {this.state.msgSuccess} </Alert> : null}

				<div className="CardAll">
					{this.props.products.map((elem) => {
						return (
							<Card className="oneProd" key={elem.name} style={{ width: '23rem', height: '47rem' }}>
								<link
									href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap"
									rel="stylesheet"
								/>

								<Card.Img
									variant="top"
									src={elem.image}
									style={{ width: '23rem', height: '30rem' }}
									className="elemPic"
								/>
								<Button
									variant="outline-light"
									className="btn-icone"
									onClick={() => this.handleSubmit(elem.id_product)}
								/>
								<Card.Body>
									<Card.Title className="titleProd">{elem.name}</Card.Title>
									<Card.Text className="descProd">{elem.description}</Card.Text>
								</Card.Body>
								<ListGroup className="list-group-flush">
									<ListGroupItem className="priceProd">{elem.price}€</ListGroupItem>
								</ListGroup>
								<Card.Body>
									<Link to={`/product/${elem.id_product}`}>
										<Button className="btn effect01" variant="light">
											<span>En savoir +</span>
										</Button>
									</Link>
								</Card.Body>
							</Card>
						);
					})}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.productsReducer.products,
		productdetails: state.productsReducer.productdetails
	};
};

const mapDispatchToProps = { newFavorisProduct };

export default connect(mapStateToProps, mapDispatchToProps)(ProductClient);
