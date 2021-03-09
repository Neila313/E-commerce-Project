import React from 'react';
import './style.css';




class Home extends React.Component {
    render() {
        return (
            <div>
                	<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap" rel="stylesheet"></link>

                    <section className="Section1">
                        <div className="titleHome">
                        <h1 className="titleHomebis">huile précieuse d'argan</h1>
                        </div>
                    </section>

                    <section className="Section2">
                        <div className="img1Home"></div>
                        <div className="para1Home">
                            <p className="para1Homebis">
                            L’huile d’argan est connu depuis des millénaires au Maroc et plus précisément dans le sud entre Essaouira et Tiznit. Et c’est uniquement dans cette région, et nul part ailleurs au monde, que pousse naturellement l’arbre aux milles vertus : l’Arganier (Argania spinosa).
                            L’arganier a cette particularité d’être un arbre sauvage et pousse tout naturellement dans un écosystème sans avoir besoin de la main de l’homme. Ainsi ni engrais ni pesticide n’ont touché cet arbre béni. Traditionnellement ce sont les femmes berbères qui récoltent les fruits.
                            </p>
                        </div>
                    </section>

                    <section className="Section3">
                        <div className="para2Home">
                            <p className="para2Homebis">
                            Grâce à sa composition, l’huile d’argan possède de nombreux bienfaits.
Elle améliore la qualité du ciment intercellulaire ce qui permet une hydratation intense de la peau en profondeur. Elle est composée à 80% d’acides gras insaturés, notamment les oméga 6 et oméga 9,  c’est ce qui en fait une des meilleures huiles pour lutter contre le vieillissement de la peau. C’est un allié de taille pour nourrir la peau et régénérer ses cellules. Elle est également riche en vitamine E,  connue sous le nom de tocophérol, un puissant antioxydant qui va neutraliser les radicaux libres. Enfin, riche en molécules insaponifiables, l’huile d’argan a des propriétés restructurantes sans être grasse.</p>
                        </div>
                        <div className="img2Home"></div>
                    </section>
				

               

            </div>
        )
    }
}

export default Home; 