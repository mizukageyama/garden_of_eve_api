const cart_query_join = `shopping_cart.id, shopping_cart.qty, DATE_FORMAT(shopping_cart.created_at, '%Y-%m-%d %T') 
as s_created_at, DATE_FORMAT(shopping_cart.modified_at, '%Y-%m-%d %T') as s_modified_at`;

const product_query_join = `products.id as p_id, products.name, products.description, products.sunlight, 
products.watering, products.lifespan, products.size, products.price, products.qty as qty_left, 
products.img_directory, products.img_url, products.img_credit, 
DATE_FORMAT(products.created_at, '%Y-%m-%d %T') as p_created_at, 
DATE_FORMAT(products.modified_at, '%Y-%m-%d %T') as p_modified_at`;

const user_query = `id, email, password, first_name, last_name, profile_img, is_admin, 
DATE_FORMAT(created_at, '%Y-%m-%d %T') as created_at, 
DATE_FORMAT(modified_at, '%Y-%m-%d %T') as modified_at`;

const discount_query = `id, name, description, discount_percent, DATE_FORMAT(created_at, '%Y-%m-%d %T') as
created_at, DATE_FORMAT(modified_at, '%Y-%m-%d %T') as modified_at`;

const discount_query_join = `discount.id as d_id, discount.name as d_name, discount.description as d_description, 
discount.discount_percent, DATE_FORMAT(discount.created_at, '%Y-%m-%d %T') as d_created_at, 
DATE_FORMAT(discount.modified_at, '%Y-%m-%d %T') as d_modified_at`;

const orders_query_join = `orders.id, orders.total, orders.status,  orders.address_owner,  orders.contact_number,  
orders.address, DATE_FORMAT(orders.created_at, '%Y-%m-%d %T') 
as created_at, DATE_FORMAT(orders.modified_at, '%Y-%m-%d %T') as modified_at`;

// const addr_query_join = `delivery_address.id as addr_id, delivery_address.full_name, delivery_address.address, 
// delivery_address.contact_number`;

module.exports = {
    user_query: user_query,
    discount_query: discount_query,
    product_query_join: product_query_join,
    discount_query_join: discount_query_join,
    cart_query_join: cart_query_join,
    orders_query_join: orders_query_join,
};