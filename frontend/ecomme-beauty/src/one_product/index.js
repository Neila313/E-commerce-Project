import React from 'react';
import HTTP from '../provider/http';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import { connect } from 'react-redux';
import { oneProducts } from '../store/action/products';
import { newCartProduct } from '../store/action/cartproducts';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Image from 'react-bootstrap/Image';
import './style.css';
// import { button } from '../boutton_quantity/index';

class OneProductPage extends React.Component {
	state = {
		qty: 1,
		id_product: '',
		msgSuccess: ''
	};

	IncrementItem = () => {
		this.setState({ qty: this.state.qty + 1 });
	};
	DecrementItem = () => {
		if (this.state.qty > 1) {
			this.setState({ qty: this.state.qty - 1 });
		}
	};
	componentDidMount() {
		console.log(this);
		this.loadProduct();
	}

	loadProduct() {
		const { id_product } = this.props.match.params;
		HTTP.get(`/products/${id_product}`).then((res) => {
			this.props.oneProducts(res.data[0]);
			// this.setState({productdetails: res.data[0]});
		});
	}
	handleSubmit = (id_product) => {
		// event.preventDefault();
		const cartProduct = {
			qty: this.state.qty,
			id_product: id_product
		};
		console.log(cartProduct);

		HTTP.post('/cartproduct', cartProduct)
			//recuperation du token stocké dans le localStorage comme ca y'a plus "no token"
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					console.log(res.data);
					this.setState({ msgSuccess: 'ajouté avec succès au panier' });
					this.props.newCartProduct(cartProduct);
				}
				console.log(cartProduct);
			})
			
			.catch((error) => {
				// this.setState({ error : res.data });
				console.log(error);
			});
	};



	render() {
		const details = this.props.productdetails ? (
			<div>
				<div className="filArianeProd">
					<Breadcrumb className="breadcrumb">
					<Breadcrumb.Item className="breadcrumb-item" href="/catalogue">
						Nos produits
					</Breadcrumb.Item>
					<Breadcrumb.Item active>{this.props.productdetails.name}</Breadcrumb.Item>
				</Breadcrumb>
			</div>
				<Row>
					<Col lg={6} className="containerPix">
						<Image className="pixProd" src={this.props.productdetails.image} />
						{/* <div className="containerDetails" /> */}
					</Col>
					<Row className="containerDetails" lg={1}>
						<Col>
							<Card.Body className="cardOne">
								<Card.Title className="titleOneProd">{this.props.productdetails.name}</Card.Title>
								<Card.Text className="descOneProd">{this.props.productdetails.description}</Card.Text>
								<Card.Text className="priceOneProd">{this.props.productdetails.price}€</Card.Text>
								{/* 
								<ListGroup className="list-group">
									<ListGroupItem className="priceOneProd">
										{this.props.productdetails.price}€
									</ListGroupItem>
								</ListGroup> */}
								<div className="btnOne">
								<Button className="moinsOne" variant="link" onClick={this.DecrementItem}></Button>
								<p className="qtyOne">{this.state.qty}</p>
								<Button className="plusOne" variant="link"  onClick={this.IncrementItem}></Button>
								<br />
								</div>
								<Button
								variant="light"
									className="btn1 effect01"
									onClick={() => this.handleSubmit(this.props.productdetails.id_product)}
								>
									<span>Ajouter au panier</span>
								</Button>
							</Card.Body>
						</Col>
					</Row>
				</Row>
			</div>
		) : (
			
			<div className="attente">Loading product...</div>
		);
		return (
			// <div>

			<Container fluid>
				<link
					href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap"
					rel="stylesheet"
				/>

				<Row>
					<Col className="container">{details}</Col>
				</Row>
			</Container>
			/* <div className="container">{details}</div> */
			// </div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		productdetails: state.productsReducer.productdetails
	};
};

const mapDispatchToProps = { oneProducts, newCartProduct };

export default connect(mapStateToProps, mapDispatchToProps)(OneProductPage);
