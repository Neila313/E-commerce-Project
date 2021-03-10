import React from 'react';
import './style.css'
import Breadcrumb from 'react-bootstrap/Breadcrumb';

// import Image from 'react-bootstrap/Image';

class CommandeValidation extends React.Component {

	render() {
		return (
		<div className="Containervalidation">
			<div className="filArianeProd">
					<Breadcrumb className="breadcrumb">
					<Breadcrumb.Item className="breadcrumb-item" href="/mon-compte">
						Mon compte
					</Breadcrumb.Item>
					<Breadcrumb.Item active>Validation de vote commande</Breadcrumb.Item>
				</Breadcrumb>
			</div>
		<p className="validation">votre commande a bien été validée</p>
		</div>
		);
	}
}



export default CommandeValidation
