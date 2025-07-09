import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../App';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateItem: (productId: string, quantity: number) => void;
  onClearCart: () => void;
  total: number;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateItem,
  onClearCart,
  total
}) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5 text-walmart-blue" />
            <h2 className="text-lg font-semibold text-gray-900">
              Your Cart ({totalItems})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
              <p className="text-sm text-gray-400 mt-2">
                Add some items to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                >
                  {/* Product Image */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yOCAyMEgyNFYyOEgyOFYyMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTI4IDI0SDQwVjI4SDI4VjI0WiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNNDAgMjBIMzZWMjhINDBWMjBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yOCAyOEg0MFY0NEgyOFYyOFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                    }}
                  />

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-600">{item.product.brand}</p>
                    <p className="text-sm font-semibold text-gray-900">
                      ${item.product.price.toFixed(2)}
                    </p>
                    {item.addedBy !== 'user' && (
                      <p className="text-xs text-walmart-blue">
                        Added by {item.addedBy === 'smart-cart' ? 'Smart Cart' : 
                                item.addedBy === 'voice' ? 'Voice Assistant' : 
                                'Refill System'}
                      </p>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUpdateItem(item.product.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Minus className="h-4 w-4 text-gray-500" />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateItem(item.product.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Plus className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onUpdateItem(item.product.id, 0)}
                    className="p-1 hover:bg-red-100 rounded-full transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-lg font-bold text-walmart-blue">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button className="w-full walmart-button py-3 text-lg font-semibold">
                Checkout
              </button>
              <button
                onClick={onClearCart}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart; 