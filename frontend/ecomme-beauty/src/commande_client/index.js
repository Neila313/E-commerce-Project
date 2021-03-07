import React from 'react';
// import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
// import Image from 'react-bootstrap/Image';
// import HTTP from '../provider/http';

class CommandeClient extends React.Component {
	render() {
		return (
			<div>
				<Table striped bordered hover size="sm">
					<thead>
						<tr>
							<th>ID Commande</th>
							<th>Date</th>
							<th>Statut</th>
							<th>Total</th>
							<th>Détail de la commande</th>
						</tr>
					</thead>
					<tbody>
							<tr>
								<td>id commande</td>
								<td>date</td>
								<td>statut</td>
								<td>total</td>
								<td>boutton détails</td>
							</tr>
					</tbody>
				</Table>
			</div>
		);
	}
}

export default CommandeClient;
