import React from 'react';
import { connect } from 'react-redux';
// import { newCartProduct } from '../store/action/cartproducts';
import Button from 'react-bootstrap/esm/Button';
import { Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import '../client_product/style.css';
// import axios from 'axios';


class ProductClient extends React.Component {



	render() {
		return (
			<div className="Prod">

				<div className="CardAll">

				{this.props.products.map((elem) => {
					return (
						
							<Card className="oneProd"  key={elem.name} style={{ width: '23rem', height: '47rem' }}>
						<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap" rel="stylesheet"></link>

								<Card.Img variant="top" src={elem.image} style={{ width: '23rem', height: '30rem' }} className="elemPic" />
								<Card.Body>
									<Card.Title className="titleProd">{elem.name}</Card.Title>
									<Card.Text className="descProd">{elem.description}</Card.Text>
								</Card.Body>
								<ListGroup className="list-group-flush">
									<ListGroupItem className="priceProd">{elem.price}€</ListGroupItem>
								</ListGroup>
								<Card.Body>
								<Link to={`/product/${elem.id_product}`}>
									 <Button className="btn effect01" ><span>En savoir +</span></Button></Link>
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
		products: state.productsReducer.products
	};
};

// const mapDispatchToProps = { newCartProduct };


export default connect(mapStateToProps)(ProductClient);
