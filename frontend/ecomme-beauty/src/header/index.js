import React from 'react';
import '../header/style.css';
import { connect } from 'react-redux';
import { listCategory} from '../store/action/category';
import Nav from 'react-bootstrap/Nav';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';


class Header extends React.Component {

    componentDidMount() {
        axios
        .get('http://localhost:8080/category', {
            headers: { authorization: `Bearer ${localStorage.getItem('MyToken')}` }
        })
        .then((res) => {
            // this.setState({ categories: res.data });
            console.log(res.data);
            this.props.listCategory(res.data);
        })
        .catch((error) => {
            // this.setState({ error : res.data });
            console.log(error);
        });
}
	render() {
        if (this.props.location.pathname.includes("admin") ) {
            if(localStorage.getItem("MyToken")){
                return (
                    <Nav variant="pills" defaultActiveKey="/dashboard">
                        <Nav.Item>
                        <Nav.Link as={Link} to="/admin/product">Ajouter un produit</Nav.Link>
                        <Nav.Link as={Link} to="/admin/listproduct">Vos produits</Nav.Link>
                        <Nav.Link as={Link} to="/admin/category">Ajouter vos catégories</Nav.Link>
                        <Nav.Link as={Link} to="/admin/listcategory">Vos catégories</Nav.Link>
                        </Nav.Item>    
                    </Nav>
                );
            } else {
                return (
                    <Nav variant="pills" defaultActiveKey="/admin">
                        <Nav.Item>
                            <Nav.Link as={Link} to="/admin/signup">Inscription</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/admin/signin">Me connecter</Nav.Link>
                        </Nav.Item>
                    </Nav>
                );
            }
        } else {
              return (
                <Nav variant="pills" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link as={Link} to="/home">Mon site</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/catalogue">Nos produits</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/inscription">Inscription</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/connexion">Me connecter</Nav.Link>
                    </Nav.Item>
                </Nav>
            );
        }
	}
}


const mapStateToProps = (state) => {
	return {
		categories: state.categoryReducer.categories
	};
};

const mapDispatchToProps = {listCategory};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

// export default compose(
//     withRouter,
//     connect(mapStateToProps, mapDispatchToProps)
//   )(Header);