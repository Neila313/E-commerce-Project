import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { connect } from "react-redux";
import { changeProduct } from '../store/action/products';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Alert} from 'react-bootstrap';
import axios from 'axios';
import jwt from 'jsonwebtoken';



class PutProduct extends React.Component {

    state = {
        name: "",
        description: "",
        details: "",
        price:"",
        image: "",
        id_category: 0,
        msgSuccess:"",
    
    };

    returnSubmit = () => {
      
        this.props.history.push('/admin/dashboard');
      }

     
// /!\ Bien écrire les elements exactement comme dans la db
    putNameProduct = event => {
        this.setState({name:event.target.value})
    };
    putDesc = event => {
        this.setState({description:event.target.value})
    };
    putDetails = event => {
        this.setState({details:event.target.value})
    };
  
    putPrice = event => {
        this.setState({price:event.target.value})
    };
    putImage = event => {
        this.setState({image:event.target.value})
    };
    putCategory = event => {
        this.setState({id_category:event.target.value})
    };

    componentDidMount() {

        const { id_product } = this.props.match.params 
        const product = this.props.products.filter(elem => elem.id_product === parseInt(id_product))
   
        this.setState({name: product[0].name,
            description: product[0].description,
            details: product[0].details,
            price: product[0].price,
            image: product[0].image,
            id_category: product[0].id_category});
        //     // this.setState({ error : res.data });

    }
    
    handleSubmit = async event => {
        event.preventDefault();
        const { id_product } = this.props.match.params 

        let token = localStorage.getItem('MyToken')
        token = await jwt.decode(token)

        const product = {
            id_product: parseInt(id_product),
            id_admin: parseInt(token.id),
            name: this.state.name,
            description: this.state.description,
            details: this.state.details,
            price: parseInt(this.state.price),
            image: this.state.image,
            id_category: parseInt(this.state.id_category)
        };
        axios.put(process.env.REACT_APP_API_URL + '/products/' + id_product, product, {headers: {authorization: `Bearer ${localStorage.getItem('MyToken')}`}} )
        //recuperation du token stocké dans le localStorage comme ca y'a plus "no token"
        .then(res => {
            if(res.status === 200){
                console.log(res);
                console.log(res.data);
                this.setState({msgSuccess: "Produit modifié avec succès"})
                this.props.changeProduct(product)
            }
        })
        .catch(error => {
            // this.setState({ error : res.data });
            console.log(error);
          })

  }


    render() {
        return (
            <div>
                	<Jumbotron>
					<h1>Modifier nos produits</h1>
                    <Button variant="info" type="submit" onClick={ this.returnSubmit.bind(this) }>
						Retour sur mon Dashboard
					</Button>
				</Jumbotron>

                <Form onSubmit={this.handleSubmit}>

                {this.state.msgSuccess ? <Alert variant="success"> {this.state.msgSuccess} </Alert> : null}

					<Form.Group controlId="formGroupName">
						<Form.Label>Nom</Form.Label>
						<Form.Control type="name" placeholder="Enter the name of your product" value={this.state.name} onChange={this.putNameProduct} />
					</Form.Group>
					<Form.Group controlId="formGroupDescription">
						<Form.Label>Description</Form.Label>
						<Form.Control
							type="description"
                            placeholder="Enter the description of your product"
                            onChange={this.putDesc}
                            value={this.state.description}/>
					</Form.Group>
					<Form.Group controlId="formGroupDetails">
						<Form.Label>Détails du produit</Form.Label>
						<Form.Control
							type="détails"
                            placeholder="Enter the details of your product"
                            onChange={this.putDetails}
                            value={this.state.details}/>
					</Form.Group>
					<Form.Group controlId="formGroupCategory">
						<Form.Label>Catégorie</Form.Label>
						<Form.Control type="number" placeholder="Choose the category" value={this.state.id_category} onChange={this.putCategory}/>
					</Form.Group>
					<Form.Group controlId="formGroupPrice">
						<Form.Label>Prix</Form.Label>
						<Form.Control type="price" placeholder="Price" value={this.state.price} onChange={this.putPrice}/>
					</Form.Group>
					<Form.Group controlId="formGroupImage">
						<Form.Label>Image</Form.Label>
                        <Form.Control placeholder="copy your link picture" value={this.state.image}  onChange={this.putImage}/>
					</Form.Group>
					<Button variant="info" type="submit">
						Modifier mon produit
					</Button>
				</Form>
            </div>
        )
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
      products : state.productsReducer.products,
    }
  }
  
  const mapDispatchToProps = { changeProduct }
  
  export default connect(mapStateToProps, mapDispatchToProps)(PutProduct);
