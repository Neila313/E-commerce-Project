import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
// import { connect } from "react-redux";
// import { newProduct } from '../store/action/products';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Alert} from 'react-bootstrap';
import axios from 'axios';



class PutProduct extends React.Component {

    state = {
        name: "",
        description: "",
        price:"",
        image: "",
        id_category: "",
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

       axios.get('http://localhost:8080/products/' + id_product) 
       .then((res) => {
        this.setState({name: res.data[0].name,
            description: res.data[0].description,
            price: res.data[0].price,
            image: res.data[0].image,
            id_category: res.data[0].id_category});
       })
       .catch(error => {
        // this.setState({ error : res.data });
        console.log(error);
      })
    }
    
    handleSubmit = async event => {
        event.preventDefault();

        const product = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            image: this.state.image,
            id_category: this.state.id_category
        };

        const { id_product } = this.props.match.params 

        axios.put('http://localhost:8080/products/' + id_product, product, {headers: {authorization: `Bearer ${localStorage.getItem('MyToken')}`}} )
        //recuperation du token stocké dans le localStorage comme ca y'a plus "no token"
        .then(res => {
            if(res.status === 200){
                console.log(res);
                console.log(res.data);
                this.setState({msgSuccess: "Produit modifié avec succès"})
                this.props.newProduct(res.data[0])

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
						<Form.Control type="name" placeholder="Enter the name of your product" onChange={this.putNameProduct} />
					</Form.Group>
					<Form.Group controlId="formGroupDescription">
						<Form.Label>Description</Form.Label>
						<Form.Control
							type="description"
                            placeholder="Enter the description of your product"
                            onChange={this.putDesc}
						/>
					</Form.Group>
					<Form.Group controlId="formGroupCategory">
						<Form.Label>Catégorie</Form.Label>
						<Form.Control type="category" placeholder="Choose the category" onChange={this.putCategory}/>
					</Form.Group>
					<Form.Group controlId="formGroupPrice">
						<Form.Label>Prix</Form.Label>
						<Form.Control type="price" placeholder="Price" onChange={this.putPrice}/>
					</Form.Group>
					<Form.Group controlId="formGroupImage">
						<Form.Label>Image</Form.Label>
                        <Form.Control placeholder="copy your link picture" onChange={this.putImage}/>
					</Form.Group>
					<Button variant="info" type="submit">
						Ajouter mon produit
					</Button>
				</Form>

               

            </div>
        )
    }
}

// const mapStateToProps = (state /*, ownProps*/) => {
//     return {
//       product : state.productsReducer.payload,
//     }
//   }
  
//   const mapDispatchToProps = { newProduct }
  
  export default PutProduct ;
