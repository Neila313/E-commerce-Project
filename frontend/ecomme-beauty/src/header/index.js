import React from 'react';
import '../header/style.css';
import { connect } from 'react-redux';
import { listCategory } from '../store/action/category';
import {listProducts} from '../store/action/products'
import Nav from 'react-bootstrap/Nav';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class Header extends React.Component {
	componentDidMount() {

        axios
			.get('http://localhost:8080/products')
			.then((res) => {
				// this.setState({ products: res.data });
				this.props.listProducts(res.data);
			})
			.catch((error) => {
				// this.setState({ error : res.data });
				console.log(error);
			});

        
		axios
			.get('http://localhost:8080/category', {
				headers: { authorization: `Bearer ${localStorage.getItem('MyToken')}` }
			})
			.then((res) => {
				// this.setState({ categories: res.data });
				// console.log(res.data);
				this.props.listCategory(res.data);
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
							<Nav.Link className="" as={Link} to="/home">
                                <img alt=""/>
                            </Nav.Link>

						</Nav.Item>
						<div className="ligne" />
					</div>

					<div className="ProductMaster">
						<Nav.Item className="ProductHead">
							<Nav.Link className="NosProduits" as={Link} to="/catalogue">
								Nos produits
							</Nav.Link>
						</Nav.Item>
						<Nav.Item className="ProductHead">
							<Nav.Link className="NosProduits">Nos routines</Nav.Link>
						</Nav.Item>
						<Nav.Item className="ProductHead">
							<Nav.Link className="NosProduits">Le blog </Nav.Link>
						</Nav.Item>
					</div>

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
				</Nav>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
        products: state.productsReducer.products,
		categories: state.categoryReducer.categories
	};
};

const mapDispatchToProps = { listCategory, listProducts };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

// export default compose(
//     withRouter,
//     connect(mapStateToProps, mapDispatchToProps)
//   )(Header);
