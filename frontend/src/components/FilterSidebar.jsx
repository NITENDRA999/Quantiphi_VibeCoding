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
    const MIN = 0;
    const MAX = 5000;
    const STEP = 100;

    const handleCategoryChange = (category) => {
        setSelectedCategories((current) =>
            current.includes(category)
                ? current.filter((item) => item !== category)
                : [...current, category]
        );
    };

    const handleMinPriceChange = (event) => {
        const value = Number(event.target.value);

        if (value <= maxPrice) {
            setMinPrice(value);
        }
    };

    const handleMaxPriceChange = (event) => {
        const value = Number(event.target.value);

        if (value >= minPrice) {
            setMaxPrice(value);
        }
    };

    const minPercent = ((minPrice - MIN) / (MAX - MIN)) * 100;
    const maxPercent = ((maxPrice - MIN) / (MAX - MIN)) * 100;

    return (
        <aside className="filter-sidebar">

            {/* Header */}
            <div className="filter-header">
                <h2>Filters</h2>

                <button
                    type="button"
                    onClick={onReset}
                    className="reset-link"
                >
                    Reset
                </button>
            </div>

            {/* Category */}
            <div className="filter-section">
                <h3>Category</h3>

                {categories.map((category) => (
                    <label
                        key={category}
                        className="checkbox-item"
                    >
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() =>
                                handleCategoryChange(category)
                            }
                        />

                        <span>{category}</span>
                    </label>
                ))}
            </div>

            {/* Price Range */}
            <div className="filter-section">
                <h3>Price Range</h3>

                <div className="price-values">
                    <span>₹{minPrice}</span>
                    <span>₹{maxPrice}</span>
                </div>

                <div className="dual-range">

                    {/* Background track */}
                    <div className="range-track"></div>

                    {/* Selected range */}
                    <div
                        className="range-progress"
                        style={{
                            left: `${minPercent}%`,
                            right: `${100 - maxPercent}%`
                        }}
                    ></div>

                    {/* Minimum handle */}
                    <input
                        type="range"
                        min={MIN}
                        max={MAX}
                        step={STEP}
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        className="range-input range-min"
                        aria-label="Minimum price"
                    />

                    {/* Maximum handle */}
                    <input
                        type="range"
                        min={MIN}
                        max={MAX}
                        step={STEP}
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        className="range-input range-max"
                        aria-label="Maximum price"
                    />
                </div>

                <div className="range-labels">
                    <span>₹0</span>
                    <span>₹5000</span>
                </div>
            </div>

            {/* Rating */}
            <div className="filter-section">
                <h3>Minimum Rating</h3>

                {[1, 2, 3, 4, 5].map((rating) => (
                    <label
                        key={rating}
                        className="rating-item"
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
        </aside>
    );
}

export default FilterSidebar;