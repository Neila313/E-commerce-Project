import React from 'react';

class AllProduct extends React.Component {

    render() {

        return (
            <div>
                    <p>Coucou admin</p>

                    <Nav variant="pills" defaultActiveKey="/admin/dashboard">
                    <Nav.Item>
                        <Nav.Link as={Link} to="/admin/product">Ajouter un produit</Nav.Link>
                    </Nav.Item>
                   
                </Nav>

            </div>
        )      
    
}

}

export default AllProduct 