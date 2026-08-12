const products = require("../data/products");

function getFilteredProducts(filters = {}) {
    const {
        categories = [],
        minPrice,
        maxPrice,
        minRating
    } = filters;

    let result = [...products];

    // Category filter
    if (categories.length > 0) {
        result = result.filter(product =>
            categories.includes(product.category)
        );
    }

    // Minimum price filter
    if (minPrice !== undefined && minPrice !== null) {
        result = result.filter(product =>
            product.price >= minPrice
        );
    }

    // Maximum price filter
    if (maxPrice !== undefined && maxPrice !== null) {
        result = result.filter(product =>
            product.price <= maxPrice
        );
    }

    // Minimum rating filter
    if (minRating !== undefined && minRating !== null) {
        result = result.filter(product =>
            product.rating >= minRating
        );
    }

    return result;
}

module.exports = {
    getFilteredProducts
};