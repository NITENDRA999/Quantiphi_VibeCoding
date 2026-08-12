const products = require("../data/products");

function getFilteredProducts(filters = {}) {
    const {
        categories = [],
        minPrice,
        maxPrice,
        minRating,
        sort = ""
    } = filters;

    // Start with a copy of the master inventory
    let result = [...products];

    // CATEGORY FILTER
    if (categories.length > 0) {
        result = result.filter((product) =>
            categories.includes(product.category)
        );
    }

    // MINIMUM PRICE FILTER
    if (minPrice !== undefined && minPrice !== null) {
        result = result.filter(
            (product) => product.price >= minPrice
        );
    }

    // MAXIMUM PRICE FILTER
    if (maxPrice !== undefined && maxPrice !== null) {
        result = result.filter(
            (product) => product.price <= maxPrice
        );
    }

    // MINIMUM RATING FILTER
    if (minRating !== undefined && minRating !== null) {
        result = result.filter(
            (product) => product.rating >= minRating
        );
    }

    // SORT ONLY AFTER FILTERING
    if (sort === "price_asc") {
        result.sort((a, b) => a.price - b.price);
    }

    if (sort === "rating_desc") {
        result.sort((a, b) => b.rating - a.rating);
    }

    return result;
}

module.exports = {
    getFilteredProducts
};