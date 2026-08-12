function SortDropdown({ sort, setSort }) {
    return (
        <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="sort-select"
            aria-label="Sort products"
        >
            <option value="">
                Sort By
            </option>

            <option value="price_asc">
                Price: Low to High
            </option>

            <option value="rating_desc">
                Top Rated First
            </option>
        </select>
    );
}

export default SortDropdown;