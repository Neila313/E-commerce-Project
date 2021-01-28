import React from 'react';
import Button from 'react-bootstrap/Button';




class DashboardAdmin extends React.Component{
    // state = {
    //     email: "",
    //     password: "", 
    //   };
    
      logOutSubmit = () => {
      
        localStorage.clear();
        this.props.history.push('/home');
      }

      render() {

        return(
          <div>
             <div><h1>Bienvue dans votre Dashboard</h1></div>
				
          <Button className="btn" onClick={ this.logOutSubmit.bind(this) } >Sign Out</Button>
			</div>


        )
    }

}
  export default (DashboardAdmin);