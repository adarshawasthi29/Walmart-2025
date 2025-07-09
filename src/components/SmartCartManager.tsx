import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, DollarSign, Star, ShoppingCart, AlertCircle, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react';
import { Product, products } from '../data/products';
import { userData, updateUserSavings } from '../data/userData';

interface SmartCartManagerProps {
  onAddToCart: (product: Product, quantity: number, addedBy: 'smart-cart') => void;
}

interface SmartCartItem {
  product: Product;
  quantity: number;
  reason: string;
  savings: number;
  alternatives: Product[];
}

// Default combinations for quick testing
const DEFAULT_COMBINATIONS = [
  { name: 'Weekly Essentials', items: 'milk, bread, eggs, chicken, bananas', budget: 50 },
  { name: 'Indian Dinner', items: 'rice, chicken, onions, garlic, garam masala, coconut milk', budget: 30 },
  { name: 'Breakfast Favorites', items: 'eggs, bread, milk, bananas, yogurt', budget: 25 },
  { name: 'Pasta Night', items: 'pasta, tomatoes, garlic, olive oil, ground beef', budget: 20 },
  { name: 'Healthy Snacks', items: 'yogurt, bananas, eggs, milk', budget: 15 },
  { name: 'Household Basics', items: 'paper towels, detergent, toilet paper, cleaner', budget: 80 },
];

const SmartCartManager: React.FC<SmartCartManagerProps> = ({ onAddToCart }) => {
  const [itemList, setItemList] = useState('');
  const [budget, setBudget] = useState<number>(100);
  const [recommendations, setRecommendations] = useState<SmartCartItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shuffleIndex, setShuffleIndex] = useState(0);

  const findAlternatives = (selectedProduct: Product, allProducts: Product[]): Product[] => {
    // Hardcoded alternatives for demo purposes to ensure relevant suggestions
    const hardcodedAlternatives: { [key: string]: string[] } = {
      // Milk alternatives
      '1': ['46', '47', '48'], // Great Value Whole Milk → Organic Valley Whole, 1% Low Fat, Skim Fat Free
      '46': ['1', '47', '49'], // Milk Whole Organic → Great Value Whole, 1% Low Fat, Oat Milk
      '47': ['1', '46', '48'], // Milk 1% Low Fat → Great Value Whole, Organic Valley Whole, Skim Fat Free
      '48': ['1', '46', '47'], // Milk Skim Fat Free → Great Value Whole, Organic Valley Whole, 1% Low Fat
      '49': ['46', '50', '1'], // Oat Milk Original → Organic Valley Whole, Soy Milk, Great Value Whole
      '50': ['49', '46', '1'], // Soy Milk Unsweetened → Oat Milk, Organic Valley Whole, Great Value Whole
      '29': ['49', '50', '46'], // Almond Milk Unsweetened → Oat Milk, Soy Milk, Organic Valley Whole
      '30': ['1', '46', '47'], // Milk 2% Reduced Fat → Great Value Whole, Organic Valley Whole, 1% Low Fat
      
      // Yogurt alternatives
      '6': ['41', '42', '43'], // Yogurt Plain Greek (Fage) → Chobani Vanilla, Oikos Strawberry, Yoplait Regular
      '41': ['6', '42', '45'], // Greek Yogurt Vanilla (Chobani) → Fage Plain, Oikos Strawberry, Stonyfield Organic
      '42': ['6', '41', '44'], // Greek Yogurt Strawberry (Oikos) → Fage Plain, Chobani Vanilla, Dannon Blueberry
      '43': ['6', '41', '44'], // Yogurt Regular Vanilla (Yoplait) → Fage Plain, Chobani Vanilla, Dannon Blueberry
      '44': ['42', '43', '45'], // Yogurt Low Fat Blueberry (Dannon) → Oikos Strawberry, Yoplait Regular, Stonyfield Organic
      '45': ['6', '41', '44'], // Greek Yogurt Plain Organic (Stonyfield) → Fage Plain, Chobani Vanilla, Dannon Blueberry
      
      // Bread alternatives
      '19': ['51', '52', '53'], // Bread Whole Wheat → Sourdough, Honey Wheat, Rye Dark
      '51': ['19', '52', '54'], // Bread Sourdough → Whole Wheat, Honey Wheat, Gluten Free
      '52': ['19', '51', '53'], // Bread Honey Wheat → Whole Wheat, Sourdough, Rye Dark
      '53': ['51', '52', '54'], // Bread Rye Dark → Sourdough, Honey Wheat, Gluten Free
      '54': ['19', '51', '52'], // Bread Gluten Free → Whole Wheat, Sourdough, Honey Wheat
      '31': ['19', '51', '32'], // Bread White Wonder → Whole Wheat, Sourdough, Multigrain
      '32': ['19', '51', '31'], // Bread Multigrain → Whole Wheat, Sourdough, White Wonder
      
      // Egg alternatives
      '20': ['55', '56', '57'], // Eggs Large Grade A → Extra Large, Cage Free, Pasture Raised
      '55': ['20', '56', '57'], // Eggs Extra Large → Large Grade A, Cage Free, Pasture Raised
      '56': ['20', '55', '57'], // Eggs Cage Free → Large Grade A, Extra Large, Pasture Raised
      '57': ['20', '55', '56'], // Eggs Pasture Raised → Large Grade A, Extra Large, Cage Free
      '33': ['20', '55', '34'], // Eggs Organic Free Range → Large Grade A, Extra Large, Brown Large
      '34': ['20', '33', '55'], // Eggs Brown Large → Large Grade A, Organic Free Range, Extra Large
      
      // Chicken alternatives
      '3': ['35', '36', '60'], // Boneless Chicken Breast → Organic, Thighs Boneless, Wings Fresh
      '35': ['3', '36', '61'], // Chicken Breast Organic → Boneless Chicken Breast, Thighs Boneless, Drumsticks
      '36': ['3', '35', '60'], // Chicken Thighs Boneless → Boneless Chicken Breast, Organic, Wings Fresh
      '60': ['3', '35', '61'], // Chicken Wings Fresh → Boneless Chicken Breast, Organic, Drumsticks
      '61': ['3', '35', '60'], // Chicken Drumsticks → Boneless Chicken Breast, Organic, Wings Fresh
      
      // Rice alternatives
      '4': ['37', '38', '58'], // Basmati Rice → Jasmine, Brown Long Grain, Arborio
      '37': ['4', '38', '59'], // Rice Jasmine → Basmati, Brown Long Grain, Wild Blend
      '38': ['4', '37', '58'], // Rice Brown Long Grain → Basmati, Jasmine, Arborio
      '58': ['4', '37', '59'], // Rice Arborio → Basmati, Jasmine, Wild Blend
      '59': ['4', '37', '38'], // Rice Wild Blend → Basmati, Jasmine, Brown Long Grain
      
      // Pasta alternatives
      '23': ['39', '40', '62'], // Pasta Spaghetti → Penne, Whole Wheat, Linguine
      '39': ['23', '40', '63'], // Pasta Penne → Spaghetti, Whole Wheat, Rigatoni
      '40': ['23', '39', '62'], // Pasta Whole Wheat → Spaghetti, Penne, Linguine
      '62': ['23', '39', '63'], // Pasta Linguine → Spaghetti, Penne, Rigatoni
      '63': ['23', '39', '62'], // Pasta Rigatoni → Spaghetti, Penne, Linguine
      
      // Coconut milk alternatives
      '10': ['27', '28', '29'], // Coconut Milk → Organic, Light, Almond Milk
      '27': ['10', '28', '49'], // Coconut Milk Organic → Regular, Light, Oat Milk
      '28': ['10', '27', '50'], // Coconut Milk Light → Regular, Organic, Soy Milk
      
      // Default alternatives for other products
      '2': ['1', '46', '47'], // Bananas → Great Value Whole Milk, Organic Valley Whole, 1% Low Fat
      '5': ['7', '8', '24'], // Garam Masala Spice → Onions Yellow, Garlic Fresh, Olive Oil
      '7': ['8', '5', '24'], // Onions Yellow → Garlic Fresh, Garam Masala, Olive Oil
      '8': ['7', '5', '24'], // Garlic Fresh → Onions Yellow, Garam Masala, Olive Oil
      '9': ['7', '8', '22'], // Tomatoes Diced Canned → Onions Yellow, Garlic Fresh, Potatoes Russet
      '21': ['3', '35', '36'], // Ground Beef 80/20 → Boneless Chicken Breast, Chicken Breast Organic, Chicken Thighs
      '22': ['7', '8', '9'], // Potatoes Russet → Onions Yellow, Garlic Fresh, Tomatoes Diced
      '24': ['5', '7', '8'], // Olive Oil Extra Virgin → Garam Masala, Onions Yellow, Garlic Fresh
    };

    // Get the alternative product IDs for the selected product
    const alternativeIds = hardcodedAlternatives[selectedProduct.id] || [];
    
    // Find the actual products from the IDs
    const alternatives = alternativeIds
      .map(id => allProducts.find(product => product.id === id))
      .filter(product => product && product.availability === 'in-stock') // Only include in-stock products
      .slice(0, 3); // Limit to 3 alternatives

    return alternatives as Product[];
  };

  const generateSmartCart = async (useAlternativeLogic: boolean = false) => {
    if (!itemList.trim()) {
      setError('Please enter a list of items');
      return;
    }

    setIsGenerating(true);
    setError(null);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const items = itemList.split(',').map(item => item.trim()).filter(item => item);
      const smartItems: SmartCartItem[] = [];
      let totalCost = 0;

      items.forEach(itemName => {
        // Find matching products
        const matchingProducts = products.filter(product => 
          product.name.toLowerCase().includes(itemName.toLowerCase()) ||
          product.tags.some(tag => tag.toLowerCase().includes(itemName.toLowerCase())) ||
          product.description.toLowerCase().includes(itemName.toLowerCase())
        );

        if (matchingProducts.length > 0) {
          // Different sorting logic for shuffle
          let sortedProducts;
          if (useAlternativeLogic) {
            // Alternative logic: prioritize different factors
            const sortingMethods = [
              // Method 1: Price efficiency
              (a: Product, b: Product) => (a.price / a.rating) - (b.price / b.rating),
              // Method 2: Rating first
              (a: Product, b: Product) => b.rating - a.rating,
              // Method 3: Mixed with randomness
              (a: Product, b: Product) => (b.rating * 0.6 + Math.random() * 0.4) - (a.rating * 0.6 + Math.random() * 0.4),
              // Method 4: Savings prioritized
              (a: Product, b: Product) => {
                const aSavings = (a.originalPrice || a.price * 1.1) - a.price;
                const bSavings = (b.originalPrice || b.price * 1.1) - b.price;
                return bSavings - aSavings;
              }
            ];
            
            const methodIndex = (shuffleIndex + items.indexOf(itemName)) % sortingMethods.length;
            sortedProducts = [...matchingProducts].sort(sortingMethods[methodIndex]);
          } else {
            // Original logic
            sortedProducts = matchingProducts.sort((a, b) => {
            const aScore = (a.rating * 0.7) + ((1 / a.price) * 0.3);
            const bScore = (b.rating * 0.7) + ((1 / b.price) * 0.3);
            return bScore - aScore;
          });
          }

          const selectedProduct = sortedProducts[0];
          const originalPrice = selectedProduct.originalPrice || selectedProduct.price * 1.1;
          const savings = originalPrice - selectedProduct.price;

                      if (totalCost + selectedProduct.price <= budget) {
              // Find alternatives for the same product type
              const alternatives = findAlternatives(selectedProduct, products);
              
            smartItems.push({
              product: selectedProduct,
              quantity: 1,
              reason: useAlternativeLogic ? 
                `Smart pick (${selectedProduct.rating}★) - ${selectedProduct.features[0]}` :
                `Best rated (${selectedProduct.rating}★) within budget`,
              savings: savings,
              alternatives: alternatives
            });
            totalCost += selectedProduct.price;
          }
        }
      });

      // Add complementary items if budget allows
      if (totalCost < budget * 0.8) {
        const remainingBudget = budget - totalCost;
        const existingIds = smartItems.map(item => item.product.id);
        
        const complementaryItems = products.filter(product => 
          product.price <= remainingBudget && 
          product.rating >= 4.0 &&
          !existingIds.includes(product.id) &&
          product.availability === 'in-stock'
        );

        // Different complementary selection logic
        const selectedComplementary = useAlternativeLogic ?
          complementaryItems.sort(() => Math.random() - 0.5).slice(0, 2) :
          complementaryItems.sort((a, b) => b.rating - a.rating).slice(0, 3);

        selectedComplementary.forEach(product => {
          const originalPrice = product.originalPrice || product.price * 1.1;
          const savings = originalPrice - product.price;
          // For complementary items, use general category alternatives
                        const alternatives = findAlternatives(product, products);
          
          smartItems.push({
            product,
            quantity: 1,
            reason: useAlternativeLogic ? 
              'Recommended complement' : 
              'Highly rated complement to your list',
            savings: savings,
            alternatives: alternatives
          });
        });
      }

      setRecommendations(smartItems);
    } catch (err) {
      setError('Failed to generate smart cart. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const shuffleCart = () => {
    setShuffleIndex(prev => prev + 1);
    generateSmartCart(true);
  };

  const loadDefaultCombination = (combination: typeof DEFAULT_COMBINATIONS[0]) => {
    setItemList(combination.items);
    setBudget(combination.budget);
    setError(null);
  };

  const replaceProduct = (currentProduct: Product, newProduct: Product) => {
    setRecommendations(prev => 
      prev.map(item => 
        item.product.id === currentProduct.id 
                          ? { ...item, product: newProduct, alternatives: findAlternatives(newProduct, products) }
          : item
      )
    );
  };

  const addAllToCart = () => {
    const totalSavings = recommendations.reduce((sum, item) => sum + item.savings, 0);
    
    recommendations.forEach(item => {
      onAddToCart(item.product, item.quantity, 'smart-cart');
    });

    updateUserSavings(totalSavings);
    setRecommendations([]);
    setItemList('');
  };

  const addSingleToCart = (item: SmartCartItem) => {
    onAddToCart(item.product, item.quantity, 'smart-cart');
    updateUserSavings(item.savings);
    setRecommendations(prev => prev.filter(rec => rec.product.id !== item.product.id));
  };

  const totalCost = recommendations.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalSavings = recommendations.reduce((sum, item) => sum + item.savings, 0);

  return (
    <div className="walmart-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Smart Cart</h3>
        <Sparkles className="h-5 w-5 text-walmart-blue" />
      </div>

      {/* Quick Start Options */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Start Options</h4>
        <div className="grid grid-cols-2 gap-2">
          {DEFAULT_COMBINATIONS.map((combo, index) => (
            <button
              key={index}
              onClick={() => loadDefaultCombination(combo)}
              className="p-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-left"
            >
              <div className="font-medium">{combo.name}</div>
              <div className="text-gray-600">${combo.budget}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Shopping List
          </label>
          <textarea
            value={itemList}
            onChange={(e) => setItemList(e.target.value)}
            placeholder="Enter items separated by commas (e.g., milk, bread, chicken, rice)"
            className="walmart-input w-full h-20 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="walmart-input pl-10 w-full"
              min="10"
              step="10"
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => generateSmartCart()}
            disabled={isGenerating}
            className="flex-1 walmart-button flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Generate Smart Cart</span>
              </>
            )}
          </button>
          
          {recommendations.length > 0 && (
            <button
              onClick={shuffleCart}
              className="walmart-button-secondary flex items-center space-x-1"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Shuffle</span>
            </button>
          )}
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Smart Recommendations</h4>
            <div className="text-sm text-gray-600">
              ${totalCost.toFixed(2)} / ${budget.toFixed(2)}
            </div>
          </div>

          <div className="space-y-4">
            {recommendations.map((item) => (
              <div key={item.product.id} className="border border-gray-200 rounded-lg p-4">
                {/* Main Product */}
                <div className="flex items-start space-x-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNiAyMEgyMlYyOEgyNlYyMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTI2IDI0SDQ0VjI2SDI2VjI0WiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNNDQgMjBINDBWMjhINDRWMjBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yNiAyOEg0NFY0NEgyNlYyOFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                    }}
                  />
                  
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 mb-1">{item.product.name}</h5>
                    <p className="text-sm text-gray-600 mb-2">{item.reason}</p>
                    
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-walmart-yellow fill-current" />
                        <span className="text-sm text-gray-600">{item.product.rating}</span>
                      </div>
                      <span className="text-sm text-green-600">
                      Save ${item.savings.toFixed(2)}
                    </span>
                      <span className="text-lg font-bold text-gray-900">
                        ${item.product.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Reviews Summary */}
                    {item.product.reviews && (
                      <div className="space-y-2 mb-3">
                        <div className="flex items-start space-x-2">
                          <ThumbsUp className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-gray-700">{item.product.reviews.positive}</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <ThumbsDown className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-gray-700">{item.product.reviews.negative}</p>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => addSingleToCart(item)}
                      className="walmart-button text-sm px-4 py-2 flex items-center space-x-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>

                {/* Alternative Options */}
                {item.alternatives.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h6 className="text-sm font-medium text-gray-700 mb-2">Alternative Options:</h6>
                    <div className="grid grid-cols-1 gap-2">
                      {item.alternatives.map((alt) => (
                        <div key={alt.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-2">
                            <img
                              src={alt.image}
                              alt={alt.name}
                              className="w-8 h-8 object-cover rounded"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMyAxMEgxMVYxNEgxM1YxMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTEzIDEySDIyVjEzSDEzVjEyWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMjIgMTBIMjBWMTRIMjJWMTBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0xMyAxNEgyMlYyMkgxM1YxNFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                              }}
                            />
                            <div>
                              <p className="text-xs font-medium text-gray-900">{alt.name}</p>
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 text-walmart-yellow fill-current" />
                                <span className="text-xs text-gray-600">{alt.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-semibold">${alt.price.toFixed(2)}</span>
                  <button
                              onClick={() => replaceProduct(item.product, alt)}
                              className="text-xs text-walmart-blue hover:text-walmart-darkblue"
                  >
                              Switch
                  </button>
                </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-4 p-4 bg-walmart-lightblue rounded-lg">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Total Cost:</span>
              <span className="font-semibold">${totalCost.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Total Savings:</span>
              <span className="font-semibold text-green-600">${totalSavings.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Budget Remaining:</span>
              <span className="font-semibold">${(budget - totalCost).toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={addAllToCart}
            className="w-full walmart-button mt-4 flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add All to Cart</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SmartCartManager; 