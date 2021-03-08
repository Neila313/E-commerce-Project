import React from 'react';
import { connect } from 'react-redux';
import HTTP from '../provider/http';
// import { newCartProduct } from '../store/action/cartproducts';
import Button from 'react-bootstrap/esm/Button';
import { newFavorisProduct, deleteFavorisProduct } from '../store/action/favoris';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import FilterCateg from '../Filter';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import '../client_product/style.css';
// import axios from 'axios';

class ProductClient extends React.Component {
	state = {
		selectedCategory: 0,
		favoris: []
	};
	componentDidMount() {
		this.loadFavorite();
	}
	loadFavorite() {
		HTTP.get('/favoris').then((res) => {
			this.setState({favoris: res.data});
		});
	}

	toggleFavorite = (id_product) => {
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
					if (res.data.isFavoris){
						this.props.newFavorisProduct(favorisProduct);
					} else {
						this.props.deleteFavorisProduct(favorisProduct.id_product)
					}
				}
				console.log(favorisProduct);
			})
			.catch((error) => {
				// this.setState({ error : res.data });
				console.log(error);
			});
	};

	render() {
		const count = this.props.products.length
		console.log(count);
		return (
			<div className="Prod">
				{this.state.msgSuccess ? <Alert variant="success"> {this.state.msgSuccess} </Alert> : null}
			<FilterCateg handleSelect={(val) => this.setState({selectedCategory : parseInt(val)})} />
			
				<div className="CardAll">
					{this.props.products.filter(elem => {
						if (this.state.selectedCategory === 0){
							return true;
						}
						return elem.id_category === this.state.selectedCategory;
					
					}).map((elem) => {
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
								{ (this.props.favoris.includes(elem.id_product)) ? <Button
									variant="outline-light"
									className="btn-icone-fav"
									onClick={() => this.toggleFavorite(elem.id_product)}
								/> : <Button
								variant="outline-light"
								className="btn-icone"
								onClick={() => this.toggleFavorite(elem.id_product)}
							/>}
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
		productdetails: state.productsReducer.productdetails,
		favoris : state.favorisReducer.favorisproducts.map(p => p.id_product)
	};
};

const mapDispatchToProps = { newFavorisProduct, deleteFavorisProduct };

export default connect(mapStateToProps, mapDispatchToProps)(ProductClient);
