import React from 'react';
import HTTP from '../provider/http';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { connect } from 'react-redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import { deleteFavorisProduct } from '../store/action/favoris';

class FavorisClient extends React.Component {


    deleteFavoris(id_product) {
		HTTP.delete(`/favoris/${id_product}`).then((res) => {
			if (res.status === 200) {
				// this.setState({ favorisProduct: this.state.favorisProduct.filter((p) => p.id_product !== id_product) });
				this.props.deleteFavorisProduct(id_product)
				// this.setState({ msgSuccess: 'Produit supprimé avec succès' });
				console.log(this.state);
			}
			// console.log(res);
			// console.log(res.data);
			// const products = this.state.products.filter((item) => item.id_product !== id_product);
			// this.setState({ products });
		});
	}

	render() {
		if (localStorage.getItem('tokenUser')) {
			return (
				<div>
                     <h1>Mes favoris</h1>

					<div className="CardAll">
						{this.props.favorisproducts.map((elem) => {
							return (
								<Card className="oneProd" key={elem.id_product} style={{ width: '23rem', height: '47rem' }}>
									<link
										href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap"
										rel="stylesheet"
									/>
									<Card.Img
										variant="top"
										src={elem.image}
										className="card-img"
									/>
									<Button
										variant="outline-light"
										className="btn-icone"
										onClick={() => this.deleteFavoris(elem.id_product)}
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
											<Button className="btn effect01">
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
		} else {
			return (
				<div className="ContainerPaniervide">
					<Breadcrumb className="breadcrumb">
						<Breadcrumb.Item className="breadcrumb-item" href="/home">
							Accueil
						</Breadcrumb.Item>
						<Breadcrumb.Item active>Favoris</Breadcrumb.Item>
					</Breadcrumb>
					<p className="paniervide">Commencez à remplir votre liste des favoris !</p>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.productsReducer.products,
		favorisproducts: state.favorisReducer.favorisproducts
	};
};

const mapDispatchToProps = {  deleteFavorisProduct };

export default connect(mapStateToProps, mapDispatchToProps)(FavorisClient);
