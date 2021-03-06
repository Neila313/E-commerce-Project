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
		// const categories = this.state.categories
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
				<div className="filterResutl">il y a {this.props.count} produits</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	categories: state.categoryReducer.categories
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FilterCateg);
