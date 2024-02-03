-- Table: public.products
CREATE TABLE IF NOT EXISTS public.products
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name_product character varying(100) COLLATE pg_catalog."default" NOT NULL,
    quantity integer NOT NULL,
    price integer NOT NULL,
    total_price integer,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    customer_id integer,
    CONSTRAINT product_id_primary PRIMARY KEY (id),
    CONSTRAINT product_id_unique UNIQUE (id),
    CONSTRAINT products_customer_id_foreign FOREIGN KEY (customer_id)
        REFERENCES public.customers (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.products
    OWNER to postgres;

-- Table: public.customers
CREATE TABLE IF NOT EXISTS public.customers
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    phone character varying(20) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    status boolean,
    CONSTRAINT customer_id_primary PRIMARY KEY (id)
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.customers
    OWNER to postgres;


-- Thêm dữ liệu cho table customers
INSERT INTO customers(name, email, phone, status)
VALUES('nguyen van a', 'user1@gmail.com', 0234857365, true),
('nguyen van b', 'user2@gmail.com', 0364853321, false),
('nguyen van c', 'user3@gmail.com', 0582346379, false);

--Thêm dữ liệu cho table products
INSERT INTO products(name_product, code, price)
VALUES('san pham 1','7925c4f01729', 2000),
('san pham 2','9a1255c0ac6b', 3000),
('san pham 3','d1befb41727c', 4000),
('san pham 4','01b08ecd2227', 8000);

--Thêm dữ liệu cho table orders
-- user.id(8-9-10), product_id(17-18-19-20)
INSERT INTO orders(customer_id, product_id, quantity)
VALUES(8, 17, 5),(8, 19, 12), (8, 20, 8), (9, 17, 5), (9, 18, 13), (10, 19, 12);

-- Xem danh sách đơn hàng
SELECT customers.name, customers.email, customers.phone, customers.status,
SUM(orders.quantity) AS total_order, 
SUM(orders.quantity * products.price) AS totals_price,
orders.updated_at
FROM customers
INNER JOIN orders
ON orders.customer_id = customers.id
INNER JOIN products
ON orders.product_id = products.id
GROUP BY customers.id, orders.updated_at;


-- Xem chi tiết đơn hàng
SELECT customers.*,
products.name_product AS name_product, 
products.price AS price_product,
products.quantity AS quantity,
SUM(products.quantity * products.price) AS total_price
FROM customers
INNER JOIN products
ON customers.id = products.customer_id
GROUP BY customers.id, products.name_product, products.price, products.quantity;