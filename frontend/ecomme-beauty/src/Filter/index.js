import React, { Component } from 'react';
import { connect } from 'react-redux';

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
		this.props.handleSelect(target.value)
	};

	render() {
		const count = this.props.products.length
		return (
			<div className="filter">
				<div className="filterOrder">
					<select value={this.state.selectedOption} onChange={this.handleSelect}>
						<option value="0">Veuillez selectionnez une categorie</option>
						{this.props.categories.map(({ id_category, denomination }) => (
							<option key={id_category} value={id_category}>
								{denomination}
							</option>
						))}
					</select>
				</div>
				<div className="filterResutl">il y a {count} produits</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	categories: state.categoryReducer.categories, 
	products: state.productsReducer.products,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FilterCateg);
