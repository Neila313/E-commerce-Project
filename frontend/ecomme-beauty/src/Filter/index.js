import React, { Component } from 'react'
import { connect } from 'react-redux'


export class FilterCateg extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: []
        }
    }

    render() {
        const categories = this.state.categories
        return (
            <div className="filter">
              <div className="filterOrder"> Filtre {''}
              <select value={this.state.value} onChange={this.props.filterProduct}>
                  <option>Categorie</option>
                  { categories && categories.map(elem => {
                      console.log(categories);
                      return (
                        <option value={elem.id_categorie} key={elem.id_categorie}>{elem.denomination}</option>

                      )
                  }) }

              </select>
              </div> 
              <div className="filterResutl">
                  il y a {this.props.count} produits
              </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    categories: state.categoryReducer.categories
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterCateg)
