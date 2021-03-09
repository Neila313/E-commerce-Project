import React from 'react';
import HTTP from '../provider/http';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { listCartProducts, deleteCartProduct } from '../store/action/cartproducts';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
// import Nav from 'react-bootstrap/Nav';

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './style.css';

// import Image from 'react-bootstrap/Image';

class CartProduct extends React.Component {
	state = {
		cartProduct: [],
		commande: [],
		qty: 1,
		msgSuccess: '',
		total:0,
	};

	componentDidMount() {
		console.log(this);
		this.loadCart();
	}

	loadCart() {
		HTTP.get('/cartproduct').then((res) => {
			this.setState({
				cartProduct: res.data.map(e =>{
					return {
						id_product: e.id_product,
						name: e.name,
						qty: e.qty,
						unit_price: parseFloat(e.unit_price),
						total: parseFloat(e.total)
					};
				})
			}, this.calculTotal);
			this.props.listCartProducts(res.data)
			// this.props.listCartProducts(res.data[0]);
			// this.setState({productdetails: res.data[0]});
		});
	}

	calculTotal() {
		let cartProduct = this.state.cartProduct;
		let total = 0
		for (const e of cartProduct) {
			e.total = e.qty * e.unit_price;
			total += e.total;
		}
		this.setState({
			cartProduct,
			total
		})
		this.props.listCartProducts(total)

	}
	

	

	deleteCart(id_product) {
		HTTP.delete(`/cartproduct/${id_product}`).then((res) => {
			if (res.status === 200) {
				this.setState({ cartProduct: this.state.cartProduct.filter((p) => p.id_product !== id_product) }, this.calculTotal);
				// this.setState({ msgSuccess: 'Produit supprimé avec succès' });
				this.props.deleteCartProduct(id_product)
				console.log(this.state);
			}
			// console.log(res);
			// console.log(res.data);
			// const products = this.state.products.filter((item) => item.id_product !== id_product);
			// this.setState({ products });
		});
	}

	increment(id_product) {
		// HTTP.post(/cartproduct, qty : 1)
		const dataCart = {
			qty: this.state.qty,
			id_product: id_product
		};

		HTTP.post('/cartproduct', dataCart)
			//recuperation du token stocké dans le localStorage comme ca y'a plus "no token"
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					console.log(res.data);
					let index = this.state.cartProduct.findIndex((e) => e.id_product === id_product);
					let cartProduct = this.state.cartProduct;
					cartProduct[index].qty++;
					this.setState({ cartProduct: this.state.cartProduct }, this.calculTotal);
					// this.props.newCartProduct(cartProduct);
				}
			})
			.catch((error) => {
				// this.setState({ error : res.data });
				console.log(error);
			});
	}

	decrement(id_product) {
		console.log(this.state);
		HTTP.delete(`/cartproduct/${id_product}`, { decrement: true }).then((res) => {
			console.log(this.state);
			if (res.status === 200) {
				const index = this.state.cartProduct.findIndex((p) => p.id_product === id_product);
				let cartProduct = this.state.cartProduct;
				cartProduct[index].qty--;
				this.setState({ cartProduct: cartProduct.filter((e) => e.qty > 0) }, this.calculTotal);
				if (cartProduct[index].qty <= 0){
					this.props.deleteCartProduct(id_product)
				}
				// this.setState({ msgSuccess: 'Produit supprimé avec succès' });
				console.log(this.state);
			}
		});
	}

	ValidationCommandeSubmit = () => {
		HTTP.post('/cart')
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					console.log(res.data);
					this.setState({ commande: res.data });						
				}
				this.props.history.push('/commande');
			})
			.catch((error) => {
				// this.setState({ error : res.data });
				console.log(error);
			});
		
	};

	render() {
		console.log(this.state);
		if (localStorage.getItem('tokenUser')) {
			return (
				<div>
					<Breadcrumb className="breadcrumb">
						<Breadcrumb.Item className="breadcrumb-item" href="/home">
							Accueil
						</Breadcrumb.Item>
						<Breadcrumb.Item active>Panier</Breadcrumb.Item>
					</Breadcrumb>

					<div className="panier">
						<Table striped bordered hover size="sm">
							<thead>
								<tr>
									<th>Produit</th>
									<th>Prix</th>
									<th>Quantité</th>
									<th>Total</th>
								</tr>
							</thead>
							<tbody>
								{this.state.cartProduct.length > 0 &&
									this.state.cartProduct.map((item) => {
										return (
											<tr key={item.id_product}>
												<td>{item.name}</td>
												<td>{item.unit_price}€</td>
												<td className="table-card">
													<Button
														className="moins"
														onClick={() => this.decrement(item.id_product)}
													/>
													{item.qty}
													<Button
														onClick={() => this.increment(item.id_product)}
														className="plus"
													/>
												</td>
												<td>{item.total}€</td>
												<td className="containersuPanier">
													<Button
														className="suPanier"
														onClick={() => this.deleteCart(item.id_product)}
													/>
												</td>
											</tr>
										);
									})}
							</tbody>
						</Table>
					</div>
					<div className="totalContainer">
						<p className="totalPanier">total panier</p>
						<div className="defTotal">
							<p className="prixtotal">total</p>
							<p className="price">{this.state.total}€</p>
						</div>
						<Button className="btn1 effect01" onClick={this.ValidationCommandeSubmit}>
							<span>Valider mon panier</span>
						</Button>
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
						<Breadcrumb.Item active>Panier</Breadcrumb.Item>
					</Breadcrumb>
					<p className="paniervide">Votre panier est actuellement vide</p>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.productsReducer.products,
		cartproducts: state.cartproductsReducer.cartproducts
	};
};

const mapDispatchToProps = { listCartProducts, deleteCartProduct };

// export default connect(mapStateToProps, mapDispatchToProps)(CartProduct);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartProduct));
