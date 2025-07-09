import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Mic, Camera, User, Star, RefreshCw, Sparkles, ArrowLeft } from 'lucide-react';
import { Product } from './data/products';
import { userData, updateUserSavings } from './data/userData';
import SmartCartManager from './components/SmartCartManager';
import VoiceAssistant from './components/VoiceAssistant';
import ImageUpload from './components/ImageUpload';
import RefillRecommendations from './components/RefillRecommendations';
import SavingsTracker from './components/SavingsTracker';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import SmartCartPage from './components/SmartCartPage';
import VoiceAssistantPage from './components/VoiceAssistantPage';
import ImageSearchPage from './components/ImageSearchPage';
import RefillPage from './components/RefillPage';

export interface CartItem {
  product: Product;
  quantity: number;
  addedBy: 'user' | 'smart-cart' | 'voice' | 'image' | 'refill';
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<'products' | 'cart' | 'smart-cart' | 'voice' | 'image' | 'refill'>('products');

  const addToCart = (product: Product, quantity: number = 1, addedBy: CartItem['addedBy'] = 'user') => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      let newItems;
      if (existingItem) {
        newItems = prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prev, { product, quantity, addedBy }];
      }
      
      // Switch to cart view when items are added via AI features
      if (addedBy !== 'user') {
        setCurrentView('cart');
      }
      
      return newItems;
    });
  };

  const updateCartItem = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.product.id !== productId));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setCurrentView('products');
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate current order savings
  const currentOrderSavings = cartItems.reduce((total, item) => {
    const originalPrice = item.product.originalPrice || item.product.price * 1.1;
    return total + ((originalPrice - item.product.price) * item.quantity);
  }, 0);

  // Update user savings when cart changes
  useEffect(() => {
    updateUserSavings(currentOrderSavings);
  }, [currentOrderSavings]);

  // Navigation functions
  const navigateToSmartCart = () => setCurrentView('smart-cart');
  const navigateToVoice = () => setCurrentView('voice');
  const navigateToImage = () => setCurrentView('image');
  const navigateToRefill = () => setCurrentView('refill');
  const navigateToProducts = () => setCurrentView('products');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-walmart-blue text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">Walmart</h1>
              <span className="ml-2 text-walmart-yellow text-sm">Smart Cart</span>
            </div>

            {/* Search Bar - Only show in products view */}
            {currentView === 'products' && (
              <div className="flex-1 max-w-2xl mx-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-walmart-yellow text-gray-900"
                  />
                </div>
              </div>
            )}

            {/* Page Titles */}
            {currentView === 'cart' && (
              <div className="flex-1 flex items-center justify-center">
                <h2 className="text-xl font-semibold">Your Smart Cart ({cartCount} items)</h2>
              </div>
            )}
            {currentView === 'smart-cart' && (
              <div className="flex-1 flex items-center justify-center">
                <h2 className="text-xl font-semibold">Smart Cart</h2>
              </div>
            )}
            {currentView === 'voice' && (
              <div className="flex-1 flex items-center justify-center">
                <h2 className="text-xl font-semibold">Voice Assistant</h2>
              </div>
            )}
            {currentView === 'image' && (
              <div className="flex-1 flex items-center justify-center">
                <h2 className="text-xl font-semibold">Image Search</h2>
              </div>
            )}
            {currentView === 'refill' && (
              <div className="flex-1 flex items-center justify-center">
                <h2 className="text-xl font-semibold">Refill Items</h2>
              </div>
            )}

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-sm">
                <User className="h-4 w-4" />
                <span>Hi, {userData.name}</span>
              </div>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-walmart-darkblue rounded-full transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-walmart-yellow text-walmart-blue text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Smart Features Navigation Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Back Button - Show when not on products page */}
            {currentView !== 'products' && (
              <button
                onClick={navigateToProducts}
                className="flex items-center space-x-2 text-walmart-blue hover:text-walmart-darkblue transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Products</span>
              </button>
            )}

            {/* Smart Features Navigation */}
            <div className={`flex items-center space-x-6 ${currentView !== 'products' ? 'flex-1 justify-center' : 'justify-center w-full'}`}>
              <button
                onClick={navigateToSmartCart}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                  currentView === 'smart-cart' 
                    ? 'bg-walmart-blue text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Sparkles className="h-5 w-5" />
                <span>Smart Cart</span>
              </button>

              <button
                onClick={navigateToVoice}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                  currentView === 'voice' 
                    ? 'bg-walmart-blue text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Mic className="h-5 w-5" />
                <span>Voice Assistant</span>
              </button>

              <button
                onClick={navigateToImage}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                  currentView === 'image' 
                    ? 'bg-walmart-blue text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Camera className="h-5 w-5" />
                <span>Image Search</span>
              </button>

              <button
                onClick={navigateToRefill}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                  currentView === 'refill' 
                    ? 'bg-walmart-blue text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <RefreshCw className="h-5 w-5" />
                <span>Refill Items</span>
              </button>
            </div>

            {/* View Cart Button - Only show when we have cart items and on products page */}
            {cartCount > 0 && currentView === 'products' && (
              <button
                onClick={() => setCurrentView('cart')}
                className="flex items-center space-x-2 bg-walmart-blue text-white px-4 py-2 rounded-full hover:bg-walmart-darkblue transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>View Cart ({cartCount})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="min-h-screen">
        {/* Products View */}
        {currentView === 'products' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left Sidebar - Savings Tracker */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <SavingsTracker />
                </div>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Products'}
                    </h2>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Star className="h-4 w-4 text-walmart-yellow" />
                      <span>Showing top-rated products</span>
                    </div>
                  </div>

                  <ProductGrid 
                    searchQuery={searchQuery}
                    onAddToCart={addToCart}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Smart Cart Page */}
        {currentView === 'smart-cart' && (
          <SmartCartPage
            onAddToCart={addToCart}
            onBackToProducts={navigateToProducts}
            searchQuery={searchQuery}
          />
        )}

        {/* Voice Assistant Page */}
        {currentView === 'voice' && (
          <VoiceAssistantPage
            onAddToCart={addToCart}
            onBackToProducts={navigateToProducts}
            searchQuery={searchQuery}
          />
        )}

        {/* Image Search Page */}
        {currentView === 'image' && (
          <ImageSearchPage
            onAddToCart={addToCart}
            onBackToProducts={navigateToProducts}
            searchQuery={searchQuery}
          />
        )}

        {/* Refill Page */}
        {currentView === 'refill' && (
          <RefillPage
            onAddToCart={addToCart}
            onBackToProducts={navigateToProducts}
            searchQuery={searchQuery}
          />
        )}

        {/* Cart View */}
        {currentView === 'cart' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
                <div className="text-right">
                  <p className="text-2xl font-bold text-walmart-blue">
                    ${cartTotal.toFixed(2)}
                  </p>
                  <p className="text-sm text-green-600">
                    You saved ${currentOrderSavings.toFixed(2)}
                  </p>
                </div>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-600 mb-4">Use our smart features to add items or browse products</p>
                  <button
                    onClick={navigateToProducts}
                    className="walmart-button"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Cart Items */}
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMiAyNEgyOFYzMkgzMlYyNFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTMyIDI4SDUyVjMySDMyVjI4WiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNNTIgMjRINDhWMzJINTJWMjRaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0zMiAzMkg1MlY1NkgzMlYzMloiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                        }}
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">{item.product.brand}</p>
                        <p className="text-lg font-bold text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        {item.addedBy !== 'user' && (
                          <p className="text-xs text-walmart-blue bg-walmart-lightblue px-2 py-1 rounded inline-block mt-1">
                            Added by {item.addedBy === 'smart-cart' ? 'Smart Cart' : 
                                    item.addedBy === 'voice' ? 'Voice Assistant' : 
                                    item.addedBy === 'image' ? 'Image Search' :
                                    item.addedBy === 'refill' ? 'Refill System' : ''}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateCartItem(item.product.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-semibold text-lg">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartItem(item.product.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => updateCartItem(item.product.id, 0)}
                        className="p-2 hover:bg-red-100 text-red-500 rounded-full transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  {/* Cart Summary */}
                  <div className="border-t pt-6 mt-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                          <span>You Saved:</span>
                          <span>-${currentOrderSavings.toFixed(2)}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span>${cartTotal.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <div className="mt-6 space-y-3">
                        <button className="w-full walmart-button py-3 text-lg font-semibold">
                          Proceed to Checkout
                        </button>
                        <button
                          onClick={clearCart}
                          className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition-colors"
                        >
                          Clear Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateItem={updateCartItem}
        onClearCart={clearCart}
        total={cartTotal}
      />
    </div>
  );
}

export default App;
