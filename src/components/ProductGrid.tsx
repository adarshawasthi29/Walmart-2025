import React from 'react';
import { Star, Plus, ShoppingCart } from 'lucide-react';
import { Product, products, searchProducts } from '../data/products';

interface ProductGridProps {
  searchQuery: string;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ searchQuery, onAddToCart }) => {
  const filteredProducts = searchQuery 
    ? searchProducts(searchQuery)
    : products.slice(0, 12); // Show first 12 products by default

  const handleAddToCart = (product: Product) => {
    onAddToCart(product, 1);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          {/* Product Image */}
          <div className="relative h-48 bg-gray-100 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMzAgMTAwSDEwMFYxMzBIMTMwVjEwMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTEzMCAxMjBIMTgwVjEzMEgxMzBWMTIwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTgwIDEwMEgxNTBWMTMwSDE4MFYxMDBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0xMzAgMTMwSDE4MFYxNjBIMTMwVjEzMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTEzMCAxNjBIMTgwVjE5MEgxMzBWMTYwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTMwIDE5MEgxODBWMjAwSDEzMFYxOTBaIiBmaWxsPSIjOUNBM0FGIi8+CjwvZz4KPC9zdmc+';
              }}
            />
            {product.originalPrice && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                SALE
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-4">
            <div className="mb-2">
              <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {product.brand}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-walmart-yellow fill-current" />
                <span className="ml-1 text-sm text-gray-600">
                  {product.rating} ({product.reviewCount})
                </span>
              </div>
              <span className="ml-2 text-xs text-gray-500">
                {product.availability === 'in-stock' ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <span className="text-sm text-green-600 font-semibold">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Features */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {product.features.slice(0, 2).map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => handleAddToCart(product)}
              disabled={product.availability === 'out-of-stock'}
              className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                product.availability === 'out-of-stock'
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'walmart-button hover:bg-walmart-darkblue'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>
                {product.availability === 'out-of-stock' ? 'Out of Stock' : 'Add to Cart'}
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid; 