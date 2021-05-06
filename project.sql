/*
 Navicat Premium Data Transfer

 Source Server         : project
 Source Server Type    : MySQL
 Source Server Version : 80021
 Source Host           : localhost:3306
 Source Schema         : project

 Target Server Type    : MySQL
 Target Server Version : 80021
 File Encoding         : 65001

 Date: 18/03/2021 19:34:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address`  (
  `add_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL,
  `address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `state` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `country` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `pin` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`add_id`) USING BTREE,
  INDEX `FK_UserAddress`(`user_id`) USING BTREE,
  CONSTRAINT `FK_UserAddress` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of address
-- ----------------------------

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart`  (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL,
  `prod_id` int NULL DEFAULT NULL,
  `cart_quantity` int NULL DEFAULT NULL,
  PRIMARY KEY (`cart_id`) USING BTREE,
  INDEX `FK_UserCart`(`user_id`) USING BTREE,
  INDEX `FK_CartProduct`(`prod_id`) USING BTREE,
  CONSTRAINT `FK_CartProduct` FOREIGN KEY (`prod_id`) REFERENCES `product` (`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_UserCart` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES (20, 4, 1, 2);

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `cat_id` int NOT NULL AUTO_INCREMENT,
  `cat_title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `cat_description` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`cat_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, 'Electronics', 'A category  nice');
INSERT INTO `category` VALUES (2, 'Beauty Products', 'a category releted to beauty products');
INSERT INTO `category` VALUES (3, 'Fashion', 'Overall, nine categories of fashion were defined: second hand, Vietnamese retail, discount shops, supermarkets, cheaper conventional fashion, expensive conventional fashion, boutique, luxury fashion and fashion designers.');
INSERT INTO `category` VALUES (4, 'Home', 'category contain home products');
INSERT INTO `category` VALUES (5, 'Toys and Baby', 'category contain products regarding childrens');
INSERT INTO `category` VALUES (6, 'sports & more', 'category contain product regarding sports');
INSERT INTO `category` VALUES (7, 'Food & More', 'category contain product regarding Food & More');
INSERT INTO `category` VALUES (8, 'Indias Heritage', 'This category products reflects the heritage rich arts');
INSERT INTO `category` VALUES (9, 'Furniture', 'A category Product regarding Furniture');

-- ----------------------------
-- Table structure for company
-- ----------------------------
DROP TABLE IF EXISTS `company`;
CREATE TABLE `company`  (
  `comp_id` int NOT NULL AUTO_INCREMENT,
  `comp_title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `comp_description` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`comp_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of company
-- ----------------------------
INSERT INTO `company` VALUES (1, 'JIO', 'Jio is not just a telecom network, it is an entire ecosystem that allows Indians to live the digital life to the fullest. This ecosystem consists of powerful broadband networks, useful applications, best-in-class services and smart devices distributed to every doorstep in India.');
INSERT INTO `company` VALUES (2, 'L’ORÉAL', 'French company L’Oreal  manufactures and markets a wide range of skin care, makeup, fragrance and hair care products through mass market, partnered, professional, spa and travel retail outlets globally.');
INSERT INTO `company` VALUES (13, 'Samsung Electronics', 'Samsung  Electronics is the 2nd largest electronics company in the world with a revenue of USD 221.6 billion generated last year. Samsung is a South Korean multinational electronics company headquartered in South Korea and best known as one of the world’s largest electronics manufacturers of consumer electronics and semiconductors. The company manufactures electronic components such as lithium-ion batteries, semiconductors, chips, image sensors. Samsung is also the world’s largest manufacturer of mobile phones and smartphones, known for its flagship Samsung Galaxy product line of smartphones. The company also created the phablet market with its line of Samsung Galaxy note devices.');
INSERT INTO `company` VALUES (14, 'Huawei', 'Huawei is a Chinese multinational technology company that specializes in manufacturing and selling consumer electronics and telecommunications equipment. Huawei was founded in 1987 and is currently headquartered in Shenzhen, China. In 2019, Huawei brought in annual revenues of USD 122.97 billion, ranking 4th in revenue generated among the top electronics companies on this list. Huawei sells its products in over 170 countries and recently overtook Apple as the second-largest smartphone manufacturer in the world behind only Samsung. With a 20% market share, Huawei is China’s largest smartphone seller.');
INSERT INTO `company` VALUES (15, 'Dell Technologies', 'Ranking 4th on this list of the top electronics companies is Dell Technologies, an American multinational technology company headquartered in Round Rock, Texas. Dell is known for a robust electronics product line including personal computers, servers, smartphones, televisions, computer software, computer security, and network security, as well as information security services. Unlike some of the other global brands on this list, approximately 50% of Dell’s revenue is generated from the American market.');
INSERT INTO `company` VALUES (16, 'Adidas ', 'For the sports enthusiast, having an idea where to buy your sports equipments and which is the best sports equipments companies is a definite plus! If you are an athlete who aspires to have the next great name and fame in the sports industry, then finding the right equipments companies is the very first step to launch your career. The choice is up to you!');
INSERT INTO `company` VALUES (17, 'Reebok ', 'Your dream to look impeccably stylish comes true with Reebok as it is one footwear brand that has a strong presence across the world. This company has emerged as a global brand for shoes with its elegant range.');
INSERT INTO `company` VALUES (18, 'Britannia Industries Ltd', 'One of the top 10 food processing companies in India, Britannia Industries Ltd was established in the year 1892 and has its headquarters located in Kolkata, Bengaluru. The company’s principal activity is the manufacture and sales of bread, rusk, cakes, and dairy products. The company sells its Britannia and Tiger brands of biscuits, breads and dairy products throughout India and in more than 60 countries across the world.');
INSERT INTO `company` VALUES (19, 'Nestle India Ltd', 'Nestle India Ltd was established in the year 1866 and is headquartered in Switzerland. It is one of the top 10 food processing companies in India. The company produces various products including coffee, water, dairy products, snacks, etc, The company has branches in more than 80 countries with adequate employees who give the best outcome. The company has four branches located in India. The company was founded by Henri Nestle.');
INSERT INTO `company` VALUES (20, 'Godrej Interio', 'Godrej Interio is one of the most popular furniture brands in India which was established in 1897. Godrej Interio excels in home and office furniture. Godrej group furniture business unit Godrej Interio is headquartered in Mumbai. This brand has a great collection of furniture and home decor items. You will find furniture for home, office, kitchen, commercial complex, hotels and more. This brand tops our list of top furniture brands in India 2021.Godrej Interio has 50 showrooms present around 18 different cities of India and you will find more than 800 dealer outlets in India as well.Godrej Interio has the best manufacturing capability along with high technological expertise, product innovation and designing.');
INSERT INTO `company` VALUES (21, 'Usha ', 'Usha is a much-trusted brand for furniture in India. It has a great range of furniture options and designs. Usha Lexus brand has got everything you need when it comes to furniture. You get furniture for bedroom, dining, living, study, office, and other miscellaneous furniture. Usha provides genuine solid wood Furniture in India. They have exclusive packages for complete home furniture. If you are looking for Stain Proof Melamine Polish furniture Usha is the best furniture brand for it. On Usha, you get 12 months free replacement warranty on furniture and 30 months free after-sales service. Also if you want customised furniture then Usha is the best brand for customised furniture in India.');
INSERT INTO `company` VALUES (22, ' Nestle India', 'Headquartered in Vevey, Switzerland, Nestlé is the largest food producing company in the world as well as in India. With leading products like Maggi, KitKat, Milky Bar, Polo, Nescafe, and many more, Nestlé’s annual sales  is more than the U.S. $ 1.1 billion. It has a wide range of products in baby food, breakfast cereals, coffee and tea, an assortment in confectionaries and many more. It is having a total of 8 manufacturing facilities and 4 branch offices (Delhi, Mumbai, Chennai, Kolkata) in India.');

-- ----------------------------
-- Table structure for myorder
-- ----------------------------
DROP TABLE IF EXISTS `myorder`;
CREATE TABLE `myorder`  (
  `myorder_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL,
  `orderDate` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` int NULL DEFAULT 0,
  `total_price` float NOT NULL,
  PRIMARY KEY (`myorder_id`) USING BTREE,
  INDEX `FK_UserOrder`(`user_id`) USING BTREE,
  CONSTRAINT `FK_UserOrder` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of myorder
-- ----------------------------

-- ----------------------------
-- Table structure for orderdetails
-- ----------------------------
DROP TABLE IF EXISTS `orderdetails`;
CREATE TABLE `orderdetails`  (
  `orderdetails_id` int NOT NULL AUTO_INCREMENT,
  `myorder_id` int NULL DEFAULT NULL,
  `product_id` int NULL DEFAULT NULL,
  `price` float NULL DEFAULT NULL,
  `quantity` int NULL DEFAULT NULL,
  `rating` int NULL DEFAULT NULL,
  `comment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`orderdetails_id`) USING BTREE,
  INDEX `FK_MyOrderDetails`(`myorder_id`) USING BTREE,
  INDEX `FK_ProductOrderDetails`(`product_id`) USING BTREE,
  CONSTRAINT `FK_MyOrderDetails` FOREIGN KEY (`myorder_id`) REFERENCES `myorder` (`myorder_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_ProductOrderDetails` FOREIGN KEY (`product_id`) REFERENCES `product` (`prod_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of orderdetails
-- ----------------------------

-- ----------------------------
-- Table structure for payment
-- ----------------------------
DROP TABLE IF EXISTS `payment`;
CREATE TABLE `payment`  (
  `pay_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL,
  `pay_amount` float NULL DEFAULT NULL,
  `myorder_id` int NULL DEFAULT NULL,
  `pay_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `pay_type` int NULL DEFAULT 0,
  PRIMARY KEY (`pay_id`) USING BTREE,
  INDEX `FK_UserPayment`(`user_id`) USING BTREE,
  INDEX `FK_MyorderPayment`(`myorder_id`) USING BTREE,
  CONSTRAINT `FK_MyorderPayment` FOREIGN KEY (`myorder_id`) REFERENCES `myorder` (`myorder_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_UserPayment` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of payment
-- ----------------------------

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `prod_id` int NOT NULL AUTO_INCREMENT,
  `prod_title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `prod_description` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `prod_price` float NULL DEFAULT NULL,
  `cat_id` int NULL DEFAULT NULL,
  `comp_id` int NULL DEFAULT NULL,
  `prod_qty` int NULL DEFAULT 0,
  `seller_id` int NULL DEFAULT NULL,
  `photo` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`prod_id`) USING BTREE,
  INDEX `FK_ProductCategory`(`cat_id`) USING BTREE,
  INDEX `FK_ProductCompany`(`comp_id`) USING BTREE,
  CONSTRAINT `FK_ProductCategory` FOREIGN KEY (`cat_id`) REFERENCES `category` (`cat_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ProductCompany` FOREIGN KEY (`comp_id`) REFERENCES `company` (`comp_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (1, 'Iphone 12 ', 'A14 Bionic, the fastest chip in a smartphone. An edge-to-edge OLED display. Ceramic Shield with four times better drop performance. And Night mode on every camera. iPhone 12 has it all — in two perfect sizes.', 100, 1, 1, 10, 2, '4e6dc2e693fba0ccdb7a228ca55a8d74');
INSERT INTO `product` VALUES (2, 'LOreal Pari', 'a beauty product ', 100, 2, 2, 5, 6, '2075dd4141278697a06e27642e143aae');
INSERT INTO `product` VALUES (16, '2021 ADIDAS XT GREY 2.0 CRICKET BAT', 'The XT GREY range combines the highest level of performance with the iconic three stripe style. Featuring a very traditional style shape with slight concaving in the bat allows for the perfect light pick-up. This bat is designed for the type of player who likes to bat long, whilst playing both front and back foot shots.', 100, 6, 16, 5, 2, '88fd74a11fd1abec19156f3481fe7332');
INSERT INTO `product` VALUES (17, ' BADMINTON RACKET ', ' badminton player who looking for a tolerant racket with power!. The racket offers a big sweet spot and decreases your errors when it is off-center, the soft shaft generates power for the beginner player who has slow wrist movement.', 100, 6, 17, 5, 2, '3379845c1e9f517d6dc61c6e0aa13813');
INSERT INTO `product` VALUES (18, 'Nescafe', 'Here at NESCAFE we believe there is something special in our little everyday moments, from that first wonderful sip of hot, milky coffee in the morning to those ten stolen minutes of me-time with a latte in the afternoon.', 100, 7, 22, 10, 6, '891392452f096dfc8e7aaada883af439');
INSERT INTO `product` VALUES (19, 'USHA Table Fan', 'High Performance: Aerodynamically designed blades for High Air delivery Efficient and powerful: 100% Copper Motor designed for Indian conditions consumes only 55W Uniform and jerk free oscillation and Easy tilting mechanism to set the air flow as required Sturdy and Safe: With a wide base and a resettable fuse to protect from thermal overload Easy assembly : Follow step by step instruction as per manual Air Delivery: 67 Cubic meter per minute and Speed: 1280 rpm 2 Year Warranty', 100, 1, 21, 5, 6, 'de3e9aa90d936955fbc5bd0a275a64b2');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `user_phone` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `user_email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `user_password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `user_status` int NULL DEFAULT 0,
  `user_role` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'CUSTOMER',
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE INDEX `user_email`(`user_email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'Pankaj', '7972333108', 'chaudharip371@gmail.com', 'ca25e689a49f4b8e4a09ec1daa597c7fd86a04ffe2bb9acf2dd0fa3668233eab', 2, 'CUSTOMER');
INSERT INTO `user` VALUES (2, 'seller', '7972333108', 'seller@gmail.com', 'a4279eae47aaa7417da62434795a011ccb0ec870f7f56646d181b5500a892a9a', 0, 'SELLER');
INSERT INTO `user` VALUES (3, 'admin', '7972333108', 'admin@gmail.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 0, 'ADMIN');
INSERT INTO `user` VALUES (4, 'hrishi', '8007840189', 'hrishi@gmail.com', '4d4e5aa41372ab8a92a04ab7d52cd3227ec894613b8691c7434cbc2ccc708023', 1, 'CUSTOMER');
INSERT INTO `user` VALUES (5, 'roshan', '08007840189', 'roshan@gmail.com', 'c7b2cb55a920e95f5c49e3331a49be027f9e402e81bbf38393b72d80e76158b9', 1, 'CUSTOMER');
INSERT INTO `user` VALUES (6, 'seller2', '7972333108', 'seller2@gamil.com', 'faa48f6eb524a11ebbab52a9da43cc9fedf3da15376fe47a5a3a5cdc98ac2e44', 0, 'SELLER');

SET FOREIGN_KEY_CHECKS = 1;
