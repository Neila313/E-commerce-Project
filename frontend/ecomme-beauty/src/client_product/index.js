import React from 'react';
import { connect } from 'react-redux';
// import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import '../client_product/style.css';

class ProductClient extends React.Component {
	render() {
		return (
			<div className="Prod">

				<div className="CardAll">

				{this.props.products.map((elem) => {
					return (
						
							<Card className="oneProd"  key={elem.name} style={{ width: '18rem' }}>
								<Card.Img variant="top" src={elem.image} className="elemPic" />
								<Card.Body>
									<Card.Title>{elem.name}</Card.Title>
									<Card.Text>{elem.description}</Card.Text>
								</Card.Body>
								<ListGroup className="list-group-flush">
									<ListGroupItem>{elem.price}</ListGroupItem>
								</ListGroup>
								<Card.Body>
									{/* <Link to={`/product/${elem.id}`}> <Button variant="primary">Détails</Button></Link> */}
									{/* <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link> */}
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

export default connect(mapStateToProps)(ProductClient);
