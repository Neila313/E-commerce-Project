import React from 'react';
import { connect } from 'react-redux';
import HTTP from '../provider/http';
import { listCommande, detailListCommande } from '../store/action/commande_client';
import '../commande_client/style.css';
import Table from 'react-bootstrap/Table';
// import Image from 'react-bootstrap/Image';

class CommandeClient extends React.Component {
	state = {
		detailCommande: [], 
		cout: 0,
		
	};
	componentDidMount() {
		this.loadCommande();
		this.loadDetailsCommande();
	}
	loadCommande() {
		HTTP.get('/cart').then((res) => {
			this.props.listCommande(res.data);
		});
	}
	loadDetailsCommande() {
		HTTP.get('/cart-line').then((res) => {
			this.setState({ detailCommande: res.data });
			console.log(this.state.detailCommande);
			this.props.detailListCommande(res.data);
		});
	}
	render() {
		return (
		<div className="tabCont">
			
				<Table striped bordered hover size="sm" className="table">
					<thead>
						<tr>
							<th>Commande</th>
							<th>Date</th>
							<th>Status</th>
							<th>produit</th>
							<th>Quantité</th>
							<th>total</th>
						</tr>
					</thead>
					<tbody>

						{this.props.detailCommande.map((elem, id_product) => {
							return (
								<tr key={id_product} className="commande">
									<td>{elem.id_commande}</td>
									<td>{elem.date_commande}</td>
									<td>validée</td>
									<td>{elem.name}</td>
									<td>{elem.qty}</td>
									<td>{elem.total}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
		</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		recapCommande: state.commandeReducer.recapCommande,
		detailCommande: state.commandeReducer.detailCommande
	};
};
const mapDispatchToProps = { listCommande, detailListCommande };

export default connect(mapStateToProps, mapDispatchToProps)(CommandeClient);
