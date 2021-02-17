import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import {connect} from 'react-redux'
import { Alert } from 'react-bootstrap';


class DashboardAdmin extends React.Component {
  state = {
		lastname: '',
		firstname: '',
    email: '',
    msgSuccessModif: ''
	};

	inputLastName = (event) => {
		this.setState({ lastname: event.target.value });
	};
	inputFirstName = (event) => {
		this.setState({ firstname: event.target.value });
	};
	inputEmail = (event) => {
		this.setState({ email: event.target.value });
	};
	
	logOutSubmit = () => {
		localStorage.clear();
		this.props.history.push('/home');
  };
  // componentDidMount() {

	// 	axios
	// 	.get(`http://localhost:8080/admin/${this.props.id}`)
	// 	.then((res) => {

	// 		console(res.data);
	// 	})
	// 	.catch((error) => {
	// 		// this.setState({ error : res.data });
	// 		console.log(error);
	// 	});
	// }
	


  handleSubmitEdition = async event => {
    // async parce que la requete doit attendre sinon elle passera dans else
    event.preventDefault();

    // const { id_admin } = this.props.match.params 
    // let token = localStorage.getItem('MyToken')
  
    let resp = await axios.get(`http://localhost:8080/admin/${this.props.id}`)
    // une requete axios GET et DELETE n'envoient jamais de req.body, elle ne le liront
    // console.log(resp);
    // console.log(resp.data);

    const editedAdmin = {
      //ce qui est avant les deux points est le req.body dans le back /!\
      // id_admin: parseInt(id_admin),
      lastname: this.state.lastname || resp.data[0]["lastname"], // soit tu me mets ce qu'il y a dans l'input OU ce qu'il y a 
      firstname: this.state.firstname || resp.data[0]["firstname"],
      email: this.state.email || resp.data[0]["email"]
    };
    console.log(editedAdmin);
    console.log("id",this.props.id);
    

    axios.put(`http://localhost:8080/admin/${this.props.id}`, editedAdmin, {headers: {authorization: `Bearer ${localStorage.getItem('MyToken')}`}})
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({ msgSuccessModif: "Votre profil a bien été modifié !" })
      })
      .catch(error => {
        console.log("catch error");
        console.log(error);
      }
      )
  }
  
 

	render() {
		return (
			<div>
				<div>
        <Button className="btn" onClick={this.logOutSubmit.bind(this)}>
					Sign Out
				</Button>				</div>


        <br></br>

				<Form onSubmit={this.handleSubmitEdition}>
        {this.state.msgSuccessModif ? <Alert variant="success"> {this.state.msgSuccessModif} </Alert> : null}

          <h2>Editer votre profil</h2>
					<Row>
						<Col>
							<Form.Control  placeholder="First name" onChange={this.inputFirstName} />
						</Col>
						<Col>
							<Form.Control placeholder="Last name" onChange={this.inputLastName} />
						</Col>
            <Col>
							<Form.Control type="email" placeholder="Email" onChange={this.inputEmail} />
						</Col>
					</Row>
          <br></br>
          <Button variant="info" type="submit">
						Modifier mon profil
					</Button>
				</Form>
			</div>
		);
	}
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
        token: state.adminReducer.token,
        id: state.adminReducer.id

    
  }
}

// const mapDispatchToProps = { loginAdmin }



export default connect(
  mapStateToProps
)(DashboardAdmin) ;
 