import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { connect } from 'react-redux';
import { newCategory } from '../store/action/category'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Alert } from 'react-bootstrap';
import axios from 'axios';


class AddCategory extends React.Component {

    state = {
        denomination: '',
        msgSuccess: ""
    };
    
    inputDenomination = (event) => {
		this.setState({ denomination: event.target.value });
    };
    
    returnSubmit = () => {
		this.props.history.push('/admin/dashboard');
	};

    handleSubmit = (event) => {
		event.preventDefault();

		const categ = {
			denomination: this.state.denomination
		};

		axios
			.post('http://localhost:8080/category', categ, {
				headers: { authorization: `Bearer ${localStorage.getItem('MyToken')}` }
			})
			//recuperation du token stocké dans le localStorage comme ca y'a plus "no token"
			.then((res) => {
				if (res.status === 200) {
					console.log(res);
					console.log(res.data);
					this.setState({ msgSuccess: 'Categorie ajoutée avec succès' });
					this.props.newCategory(res.data[0]);
				}
			})
			.catch((error) => {
				// this.setState({ error : res.data });
				console.log(error);
			});
    };
    
    render() {
        return (
           <div>
				<Jumbotron>
					<h1>Gérer nos catégorie</h1>
					<Button variant="info" type="submit" onClick={this.returnSubmit.bind(this)}>
						Retour sur mon Dashboard
					</Button>
				</Jumbotron>

				<Form onSubmit={this.handleSubmit}>
					{this.state.msgSuccess ? <Alert variant="success"> {this.state.msgSuccess} </Alert> : null}

					<Form.Group controlId="formGroupName">
						<Form.Label>Dénomination</Form.Label>
						<Form.Control
							type="denomination"
							placeholder="Enter the name of your category"
							onChange={this.inputDenomination}
						/>
					</Form.Group>

                    <Button variant="info" type="submit">
						Ajouter ma catégorie
					</Button>
                    </Form>
                    </div>
        )
    }

}

const mapStateToProps = (state /*, ownProps*/) => {
	return {
		// product: state.productsReducer.payload,
		categorie: state.categoryReducer.payload
	};
};

const mapDispatchToProps = { newCategory };

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory); 