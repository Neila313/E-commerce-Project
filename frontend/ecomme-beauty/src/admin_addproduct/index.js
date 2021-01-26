import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './style.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';



class ProductAdmin extends React.Component {

    state = {
        name: "",
        description: "",
        price:"",
        image: "",
        id_category: "",
        msgSuccess:"",
    
    };

     
// /!\ Bien écrire les elements exactement comme dans la db
    inputNameProduct = event => {
        this.setState({name:event.target.value})
    };
    inputDesc = event => {
        this.setState({description:event.target.value})
    };
  
    inputPrice = event => {
        this.setState({price:event.target.value})
    };
    inputImage = event => {
        this.setState({image:event.target.value})
    };
    inputCategory = event => {
        this.setState({id_category:event.target.value})
    };
    
    handleSubmit = event => {
        event.preventDefault();
    
        const product = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            image: this.state.image,
            id_category: this.state.id_category
        };
        
        axios.post('http://localhost:8080/products', product, {headers: {authorization: `Bearer ${localStorage.getItem('MyToken')}`}} )
        //recuperation du token stocké dans le localStorage comme ca y'a plus "no token"
        .then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({msgSuccess: "Bien ajouté"})
            // this.props.newProduct(res.data[0])
        })

  }


    render() {
        return (
            <div>
                	<Jumbotron>
					<h1>Gérer nos produits</h1>
				</Jumbotron>

                <Form onSubmit={this.handleSubmit}>

                <p>{this.state.msgSuccess}</p>


					<Form.Group controlId="formGroupName">
						<Form.Label>Nom</Form.Label>
						<Form.Control type="name" placeholder="Enter the name of your product" onChange={this.inputNameProduct} />
					</Form.Group>
					<Form.Group controlId="formGroupDescription">
						<Form.Label>Description</Form.Label>
						<Form.Control
							type="description"
                            placeholder="Enter the description of your product"
                            onChange={this.inputDesc}
						/>
					</Form.Group>
					<Form.Group controlId="formGroupCategory">
						<Form.Label>Catégorie</Form.Label>
						<Form.Control type="category" placeholder="Choose the category" onChange={this.inputCategory}/>
					</Form.Group>
					<Form.Group controlId="formGroupPrice">
						<Form.Label>Prix</Form.Label>
						<Form.Control type="price" placeholder="Price" onChange={this.inputPrice}/>
					</Form.Group>
					<Form.Group controlId="formGroupImage">
						<Form.Label>Image</Form.Label>
						<Form.File id="exampleFormControlFile1" label="Example file input" onChange={this.inputImage} />
					</Form.Group>
					<Button variant="info" type="submit">
						Ajouter mon produit
					</Button>
				</Form>

               

            </div>
        )
    }
}

export default ProductAdmin; 