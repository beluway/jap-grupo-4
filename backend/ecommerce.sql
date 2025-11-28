DROP DATABASE IF EXISTS ecommerce;

CREATE DATABASE IF NOT EXISTS ecommerce
    DEFAULT CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

USE ecommerce;

CREATE TABLE Address (
  id INT AUTO_INCREMENT PRIMARY KEY,
  state VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  streetNumber INT NOT NULL,
  crossStreet VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

CREATE TABLE Card (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cardNumber VARCHAR(30) NOT NULL,
  cardName VARCHAR(50) NOT NULL,
  expMonth INT NOT NULL,
  expYear INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

CREATE TABLE Categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NULL,
  productCount INT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

CREATE TABLE ShippingType (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  percentage DOUBLE NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

CREATE TABLE Products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  price INT NOT NULL,
  currency VARCHAR(10) NULL,
  soldCount INT NULL,
  description TEXT NULL,
  categoryIdFK INT NULL,
  FOREIGN KEY (categoryIdFK) REFERENCES Categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

CREATE TABLE Wallet (
  id INT AUTO_INCREMENT PRIMARY KEY,
  idCardFK INT NULL,
  FOREIGN KEY (idCardFK) REFERENCES Card(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phoneNumber VARCHAR(20) NULL,
  walletIdFK INT NULL,
  FOREIGN KEY (walletIdFK) REFERENCES Wallet(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

CREATE TABLE Shipping (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ShippingTypeId INT NULL,
  AddressId INT NULL,
  FOREIGN KEY (ShippingTypeId) REFERENCES ShippingType(id),
  FOREIGN KEY (AddressId) REFERENCES Address(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

CREATE TABLE Transaction (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sourceAccount VARCHAR(100) NOT NULL,
  destinationAccount VARCHAR(100) NOT NULL,
  currency VARCHAR(10) NOT NULL,
  totalPrice DECIMAL(20,6) NOT NULL,
  reference VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

CREATE TABLE Cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  productId INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  currency VARCHAR(3) NOT NULL,
  name VARCHAR(200) NOT NULL,
  price DECIMAL(20,6) NOT NULL,
  totalPrice DECIMAL(20,6) NOT NULL,
  FOREIGN KEY (productId) REFERENCES Products(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

CREATE TABLE CartProducts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  productId INT NOT NULL,
  cartId INT NOT NULL,
  productCount INT NOT NULL,
  FOREIGN KEY (productId) REFERENCES Products(id),
  FOREIGN KEY (cartId) REFERENCES Cart(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

CREATE TABLE PaymentMethods (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cardId INT NULL,
  transactionId INT NULL,
  cartId INT NULL,
  FOREIGN KEY (cardId) REFERENCES Card(id),
  FOREIGN KEY (transactionId) REFERENCES Transaction(id),
  FOREIGN KEY (cartId) REFERENCES Cart(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

CREATE TABLE Comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  score INT NOT NULL,
  description TEXT NULL,
  dateTime DATETIME NULL,
  UserIdFK INT NULL,
  FOREIGN KEY (UserIdFK) REFERENCES Users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

INSERT INTO categories (id, name, description, productCount)
VALUES (1, 'Autos', 'Los mejores precios en autos 0km de alta y media gama' 'Categoría de vehículos', 3);

INSERT INTO products(id,name, price, currency, soldCount, description,categoryIdFK) 
VALUES(50921,'Chevrolet Onix Joy',13500,'USD',14, 'Generación 2019, variedad de colores. Motor 1.0, ideal para ciudad.',1),
(50922,'Fiat Way',14500,'USD',52, 'La versión de Fiat que brinda confort y a un precio accesible.',1),
(50923,'Suzuki Celerio',12500,'USD',25, 'Un auto que se ha ganado la buena fama por su economía con el combustible.',1);




