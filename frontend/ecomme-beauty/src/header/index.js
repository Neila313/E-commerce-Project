import React from 'react';
import '../header/style.css';
import Nav from 'react-bootstrap/Nav';
import { Link, withRouter } from 'react-router-dom'

class Header extends React.Component {
	render() {
        if (this.props.location.pathname.includes("admin") ) {
            if(localStorage.getItem("MyToken")){

                return (
                    <Nav variant="pills" defaultActiveKey="/dashboard">
                        <Nav.Item>
                        <Nav.Link as={Link} to="/admin/product">Ajouter un produit</Nav.Link>
                        <Nav.Link as={Link} to="/admin/listproduct">Vos produits</Nav.Link>
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

export default withRouter(Header);
