import React from 'react';
import {  withRouter } from 'react-router-dom';
import './style.css';



class FooterPage extends React.Component {
	render() {
        console.log(this.props.location);
        if (this.props.location.pathname.includes('admin')){
            return (
                <div></div>
            )
        } else {

       
            return (
                <main className="footerM">
                  
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"></link>
                    <section className="Allfooter">
                    <div className="containerFooter">
                        <div className="containername">
                            <p className="nameFooter">My Precious Argan, 
                            <span className="footersousname" >le pouvoir de l'argan du Maroc</span></p>
                            <div className="socialmedia">
                               <div className="facebook"></div>
                               <div className="instagram"></div>
                            </div>
                        </div>
                        <div className="containerFooter2">
                            <div className="infoess">
                                <p>contacts</p>
                                <p>livraison</p>
                                <p>paiement sécurisé</p>
                                <p>parrainage</p>
                                <p>points de vente</p>
                            </div>
                            <div className="hrfooter"></div>
                            <div className="cgvall">
                                <p>cgv / cgu</p>
                                <p>mentions légales</p>
                            </div>
    
                        </div>
    
                    </div>
                    </section>
                </main>
            ); }

        
		
	}
}

export default withRouter(FooterPage);
