const mySql = require('mysql2')
 
const con = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 8889,
    password: 'root',
    database: 'ecomm-beaute'
});
con.connect(function(err) {
    if (err) throw err;
    console.log('ok')

    //Création de la table admnistrateur
   
    con.query(`CREATE TABLE IF NOT EXISTS admin
                (id_admin INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
                lastname VARCHAR(150) NOT NULL, 
                firstname VARCHAR(150) NOT NULL, 
                email VARCHAR(250) NOT NULL UNIQUE, 
                password VARCHAR(250) NOT NULL)`);   

      //Création de la table articles

    con.query(`CREATE TABLE IF NOT EXISTS articles
                (id_article INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                 title VARCHAR(250) NOT NULL, 
                 paragraphe MEDIUMTEXT NOT NULL,
                 image TEXT(500) NOT NULL,
                 published_on DATE NOT NULL,
                 id_admin INT,
                 FOREIGN KEY (id_admin) REFERENCES admin(id_admin))`);
      
             //Création de la table catégorie

             con.query(`CREATE TABLE IF NOT EXISTS category 
             (id_category INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
              denomination VARCHAR(250) NOT NULL)`);                 
               //Création de la table produits
        
    con.query(`CREATE TABLE IF NOT EXISTS products
               (id_product INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                name VARCHAR(150) NOT NULL, 
                description TEXT(1000) NOT NULL,
                details MEDIUMTEXT NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                image TEXT(1000) NOT NULL,
                id_admin INT NOT NULL,
                id_category INT NOT NULL,
                FOREIGN KEY (id_admin) REFERENCES admin(id_admin),
                FOREIGN KEY (id_category) REFERENCES category(id_category))`);

            
              //Création de la table client
    
      con.query(`CREATE TABLE IF NOT EXISTS customer
                  (id_customer INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                  lastname VARCHAR(150) NOT NULL, 
                  firstname VARCHAR(150) NOT NULL, 
                  email VARCHAR(250) NOT NULL UNIQUE, 
                  password VARCHAR(250) NOT NULL)`);

              //Création de la table favoris

      con.query(`CREATE TABLE IF NOT EXISTS favoris
                 (id_favoris INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                  id_product INT NOT NULL,
                  id_customer INT NOT NULL,
                  FOREIGN KEY (id_product) REFERENCES products(id_product),
                  FOREIGN KEY (id_customer) REFERENCES customer(id_customer) )`)

      con.query(`CREATE TABLE IF NOT EXISTS cart
                  (id_cart INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                    ordered BOOLEAN,
                    id_customer INT NOT NULL,
                    FOREIGN KEY (id_customer) REFERENCES customer(id_customer))`)
      
      con.query(`CREATE TABLE IF NOT EXISTS cartproduct
                 (id_cartproduct INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                  quantity DECIMAL(10,2) NOT NULL,
                  id_cart INT,
                  id_product INT,
                  FOREIGN KEY (id_product) REFERENCES products(id_product),
                  FOREIGN KEY (id_cart) REFERENCES cart(id_cart))`)
  });

module.exports = con