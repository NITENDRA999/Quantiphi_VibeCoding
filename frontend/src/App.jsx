import { useEffect, useState } from "react";
import FilterSidebar from "./components/FilterSidebar";
import ProductGrid from "./components/ProductGrid";
import SortDropdown from "./components/SortDropdown";
import "./index.css";

const CATEGORIES = ["Electronics", "Apparel", "Footwear"];

function App() {
    const [products, setProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(5000);
    const [minRating, setMinRating] = useState(null);
    const [sort, setSort] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const params = new URLSearchParams();

                if (selectedCategories.length > 0) {
                    params.set(
                        "categories",
                        selectedCategories.join(",")
                    );
                }

                params.set("minPrice", minPrice);
                params.set("maxPrice", maxPrice);

                if (minRating !== null) {
                    params.set("minRating", minRating);
                }

                if (sort) {
                    params.set("sort", sort);
                }

                const response = await fetch(
                    `/api/products?${params.toString()}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError("Unable to load products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [
        selectedCategories,
        minPrice,
        maxPrice,
        minRating,
        sort
    ]);

    const resetFilters = () => {
        setSelectedCategories([]);
        setMinPrice(0);
        setMaxPrice(5000);
        setMinRating(null);
        setSort("");
    };

    return (
        <div>
            <header className="app-header">
                <div className="header-content">
                    <h1>Product Marketplace</h1>
                    <p>
                        Find products that match your preferences
                    </p>
                </div>
            </header>

            <main className="page-container">
                <div className="layout">

                    <FilterSidebar
                        categories={CATEGORIES}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        setMinPrice={setMinPrice}
                        setMaxPrice={setMaxPrice}
                        minRating={minRating}
                        setMinRating={setMinRating}
                        onReset={resetFilters}
                    />

                    <section className="products-section">

                        <div className="products-toolbar">
                            <div>
                                <h2>Products</h2>
                                <p className="product-count">
                                    {products.length} products found
                                </p>
                            </div>

                            <SortDropdown
                                sort={sort}
                                setSort={setSort}
                            />
                        </div>

                        {loading && (
                            <div className="loading">
                                Loading products...
                            </div>
                        )}

                        {error && (
                            <div className="error">
                                {error}
                            </div>
                        )}

                        {!loading &&
                            !error &&
                            products.length === 0 && (
                                <div className="empty-state">
                                    <h3>
                                        No items match your criteria.
                                    </h3>

                                    <button
                                        className="reset-button"
                                        onClick={resetFilters}
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            )}

                        {!loading &&
                            !error &&
                            products.length > 0 && (
                                <ProductGrid
                                    products={products}
                                />
                            )}
                    </section>
                </div>
            </main>
        </div>
    );
}

export default App;