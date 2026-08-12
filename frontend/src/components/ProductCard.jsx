function ProductCard({ product }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
            <img
                src={product.image}
                alt={product.name}
                className="h-52 w-full object-cover"
            />

            <div className="p-5">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {product.name}
                </h3>

                <p className="mb-3 text-sm text-gray-500">
                    {product.category}
                </p>

                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                        ₹{product.price}
                    </span>

                    <span className="font-medium text-yellow-500">
                        ★ {product.rating}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;