import React from 'react';
import '../header/style.css';
import { connect } from 'react-redux';
import { listCategory } from '../store/action/category';
import { listProducts } from '../store/action/products';
import { listCartProducts } from '../store/action/cartproducts';
import Nav from 'react-bootstrap/Nav';
import { Link, withRouter } from 'react-router-dom';
import HTTP from '../provider/http';

class Header extends React.Component {
	constructor() {
		super();
		this.state = {
			productdetails: {},
			
		};
	}

	componentDidMount() {
		HTTP
			.get('/category')
			.then((res) => {
				// this.setState({ categories: res.data });
				// console.log(res.data);
				this.props.listCategory(res.data);
			})
			.catch((error) => {
				// this.setState({ error : res.data });
				console.log(error);
			});

		HTTP
			.get('/products')
			.then((res) => {
				// this.setState({ products: res.data });
				this.props.listProducts(res.data);
			})
			.catch((error) => {
				// this.setState({ error : res.data });
				console.log(error);
			});
	}
	render() {
		if (this.props.location.pathname.includes('admin')) {
			if (localStorage.getItem('MyToken')) {
				return (
					<Nav variant="pills" defaultActiveKey="/dashboard">
						<Nav.Item>
							<Nav.Link as={Link} to="/admin/product">
								Ajouter un produit
							</Nav.Link>
							<Nav.Link as={Link} to="/admin/listproduct">
								Vos produits
							</Nav.Link>
							<Nav.Link as={Link} to="/admin/category">
								Ajouter vos catégories
							</Nav.Link>
							<Nav.Link as={Link} to="/admin/listcategory">
								Vos catégories
							</Nav.Link>
						</Nav.Item>
					</Nav>
				);
			} else {
				return (
					<Nav variant="pills" defaultActiveKey="/admin">
						<Nav.Item>
							<Nav.Link as={Link} to="/admin/signup">
								Inscription
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link as={Link} to="/admin/signin">
								Me connecter
							</Nav.Link>
						</Nav.Item>
					</Nav>
				);
			}
		} else {
			return (
				<Nav variant="pills" defaultActiveKey="/home" className="headCustom">
					<link
						href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
						rel="stylesheet"
					/>
					<div className="MasterHead">
						<div className="ligne" />
						<Nav.Item className="logoHead">
							<Nav.Link className="homeImg" as={Link} to="/home" />
						</Nav.Item>
						<div className="ligne" />
					</div>
					<div className="ProductMaster">
						<Nav.Item className="ProductHead">
							<Nav.Link className="nav-link" as={Link} to="/catalogue">
								Nos produits
							</Nav.Link>
						</Nav.Item>
						<Nav.Item className="ProductHead">
							<Nav.Link className="nav-link">Nos routines</Nav.Link>
						</Nav.Item>
						<Nav.Item className="ProductHead">
							<div className="cartLink">
							<Nav.Link as={Link} to="/panier" className="cartP"/>
							{this.props.cartproducts.length > 0 && <div className="cartNumber">{this.props.cartproducts.length} </div> }
							</div>
						<Nav.Link as={Link} to="/wishlist" className="favorisP" />
						</Nav.Item>
					</div>

					{localStorage.getItem('tokenUser') ? (
						<div className="headCustomConnect">
							<Nav.Item>
								<Nav.Link as={Link} className="Seconnecter"  to="/mon-compte">
									Mon compte
								</Nav.Link>
							</Nav.Item>{' '}
						</div>
					) : (
						<div className="headCustomConnect">
							<Nav.Item>
								<Nav.Link className="Seconnecter" as={Link} to="/connexion">
									Se connecter
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link className="Sinscrire" as={Link} to="/inscription">
									S'inscrire
								</Nav.Link>
							</Nav.Item>
						</div>
					)}
				</Nav>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.productsReducer.products,
		categories: state.categoryReducer.categories,
		cartproducts: state.cartproductsReducer.cartproducts

	};
};

const mapDispatchToProps = { listCategory, listProducts, listCartProducts };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

// export default compose(
//     withRouter,
//     connect(mapStateToProps, mapDispatchToProps)
//   )(Header);
