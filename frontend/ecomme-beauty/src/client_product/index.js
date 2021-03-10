import React from 'react';
import { connect } from 'react-redux';
import HTTP from '../provider/http';
// import { newCartProduct } from '../store/action/cartproducts';
import Button from 'react-bootstrap/esm/Button';
import { newFavorisProduct, deleteFavorisProduct } from '../store/action/favoris';
import { Link } from 'react-router-dom';
import FilterCateg from '../Filter';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import '../client_product/style.css';
// import axios from 'axios';

class ProductClient extends React.Component {
	state = {
		selectedCategory: 0,
		favoris: []
	};
	

	toggleFavorite = (id_product) => {
		// event.preventDefault();
		HTTP.post('/favoris', {id_product})
			//recuperation du token stocké dans le localStorage comme ca y'a plus "no token"
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					console.log(res.data);
					this.setState({ msgSuccess: 'ajouté avec succès au favoris' });
					if (res.data.isFavoris){
						this.props.newFavorisProduct(this.props.products.find(ele => ele.id_product === id_product));
					} else {
						this.props.deleteFavorisProduct(id_product)
					}
				}
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
<div>
			<div className="filArianeProd">
					<Breadcrumb className="breadcrumb">
					<Breadcrumb.Item className="breadcrumb-item" href="/home">
						Accueil
					</Breadcrumb.Item>
					<Breadcrumb.Item active>Nos produits</Breadcrumb.Item>
				</Breadcrumb>
			</div>

			<div className="Prod">
			<FilterCateg handleSelect={(val) => this.setState({selectedCategory : parseInt(val)})} />
			
				<div className="CardAll">
					{this.props.products.filter(elem => {
						if (this.state.selectedCategory === 0){
							return true;
						}
						return elem.id_category === this.state.selectedCategory;
					
					}).map((elem) => {
						return (
							<Card className="oneProd" key={elem.name} style={{ width : '18rem'}}>
								<link
									href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap"
									rel="stylesheet"
								/>

								<Card.Img
									variant="top"
									src={elem.image}
									// style={{ width: 'auto', height: '18rem	' }}
									className="card-img"
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
										<Button className="btn1 effect01" variant="light">
											<span>En savoir +</span>
										</Button>
									</Link>
								</Card.Body>
							</Card>
						);
					})}
				</div>
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
