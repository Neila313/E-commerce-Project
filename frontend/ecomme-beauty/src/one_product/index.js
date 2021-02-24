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
import Image from 'react-bootstrap/Image';
import './style.css';
// import { button } from '../boutton_quantity/index';

class OneProductPage extends React.Component {
	state = {
		quantity: 1,
		id_product: '',
		msgSuccess: ''
	};

	//   increment() {
	//     this.setState(prevState => {quantity: ++prevState.quantity});
	//   }

	//   decrement() {
	//     this.setState(prevState => {quantity: prevState.quantity > 0? --prevState.quantity : 0});
	//   }

	componentDidMount() {
		console.log(this);
		const { id_product } = this.props.match.params;
		HTTP.get(`/products/${id_product}`).then((res) => {
			this.props.oneProducts(res.data[0]);
			// this.setState({productdetails: res.data[0]});
		});
	}

	handleSubmit = (id_product) => {
		// event.preventDefault();
		const cartProduct = {
			quantity: this.state.quantity,
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
			})
			.catch((error) => {
				// this.setState({ error : res.data });
				console.log(error);
			});
	};

	render() {
		const details = this.props.productdetails ? (
			<div>
				<Row>
					<Col md={6} className="containerPix">
						<Image className="pixProd" src={this.props.productdetails.image} />
						{/* <div className="containerDetails" /> */}
					</Col>
					<Row className="containerDetails" lg={1}>
						<Col>
							<Card.Body>
								<Card.Title className="titleOneProd">{this.props.productdetails.name}</Card.Title>
								<Card.Text className="descOneProd">{this.props.productdetails.description}</Card.Text>
                                <Card.Text className="priceOneProd">{this.props.productdetails.price}€</Card.Text>
{/* 
								<ListGroup className="list-group">
									<ListGroupItem className="priceOneProd">
										{this.props.productdetails.price}€
									</ListGroupItem>
								</ListGroup> */}

								<Button
									className="btn2 effect02"
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
			// <Card style={{ width: '18rem' }}>
			// 	<Card.Img variant="top" src={this.props.productdetails.image} />
			// 	<Card.Body>
			// 		<Card.Title>{this.props.productdetails.name}</Card.Title>
			// 		<Card.Text>{this.props.productdetails.price}</Card.Text>
			// 		<Card.Text>{this.props.productdetails.description}</Card.Text>
			// 		<Button variant="primary" onClick={() => this.handleSubmit(this.props.productdetails.id_product)}>
			// 			Ajouter au panier
			// 		</Button>
			// 	</Card.Body>
			// </Card>
			<div className="attente">Loading product...</div>
		);
		return (
			// <div>
            
			<Container fluid>
                						<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap" rel="stylesheet"></link>

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
