import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { oneCartProducts } from '../store/action/cartproducts';
// import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
// import Image from 'react-bootstrap/Image';

class CartProduct extends React.Component {
	state = {
		cartProduct: []
	};

	componentDidMount() {
		console.log(this);
		axios
			.get(`http://localhost:8080/cartproduct/`, {
				headers: { authorization: `Bearer ${localStorage.getItem('tokenUser')}` }
			})
			.then((res) => {
				console.log(res.data);
				this.setState({ cartProduct: res.data });
				this.props.oneCartProducts(res.data[0]);
				// this.setState({productdetails: res.data[0]});
			});
	}

	render() {
        let total = 0 

		return (
			<div>
				<div>
					<p>Mon panier</p>

					<Table striped bordered hover size="sm">
						<thead>
							<tr>
								<th>Produit</th>
								<th>Prix</th>
								<th>Quantité</th>
							</tr>
						</thead>
						<tbody>
							{this.state.cartProduct &&
								this.state.cartProduct.map((item) => {
									let product = this.props.products.filter(
                                        (elem) => elem.id_product == item.id_product
                                    )[0];
                                    total += product.price * item.quantity
									return (
										<tr key={item.id_cart}>
											<td>{product.name}</td>
											<td>{product.price}</td>
											<td>{item.quantity}</td>
										</tr>
									);
								})}
						</tbody>
					</Table>
                    {total}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.productsReducer.products,
		onecartprod: state.cartproductsReducer.onecartprod
	};
};

const mapDispatchToProps = { oneCartProducts };

export default connect(mapStateToProps, mapDispatchToProps)(CartProduct);
