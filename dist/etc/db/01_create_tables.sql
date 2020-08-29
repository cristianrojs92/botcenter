--
-- Script para la creacion de las tablas iniciales del sistema
--

--
--USERS (usuarios)
--

CREATE TABLE IF NOT EXISTS users (

  id                            serial PRIMARY KEY,  
  username                      varchar(50) not null,
  name                          varchar(50) NOT NULL,
  surname                       varchar(50) NOT NULL,         
  email                         varchar(50),
  password                      varchar(500) NOT NULL,
  delete                        boolean NOT NULL default false,

  CONSTRAINT users_unique UNIQUE (username)
);
CREATE INDEX IF NOT EXISTS users_index_1 ON users USING btree(username, password);

--
-- AUTH (autenticaciones)
--

CREATE TABLE IF NOT EXISTS auth (
  user_id       integer REFERENCES users(id) ON DELETE CASCADE,
  token         varchar(3000) not null,
  
  CONSTRAINT auth_unique UNIQUE (user_id)
);

--
-- STORES (locales)
--

CREATE TABLE IF NOT EXISTS stores (
  country            char(2) NOT NULL,
  store              varchar(3) NOT NULL,   
  name               varchar(40) NOT NULL,
  address            varchar(40) NOT NULL,
  
  CONSTRAINT store_unique UNIQUE (country, store, name)
);
CREATE INDEX IF NOT EXISTS store_index_1 ON stores USING btree(country);
CREATE INDEX IF NOT EXISTS store_index_2 ON stores USING btree(store);
CREATE INDEX IF NOT EXISTS store_index_3 ON stores USING btree(name);

--
-- PRODUCTS (productos)
--

CREATE TABLE IF NOT EXISTS products (
  country        char(2) NOT NULL,
  store          varchar(3) NOT NULL,
  code           bigint NOT NULL,
  name           varchar(40) NOT NULL,
  shortname      varchar(40) NOT NULL,
  type           integer NOT NULL,
  price          integer NOT NULL,
  
  CONSTRAINT products_unique UNIQUE (code, country, store)
);
CREATE INDEX IF NOT EXISTS products_index_1 ON products USING btree(code);
CREATE INDEX IF NOT EXISTS products_index_2 ON products USING btree(code, type);
CREATE INDEX IF NOT EXISTS products_index_3 ON products USING btree(type);

--
-- PRODUCTS_RELATIONS (relacion entre productos)
--

CREATE TABLE IF NOT EXISTS products_relations (
  code_main            bigint NOT NULL,
  code_child           bigint NOT NULL,

  CONSTRAINT products_relations_unique UNIQUE (code_main,code_child)
);
CREATE INDEX IF NOT EXISTS products_relations_index_1 ON products_relations USING btree(code_main);

--
-- ORDERS (ordenes)
--

CREATE TABLE IF NOT EXISTS orders (
  id                 serial NOT NULL PRIMARY KEY,
  country            char(2) NOT NULL,
  store              varchar(3) NOT NULL,
  order_number       integer NOT NULL,
  date               char(10) NOT NULL,
  time               char(8) NOT NULL,
  total              integer NOT NULL,
  status             integer NOT NULL,
  partner_name       varchar(40) NOT NULL,
  partner_id         serial,
  tin_number         bigint NOT NULL,
  tin_name           varchar(40) NOT NULL,
  client_address     varchar(40) NOT NULL,

  CONSTRAINT orders_unique UNIQUE (country, store, date, id)
  
);
CREATE INDEX IF NOT EXISTS orders_index_1 ON orders USING btree(country, store, date);
CREATE INDEX IF NOT EXISTS orders_index_2 ON orders USING btree(country, store, date, order_number);
CREATE INDEX IF NOT EXISTS orders_index_3 ON orders USING btree(partner_id);

--
-- ORDER_PRODUCTS (productos en la orden)
--

CREATE TABLE IF NOT EXISTS order_products (
  id                 serial NOT NULL PRIMARY KEY,
  order_id           bigint NOT NULL,
  country            char(2) NOT NULL,
  store              varchar(3) NOT NULL,
  order_number       integer NOT NULL,
  date               char(10) NOT NULL,
  time               char(8) NOT NULL,  
  code               bigint NOT NULL,
  qty                integer NOT NULL,
  price              integer NOT NULL,

  CONSTRAINT order_products_unique UNIQUE (id,country, store, order_id, code)
  
);
CREATE INDEX IF NOT EXISTS order_products_index_1 ON order_products USING btree(country, store, date);
CREATE INDEX IF NOT EXISTS order_products_index_2 ON order_products USING btree(country, store, date, order_number);
