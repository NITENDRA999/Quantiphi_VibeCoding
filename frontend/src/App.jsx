import { useEffect, useState } from "react";
import FilterSidebar from "./components/FilterSidebar";
import ProductGrid from "./components/ProductGrid";
import SortDropdown from "./components/SortDropdown";

const API_URL = "http://localhost:5000/api/products";

const CATEGORIES = [
    "Electronics",
    "Apparel",
    "Footwear"
];

function App() {
    const [products, setProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(5000);
    const [minRating, setMinRating] = useState(null);
    const [sort, setSort] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
                `${API_URL}?${params.toString()}`
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

    useEffect(() => {
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
        <div className="min-h-screen bg-gray-50">
            <header className="border-b bg-white">
                <div className="mx-auto max-w-7xl px-6 py-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Product Marketplace
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Find products that match your preferences
                    </p>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
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

                    <section>
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Products
                                </h2>

                                <p className="text-sm text-gray-500">
                                    {products.length} products found
                                </p>
                            </div>

                            <SortDropdown
                                sort={sort}
                                setSort={setSort}
                            />
                        </div>

                        {loading && (
                            <div className="py-12 text-center text-gray-500">
                                Loading products...
                            </div>
                        )}

                        {error && (
                            <div className="py-12 text-center text-red-500">
                                {error}
                            </div>
                        )}

                        {!loading && !error && products.length === 0 && (
                            <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    No items match your criteria.
                                </h3>

                                <button
                                    onClick={resetFilters}
                                    className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}

                        {!loading && !error && (
                            <ProductGrid products={products} />
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}

export default App;