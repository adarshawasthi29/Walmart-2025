import React, { useState, useEffect } from 'react';
import { RefreshCw, Clock, ShoppingCart, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Product, getProductById } from '../data/products';
import { getRecommendedRefills, ConsumptionPattern } from '../data/userData';

interface RefillRecommendationsProps {
  onAddToCart: (product: Product, quantity: number, addedBy: 'refill') => void;
}

interface RefillItem extends ConsumptionPattern {
  daysUntilNeeded: number;
  urgency: 'urgent' | 'soon' | 'upcoming';
}

const RefillRecommendations: React.FC<RefillRecommendationsProps> = ({ onAddToCart }) => {
  const [refillItems, setRefillItems] = useState<RefillItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadRefillRecommendations();
  }, []);

  const loadRefillRecommendations = async () => {
    setIsLoading(true);
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const recommendations = getRecommendedRefills();
    const today = new Date();
    
    const refillData: RefillItem[] = recommendations.map(item => {
      const nextDate = new Date(item.nextRecommendedDate);
      const daysUntilNeeded = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      let urgency: 'urgent' | 'soon' | 'upcoming' = 'upcoming';
      if (daysUntilNeeded <= 0) urgency = 'urgent';
      else if (daysUntilNeeded <= 3) urgency = 'soon';
      
      return {
        ...item,
        daysUntilNeeded,
        urgency
      };
    });
    
    setRefillItems(refillData);
    setIsLoading(false);
  };

  const toggleItemSelection = (productId: string) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const addSingleItem = (item: RefillItem) => {
    const product = getProductById(item.productId);
    if (product) {
      onAddToCart(product, item.quantity, 'refill');
    }
  };

  const addSelectedItems = () => {
    refillItems.forEach(item => {
      if (selectedItems.has(item.productId)) {
        const product = getProductById(item.productId);
        if (product) {
          onAddToCart(product, item.quantity, 'refill');
        }
      }
    });
    setSelectedItems(new Set());
  };

  const getUrgencyColor = (urgency: 'urgent' | 'soon' | 'upcoming') => {
    switch (urgency) {
      case 'urgent': return 'text-red-600 bg-red-50';
      case 'soon': return 'text-orange-600 bg-orange-50';
      case 'upcoming': return 'text-blue-600 bg-blue-50';
    }
  };

  const getUrgencyIcon = (urgency: 'urgent' | 'soon' | 'upcoming') => {
    switch (urgency) {
      case 'urgent': return <AlertTriangle className="h-4 w-4" />;
      case 'soon': return <Clock className="h-4 w-4" />;
      case 'upcoming': return <CheckCircle className="h-4 w-4" />;
    }
  };

  const formatDaysText = (days: number) => {
    if (days <= 0) return 'Needed now';
    if (days === 1) return 'Tomorrow';
    return `${days} days`;
  };

  const selectedCount = selectedItems.size;
  const totalSelectedCost = refillItems
    .filter(item => selectedItems.has(item.productId))
    .reduce((sum, item) => {
      const product = getProductById(item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);

  return (
    <div className="walmart-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Refill Items</h3>
        <RefreshCw className="h-5 w-5 text-walmart-blue" />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-walmart-blue"></div>
          <span className="ml-2 text-gray-600">Loading recommendations...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Summary */}
          <div className="bg-walmart-lightblue rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Smart Refill System</h4>
              <TrendingUp className="h-4 w-4 text-walmart-blue" />
            </div>
            <p className="text-sm text-gray-600">
              Based on your consumption patterns, we recommend {refillItems.length} items for refill.
            </p>
          </div>

          {/* Refill Items */}
          {refillItems.length > 0 ? (
            <div className="space-y-3">
              {refillItems.map((item) => {
                const product = getProductById(item.productId);
                if (!product) return null;

                const isSelected = selectedItems.has(item.productId);
                
                return (
                  <div
                    key={item.productId}
                    className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                      isSelected 
                        ? 'border-walmart-blue bg-walmart-lightblue' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => toggleItemSelection(item.productId)}
                  >
                    <div className="flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleItemSelection(item.productId)}
                        className="w-4 h-4 text-walmart-blue rounded border-gray-300 focus:ring-walmart-blue"
                      />
                    </div>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA1NiA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAyMEgyMFYyNEgyNFYyMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTI0IDIySzM2VjI0SDI0VjIyWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMzYgMjBIMzJWMjRIMzZWMjBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yNCAyNEgzNlYzNkgyNFYyNFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="font-medium text-gray-900 truncate">
                          {product.name}
                        </h5>
                        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getUrgencyColor(item.urgency)}`}>
                          {getUrgencyIcon(item.urgency)}
                          <span className="capitalize">{item.urgency}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-1">
                        Usually consumed every {item.averageConsumptionDays} days
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="font-semibold text-gray-900">
                          ${(product.price * item.quantity).toFixed(2)}
                        </span>
                        <span className="text-gray-600">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-gray-600">
                          {formatDaysText(item.daysUntilNeeded)}
                        </span>
                        <span className="text-gray-600">
                          {Math.round(item.confidence * 100)}% confidence
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addSingleItem(item);
                      }}
                      className="walmart-button-secondary flex items-center space-x-1 px-3 py-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add</span>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <RefreshCw className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No refill items needed at this time</p>
              <p className="text-sm mt-2">Check back later for recommendations</p>
            </div>
          )}

          {/* Action Buttons */}
          {refillItems.length > 0 && (
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span>{selectedCount} items selected</span>
                {selectedCount > 0 && (
                  <span className="font-semibold">
                    Total: ${totalSelectedCost.toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={addSelectedItems}
                  disabled={selectedCount === 0}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                    selectedCount > 0 
                      ? 'walmart-button' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add Selected ({selectedCount})</span>
                </button>
                
                <button
                  onClick={loadRefillRecommendations}
                  className="walmart-button-secondary flex items-center space-x-1 px-4 py-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Refresh</span>
                </button>
              </div>
            </div>
          )}

          {/* How it works */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">How Refill Works:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• AI tracks your household consumption patterns</li>
              <li>• Predicts when you'll run out of items</li>
              <li>• Suggests refills before you need them</li>
              <li>• Learns from your purchasing behavior</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default RefillRecommendations; 