import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css';
import ListGroup from 'react-bootstrap/ListGroup'

export class FilterCateg extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			selectedOption: ''
		};
	}

	handleSelect = ({ target }) => {
		this.setState({ selectedOption: target.value });
		this.props.handleSelect(target.value);
	};

	render() {
		const count = this.props.products.length;
		return (
			<div className="ContainerFilter">
				<div className="filterResutl"> {count} produits</div>
				<div className="filter">
					<div className="filterOrder">
						<select className="selectFilter" value={this.state.selectedOption} onChange={this.handleSelect}>
							<option value="0">Veuillez selectionnez une categorie</option>
							{this.props.categories.map(({ id_category, denomination }) => (
								<option key={id_category} value={id_category}>
									{denomination}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	categories: state.categoryReducer.categories,
	products: state.productsReducer.products
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FilterCateg);
