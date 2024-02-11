const { getProductCategoriesDb } = require("../api/categories/categories.service");
const { getOrderItemsDb } = require("../api/order_details/order_details.service");
const { getProductImagesDb } = require("../api/product_images/prod_img.service");

var functions = {
    cartItemJson: async (data) => {
        return {
            id: data.id,
            qty: data.qty,
            created_at: data.s_created_at,
            modified_at: data.s_modified_at,
            product_info: await functions.productJson(data),
        };
    },
    productJson: async (data) => {
        return {
            id: data.p_id,
            name: data.name,
            description: data.description,
            sunlight: data.sunlight,
            watering: data.watering,
            lifespan: data.lifespan,
            size: data.size,
            category: await getProductCategoriesDb(data.p_id),
            qty: data.qty_left,
            price: data.price,
            img_directory: data.img_directory,
            img_url: data.img_url,
            img_credit: data.img_credit,
            created_at: data.p_created_at,
            modified_at: data.p_modified_at,
            discount: functions.discountJson(data)
        };
    },
    discountJson: (data) => {
        if (!data.d_id) {
            return undefined;
        }
        return {
            id: data.d_id,
            name: data.d_name,
            description: data.d_description,
            discount_percent: data.discount_percent,
            created_at: data.d_created_at,
            modified_at: data.d_modified_at
        };
    },
    orderJson: async (data) => {
        return {
            id: data.id,
            total: data.total,
            status: data.status,
            order_items: await getOrderItemsDb(data.id),
            shipping_info: {
                full_name: data.address_owner,
                address: data.address,
                contact_number: data.contact_number
            },
            created_at: data.created_at,
            modified_at: data.modified_at
        };
    }
};

module.exports = functions;