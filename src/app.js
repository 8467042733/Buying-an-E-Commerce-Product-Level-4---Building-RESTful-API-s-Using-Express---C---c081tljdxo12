const fs = require('fs');
const express = require('express');
const app = express();


// Importing products from products.json file
const products = JSON.parse(
    fs.readFileSync(`${__dirname}/data/product.json`)
);


// Middlewares
app.use(express.json());

// Write PATCH endpoint to buy a product for the client here
// Endpoint /api/v1/products/:id

app.patch('/api/v1/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
        const product = products[productIndex];
        if (product.quantity > 0) {
            product.quantity--;
            products[productIndex] = product;
            res.status(200).json({
                status: 'success',
                message: `Thank you for purchasing ${product.name}`,
                product: {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity,
                },
            });
        } else {
            res.status(404).json({
                status: 'success',
                message: `${product.name}, Out of stock!`,
            });
        }
    } else {
        res.status(404).json({
            status: 'failed',
            message: 'Product not found!',
        });
    }
});


module.exports = app;
