import React from 'react';
import { ArrowLeft, Star } from 'lucide-react';
import { Product } from '../data/products';
import VoiceAssistant from './VoiceAssistant';
import ProductGrid from './ProductGrid';

interface VoiceAssistantPageProps {
  onAddToCart: (product: Product, quantity: number, addedBy: 'voice' | 'user') => void;
  onBackToProducts: () => void;
  searchQuery: string;
}

const VoiceAssistantPage: React.FC<VoiceAssistantPageProps> = ({ 
  onAddToCart, 
  onBackToProducts, 
  searchQuery 
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={onBackToProducts}
          className="flex items-center space-x-2 text-walmart-blue hover:text-walmart-darkblue transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Products</span>
        </button>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Voice Assistant</h1>
        <p className="text-gray-600">
          Speak naturally to add items to your cart or get shopping recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Voice Assistant - Takes up 2/3 of the width */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <VoiceAssistant onAddToCart={onAddToCart} />
          </div>
        </div>

        {/* Featured Products Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                {searchQuery ? `Search Results` : 'Featured Products'}
              </h2>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Star className="h-4 w-4 text-walmart-yellow" />
                <span>Top-rated</span>
              </div>
            </div>

            <div className="space-y-4">
              <ProductGrid 
                searchQuery={searchQuery}
                onAddToCart={(product, quantity) => onAddToCart(product, quantity, 'user')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistantPage; 