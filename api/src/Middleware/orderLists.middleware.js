
const { obtenerProductosById } = require("../Middleware/getProduct.middleware");

const dateFormated = (dateToConvert) => {
    const date = new Date(dateToConvert * 1000);

    const result = date.toLocaleString("en-US");
    
    return result;
}

const dataOrderController = (data) => {
    return data.map(element => {
        return {
            id: element.id,
            amount: element.amount/100,
            created: dateFormated(element.created),
            customer: element.customer,
            metadata: element.metadata,
            payment_method: element.payment_method,
            receipt_email: element.receipt_email,
            shipping: element.shipping
        }
    });
};


const getProductsInfo = async (items) => {
    
    let data = JSON.parse(items);
    
    await Promise.all(
        data.map(async e => {
            let product = await obtenerProductosById(e.id);
            e["image"] = product.image;
            e["brand"] = product.brand;
            e["model"] = product.model;
            e.price = e.price/100;
        })
    );

    return data;
};

const oneDataController = async (element) => {
    return {
        id: element.id,
        amount: element.amount/100,
        created: dateFormated(element.created),
        description: element.description,
        customer: element.customer,
        metadata: {
            orderStatus: element.metadata.orderStatus,
            productsOrdered: await getProductsInfo(element.metadata.productsOrdered)
        },
        payment_method: element.payment_method,
        receipt_email: element.receipt_email,
        shipping: element.shipping
    }
}

module.exports = { dateFormated, dataOrderController, oneDataController, getProductsInfo};