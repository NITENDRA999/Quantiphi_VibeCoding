function FilterSidebar({
    categories,
    selectedCategories,
    setSelectedCategories,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    minRating,
    setMinRating,
    onReset
}) {
    const handleCategoryChange = (category) => {
        setSelectedCategories((current) =>
            current.includes(category)
                ? current.filter((item) => item !== category)
                : [...current, category]
        );
    };

    return (
        <aside className="sticky top-6 h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                    Filters
                </h2>

                <button
                    onClick={onReset}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                    Reset
                </button>
            </div>

            {/* Category */}
            <div className="mb-8">
                <h3 className="mb-4 font-semibold text-gray-800">
                    Category
                </h3>

                <div className="space-y-3">
                    {categories.map((category) => (
                        <label
                            key={category}
                            className="flex cursor-pointer items-center gap-3 text-sm text-gray-700"
                        >
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                                className="h-4 w-4 rounded border-gray-300"
                            />

                            {category}
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
                <h3 className="mb-4 font-semibold text-gray-800">
                    Price Range
                </h3>

                <div className="mb-4 flex justify-between text-sm font-medium text-gray-600">
                    <span>₹{minPrice}</span>
                    <span>₹{maxPrice}</span>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="mb-2 block text-xs text-gray-500">
                            Minimum
                        </label>

                        <input
                            type="range"
                            min="0"
                            max="5000"
                            step="100"
                            value={minPrice}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                if (value <= maxPrice) {
                                    setMinPrice(value);
                                }
                            }}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-xs text-gray-500">
                            Maximum
                        </label>

                        <input
                            type="range"
                            min="0"
                            max="5000"
                            step="100"
                            value={maxPrice}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                if (value >= minPrice) {
                                    setMaxPrice(value);
                                }
                            }}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Rating */}
            <div>
                <h3 className="mb-4 font-semibold text-gray-800">
                    Minimum Rating
                </h3>

                <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <label
                            key={rating}
                            className="flex cursor-pointer items-center gap-3 text-sm text-gray-700"
                        >
                            <input
                                type="radio"
                                name="rating"
                                value={rating}
                                checked={minRating === rating}
                                onChange={() => setMinRating(rating)}
                            />

                            <span>
                                {rating} ★ & above
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </aside>
    );
}

export default FilterSidebar;