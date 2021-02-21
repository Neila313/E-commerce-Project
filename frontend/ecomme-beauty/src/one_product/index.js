import React from 'react';
import HTTP from '../provider/http';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import { connect } from 'react-redux';
import {oneProducts} from '../store/action/products'
import { newCartProduct } from '../store/action/cartproducts';
// import { button } from '../boutton_quantity/index';




class OneProductPage extends React.Component {

    state = {
		quantity: 1,
		id_product: '',
        msgSuccess: '',
    };
    

//   increment() {
//     this.setState(prevState => {quantity: ++prevState.quantity});
//   }
  
//   decrement() {
//     this.setState(prevState => {quantity: prevState.quantity > 0? --prevState.quantity : 0});
//   }

    componentDidMount() {
        console.log(this)
        const { id_product } = this.props.match.params 
    HTTP.get(`/products/${id_product}`)
    .then(res => {
        this.props.oneProducts(res.data[0])
      // this.setState({productdetails: res.data[0]});
    })
  
    }

	handleSubmit = (id_product) => {
		// event.preventDefault();
		const cartProduct = {
			quantity: this.state.quantity,
			id_product: id_product
		};
		console.log(cartProduct);

		HTTP
			.post('/cartproduct', cartProduct)
			//recuperation du token stocké dans le localStorage comme ca y'a plus "no token"
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					console.log(res.data);
					this.setState({ msgSuccess: 'ajouté avec succès au panier' });
					this.props.newCartProduct(cartProduct);
				}
			})
			.catch((error) => {
				// this.setState({ error : res.data });
				console.log(error);
			});
	};


  render() {
    const details = this.props.productdetails ? (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={this.props.productdetails.image} />
            <Card.Body>
                <Card.Title>{this.props.productdetails.name}</Card.Title>
                <Card.Text>{this.props.productdetails.price}</Card.Text> 
                <Card.Text>{this.props.productdetails.description}</Card.Text>
                <Button variant="primary" onClick={()=>this.handleSubmit(this.props.productdetails.id_product)}>Ajouter au panier</Button>
            </Card.Body>
        </Card>


    ) : (
            <div className="attente">Loading product...</div>
        )
    console.log(details)
    return (
        <div>

        
        <div className="container">
            {details}
        </div>

        </div>

    )
}
}

const mapStateToProps = (state) => {
	return {
        productdetails: state.productsReducer.productdetails,
	

	};
};

const mapDispatchToProps = {oneProducts, newCartProduct };

export default connect(mapStateToProps, mapDispatchToProps)(OneProductPage);

