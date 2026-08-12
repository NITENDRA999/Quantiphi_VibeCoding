const {
    getFilteredProducts
} = require("../services/productService");

function getProducts(req, res) {
    try {
        const {
            categories,
            minPrice,
            maxPrice,
            minRating,
            sort
        } = req.query;

        const parsedMinPrice =
            minPrice !== undefined
                ? Number(minPrice)
                : undefined;

        const parsedMaxPrice =
            maxPrice !== undefined
                ? Number(maxPrice)
                : undefined;

        const parsedMinRating =
            minRating !== undefined
                ? Number(minRating)
                : undefined;

        // Validate numeric filter values
        if (
            (parsedMinPrice !== undefined &&
                Number.isNaN(parsedMinPrice)) ||
            (parsedMaxPrice !== undefined &&
                Number.isNaN(parsedMaxPrice)) ||
            (parsedMinRating !== undefined &&
                Number.isNaN(parsedMinRating))
        ) {
            return res.status(400).json({
                message: "Invalid filter values"
            });
        }

        const filters = {
            categories: categories
                ? categories.split(",").filter(Boolean)
                : [],

            minPrice: parsedMinPrice,

            maxPrice: parsedMaxPrice,

            minRating: parsedMinRating,

            sort: sort || ""
        };

        const products = getFilteredProducts(filters);

        return res.json(products);

    } catch (error) {
        console.error("Error fetching products:", error);

        return res.status(500).json({
            message: "Failed to fetch products"
        });
    }
}

module.exports = {
    getProducts
};