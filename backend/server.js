const express = require("express");

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

// Product routes
app.use("/api/products", productRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});