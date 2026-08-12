function SortDropdown({ sort, setSort }) {
    return (
        <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500"
        >
            <option value="">Sort By</option>
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