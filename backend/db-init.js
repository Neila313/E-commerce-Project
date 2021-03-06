const bcrypt = require('bcrypt');
const con = require('./bdd/db');

async function initDataBase(con) {
  await con.query('SET FOREIGN_KEY_CHECKS=0');
  await con.query(`DROP TABLE IF EXISTS admin`);
  await con.query(`CREATE TABLE admin (
    id_admin INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
    lastname VARCHAR(150) NOT NULL, 
    firstname VARCHAR(150) NOT NULL,
    email VARCHAR(250) NOT NULL UNIQUE, 
    password VARCHAR(250) NOT NULL
  )`);

  await con.query(`INSERT INTO admin SET ?`, {
    lastname: 'Test',
    firstname: 'Admin',
    email: 'admin@shop.com',
    password: await bcrypt.hash('test', 10)
  });

  //Création de la table articles
  await con.query(`DROP TABLE IF EXISTS articles`);
  await con.query(`CREATE TABLE articles (
    id_article INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(250) NOT NULL, 
    paragraphe MEDIUMTEXT NOT NULL,
    image TEXT(500) NOT NULL,
    published_on DATE NOT NULL,
    id_admin INT,
    FOREIGN KEY (id_admin) REFERENCES admin(id_admin)
  )`);
    
  //Création de la table catégorie

  await con.query(`DROP TABLE IF EXISTS category`);
  await con.query(`CREATE TABLE category (
    id_category INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    denomination VARCHAR(250) NOT NULL
  )`);

  await con.query('INSERT INTO category (id_category, denomination) VALUES(?, ?)', [1, 'Soins du visage']);
  await con.query('INSERT INTO category (id_category, denomination) VALUES(?, ?)', [2, 'Soins du corps']);
  await con.query('INSERT INTO category (id_category, denomination) VALUES(?, ?)', [3, 'Soins des cheveux']);

  //Création de la table produits
  await con.query(`DROP TABLE IF EXISTS products`);
  await con.query(`CREATE TABLE products (
    id_product INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(150) NOT NULL, 
    description TEXT(1000) NOT NULL,
    details MEDIUMTEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image TEXT(1000) NOT NULL,
    id_admin INT NOT NULL,
    id_category INT NOT NULL,
    FOREIGN KEY (id_admin) REFERENCES admin(id_admin),
    FOREIGN KEY (id_category) REFERENCES category(id_category)
  )`);

  await con.query('INSERT INTO products SET ?', {
    name: 'Produit test 1',
    description: 'test',
    details: 'test',
    price: 10,
    image: 'https://images.unsplash.com/photo-1600428877878-1a0fd85beda8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80',
    id_admin: 1,
    id_category: 1
  });

  await con.query('INSERT INTO products SET ?', {
    name: 'Produit test 2',
    description: 'test',
    details: 'test',
    price: 100,
    image: 'https://images.unsplash.com/photo-1600428877878-1a0fd85beda8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80',
    id_admin: 1,
    id_category: 1
  });

  //Création de la table client
  await con.query(`DROP TABLE IF EXISTS customer`);
  await con.query(`CREATE TABLE customer (
    id_customer INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    lastname VARCHAR(150) NOT NULL, 
    firstname VARCHAR(150) NOT NULL, 
    email VARCHAR(250) NOT NULL UNIQUE, 
    password VARCHAR(250) NOT NULL
  )`);

  await con.query('INSERT INTO customer SET ?', {
    lastname: 'Test',
    firstname: 'Customer',
    email: 'customer@shop.com',
    password: await bcrypt.hash('test', 10)
  })

  //Création de la table favoris
  await con.query(`DROP TABLE IF EXISTS favoris`);
  await con.query(`CREATE TABLE favoris (
    id_product INT NOT NULL,
    id_customer INT NOT NULL,
    FOREIGN KEY (id_product) REFERENCES products(id_product),
    FOREIGN KEY (id_customer) REFERENCES customer(id_customer),
    PRIMARY KEY (id_product, id_customer)
  )`)

  // Création de la table cart_line
  await con.query(`DROP TABLE IF EXISTS cart_line`);
  await con.query(`CREATE TABLE cart_line (
    id_product INT NOT NULL,
    id_customer INT NOT NULL,
    qty INT NOT NULL,
    date_added DATETIME,
    FOREIGN KEY (id_product) REFERENCES products(id_product),
    FOREIGN KEY (id_customer) REFERENCES customer(id_customer),
    PRIMARY KEY (id_product, id_customer)
  )`);

  // Création de la table commande 
  await con.query(`DROP TABLE IF EXISTS commande`);
  await con.query(`CREATE TABLE commande (
    id_commande INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    date_commande DATETIME,
    status BOOLEAN,
    id_customer INT NOT NULL,
    FOREIGN KEY (id_customer) REFERENCES customer(id_customer)
  )`);

  // Création de la table commande_line 
  await con.query(`DROP TABLE IF EXISTS commande_line`);
  await con.query(`CREATE TABLE commande_line (
    id_commande INT UNSIGNED,
    id_product INT,
    qty INT NOT NULL,
    date_added DATETIME NOT NULL,
    FOREIGN KEY (id_product) REFERENCES products(id_product),
    FOREIGN KEY (id_commande) REFERENCES commande(id_commande),
    PRIMARY KEY (id_commande, id_product)
  )`);
  await con.query('SET FOREIGN_KEY_CHECKS=1');
  return con;
}
initDataBase(con).then(() => {
  con.end();
});