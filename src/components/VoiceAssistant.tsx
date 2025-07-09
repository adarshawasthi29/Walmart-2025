import React, { useState, useEffect } from 'react';
import { Mic, MicOff, MessageSquare, ShoppingCart, Volume2, AlertCircle } from 'lucide-react';
import { Product, products, getProductById } from '../data/products';
import { parseRecipeCommand, getRecipeIngredients } from '../data/recipes';

interface VoiceAssistantProps {
  onAddToCart: (product: Product, quantity: number, addedBy: 'voice') => void;
}

interface VoiceCommand {
  text: string;
  timestamp: Date;
  response: string;
  products?: Product[];
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onAddToCart }) => {
  const [isListening, setIsListening] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commands, setCommands] = useState<VoiceCommand[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulated speech recognition
  const startListening = () => {
    setIsListening(true);
    setError(null);
    setCurrentCommand('');
    
    // Simulate voice input with a typing effect
    const exampleCommands = [
      'Add ingredients for chicken tikka masala for 5 people',
      'Add ingredients for chicken tikka masala for 4 people', 
      'Add ingredients for chicken tikka masala for 6 people',
      'Add items for pasta dinner for 4 people',
      'Add milk and bananas to my cart',
      'Find the best rated paper towels',
      'Show me electronics under 500 dollars'
    ];
    
    // Prioritize chicken tikka masala commands (60% chance)
    const randomValue = Math.random();
    let selectedCommand: string;
    
    if (randomValue < 0.6) {
      // 60% chance of chicken tikka masala commands
      const tikkaCommands = exampleCommands.filter(cmd => cmd.includes('chicken tikka masala'));
      selectedCommand = tikkaCommands[Math.floor(Math.random() * tikkaCommands.length)] || exampleCommands[0];
    } else {
      // 40% chance of other commands
      selectedCommand = exampleCommands[Math.floor(Math.random() * exampleCommands.length)];
    }
    
    // Simulate typing
    let currentText = '';
    const typingInterval = setInterval(() => {
      if (currentText.length < selectedCommand.length) {
        currentText += selectedCommand[currentText.length];
        setCurrentCommand(currentText);
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setIsListening(false);
          processCommand(currentText);
        }, 1000);
      }
    }, 100);
  };

  const stopListening = () => {
    setIsListening(false);
    if (currentCommand.trim()) {
      processCommand(currentCommand);
    }
  };

  const processCommand = async (command: string) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate AI processing
      
      const lowerCommand = command.toLowerCase();
      let response = '';
      let foundProducts: Product[] = [];

      // Enhanced recipe-based commands with better pattern matching
      
      // First, try to parse the recipe command
      const recipeInfo = parseRecipeCommand(command);
      
      // Hardcoded chicken tikka masala for demo purposes
      if (lowerCommand.includes('chicken tikka masala') || lowerCommand.includes('tikka masala')) {
        const servingsMatch = command.match(/(\d+)\s+people?/);
        const servings = servingsMatch ? parseInt(servingsMatch[1]) : 4;
        
        // Hardcoded chicken tikka masala ingredients with product IDs
        const chickenTikkaIngredients = [
          { productId: '3', name: 'Boneless Chicken Breast', amount: Math.ceil(2 * (servings / 4)) },
          { productId: '4', name: 'Basmati Rice', amount: Math.ceil(2 * (servings / 4)) },
          { productId: '6', name: 'Plain Greek Yogurt', amount: 1 },
          { productId: '9', name: 'Diced Tomatoes', amount: 1 },
          { productId: '10', name: 'Coconut Milk', amount: 1 },
          { productId: '7', name: 'Yellow Onions', amount: Math.ceil(2 * (servings / 4)) },
          { productId: '8', name: 'Fresh Garlic', amount: 1 },
          { productId: '5', name: 'Garam Masala', amount: 1 }
        ];
        
        const recipeProducts: Product[] = [];
        chickenTikkaIngredients.forEach(ingredient => {
          const product = getProductById(ingredient.productId);
          if (product) {
            recipeProducts.push(product);
            onAddToCart(product, ingredient.amount, 'voice');
          }
        });
        
        foundProducts = recipeProducts;
        response = `Perfect! I've added ${recipeProducts.length} ingredients for Chicken Tikka Masala for ${servings} people to your cart. Items added: ${recipeProducts.map(p => p.name).join(', ')}.`;
      }
      // Try the regular recipe parsing
      else if (recipeInfo) {
        const ingredients = getRecipeIngredients(recipeInfo.recipeName, recipeInfo.servings);
        const recipeProducts: Product[] = [];
        
        ingredients.forEach(ingredient => {
          if (ingredient.productId) {
            const product = getProductById(ingredient.productId);
            if (product) {
              recipeProducts.push(product);
              onAddToCart(product, Math.ceil(ingredient.amount), 'voice');
            }
          }
        });
        
        foundProducts = recipeProducts;
        response = `I've added ${recipeProducts.length} ingredients for ${recipeInfo.recipeName} for ${recipeInfo.servings} people to your cart. Total items: ${recipeProducts.length}.`;
      }
      // Enhanced pasta command handling (more flexible)
      else if (lowerCommand.includes('pasta') && (
        lowerCommand.includes('dinner') || 
        lowerCommand.includes('marinara') || 
        lowerCommand.includes('ingredients') || 
        lowerCommand.includes('recipe') ||
        lowerCommand.includes('people') ||
        (lowerCommand.includes('add') && lowerCommand.includes('pasta'))
      )) {
        const servingsMatch = command.match(/(\d+)\s+people?/);
        const servings = servingsMatch ? parseInt(servingsMatch[1]) : 4;
        
        // Hardcoded pasta marinara ingredients
        const pastaIngredients = [
          { productId: '23', name: 'Pasta Spaghetti', amount: 1 },
          { productId: '9', name: 'Diced Tomatoes', amount: 2 },
          { productId: '7', name: 'Yellow Onions', amount: 1 },
          { productId: '8', name: 'Fresh Garlic', amount: 1 },
          { productId: '24', name: 'Olive Oil Extra Virgin', amount: 1 }
        ];
        
        const recipeProducts: Product[] = [];
        pastaIngredients.forEach(ingredient => {
          const product = getProductById(ingredient.productId);
          if (product) {
            recipeProducts.push(product);
            onAddToCart(product, ingredient.amount, 'voice');
          }
        });
        
        foundProducts = recipeProducts;
        response = `Great! I've added ${recipeProducts.length} ingredients for Pasta Marinara for ${servings} people to your cart. Items added: ${recipeProducts.map(p => p.name).join(', ')}. Note: Some ingredients like tomatoes, onions, and garlic are shared between recipes.`;
      }
      // Direct product search
      else if (lowerCommand.includes('add') || lowerCommand.includes('find')) {
        const searchTerms = extractProductNames(command);
        const matchedProducts: Product[] = [];
        
        searchTerms.forEach(term => {
          const matches = products.filter(product => 
            product.name.toLowerCase().includes(term) ||
            product.tags.some(tag => tag.toLowerCase().includes(term)) ||
            product.description.toLowerCase().includes(term)
          );
          
          if (matches.length > 0) {
            // Get the best match (highest rating)
            const bestMatch = matches.sort((a, b) => b.rating - a.rating)[0];
            matchedProducts.push(bestMatch);
            
            if (lowerCommand.includes('add')) {
              onAddToCart(bestMatch, 1, 'voice');
            }
          }
        });
        
        foundProducts = matchedProducts;
        
        if (lowerCommand.includes('add')) {
          response = matchedProducts.length > 0 
            ? `I've added ${matchedProducts.length} items to your cart: ${matchedProducts.map(p => p.name).join(', ')}.`
            : 'Sorry, I couldn\'t find any matching products to add to your cart.';
        } else {
          response = matchedProducts.length > 0 
            ? `I found ${matchedProducts.length} products: ${matchedProducts.map(p => p.name).join(', ')}.`
            : 'Sorry, I couldn\'t find any matching products.';
        }
      }
      // Budget-based search
      else if (lowerCommand.includes('under') && lowerCommand.includes('dollar')) {
        const budgetMatch = command.match(/under (\d+)/);
        if (budgetMatch) {
          const budget = parseInt(budgetMatch[1]);
          const affordableProducts = products.filter(product => product.price <= budget)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 5);
          
          foundProducts = affordableProducts;
          response = `I found ${affordableProducts.length} highly rated products under $${budget}: ${affordableProducts.map(p => p.name).join(', ')}.`;
        }
      }
      // General search
      else {
        const searchResults = products.filter(product => {
          const terms = command.toLowerCase().split(' ');
          return terms.some(term => 
            product.name.toLowerCase().includes(term) ||
            product.tags.some(tag => tag.toLowerCase().includes(term))
          );
        }).slice(0, 3);
        
        foundProducts = searchResults;
        response = searchResults.length > 0 
          ? `I found ${searchResults.length} products matching your search: ${searchResults.map(p => p.name).join(', ')}.`
          : 'Sorry, I couldn\'t find any products matching your request.';
      }

      const newCommand: VoiceCommand = {
        text: command,
        timestamp: new Date(),
        response,
        products: foundProducts
      };

      setCommands(prev => [newCommand, ...prev]);
    } catch (err) {
      setError('Failed to process your command. Please try again.');
    } finally {
      setIsProcessing(false);
      setCurrentCommand('');
    }
  };

  const extractProductNames = (command: string): string[] => {
    const lowerCommand = command.toLowerCase();
    const commonWords = ['add', 'find', 'get', 'buy', 'show', 'me', 'the', 'and', 'to', 'my', 'cart', 'best', 'rated'];
    
    return lowerCommand
      .split(' ')
      .filter(word => word.length > 2 && !commonWords.includes(word))
      .map(word => word.replace(/[^a-zA-Z]/g, ''));
  };

  const handleManualInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentCommand.trim()) {
      processCommand(currentCommand);
    }
  };

  return (
    <div className="walmart-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Voice Assistant</h3>
        <MessageSquare className="h-5 w-5 text-walmart-blue" />
      </div>

      {/* Voice Input */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={isListening ? stopListening : startListening}
            disabled={isProcessing}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-full transition-colors ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-walmart-blue text-white hover:bg-walmart-darkblue'
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="h-4 w-4" />
                <span>Stop</span>
              </>
            ) : (
              <>
                <Mic className="h-4 w-4" />
                <span>Start</span>
              </>
            )}
          </button>

          <div className="flex-1">
            <input
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleManualInput}
              placeholder="Say something or type your command..."
              className="walmart-input w-full"
              disabled={isListening || isProcessing}
            />
          </div>
        </div>

        {isProcessing && (
          <div className="flex items-center space-x-2 text-walmart-blue">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-walmart-blue"></div>
            <span className="text-sm">Processing your command...</span>
          </div>
        )}

        {error && (
          <div className="flex items-center space-x-2 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        {/* Example Commands */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Example Commands:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• "Add ingredients for chicken tikka masala for 5 people"</li>
            <li>• "Add pasta ingredients for 4 people"</li>
            <li>• "Add pasta dinner ingredients"</li>
            <li>• "Add milk and bananas to my cart"</li>
            <li>• "Find electronics under 500 dollars"</li>
            <li>• "Show me the best rated paper towels"</li>
          </ul>
          
          {/* Quick Test Buttons */}
          <div className="mt-3 pt-2 border-t border-gray-200">
            <h5 className="text-xs font-medium text-gray-600 mb-2">Quick Test:</h5>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => processCommand('Add ingredients for chicken tikka masala for 5 people')}
                disabled={isProcessing}
                className="text-xs bg-walmart-blue text-white px-2 py-1 rounded hover:bg-walmart-darkblue disabled:opacity-50"
              >
                🍛 Chicken Tikka Masala (5 people)
              </button>
              <button
                onClick={() => processCommand('Add items for pasta dinner for 4 people')}
                disabled={isProcessing}
                className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 disabled:opacity-50"
              >
                🍝 Pasta Dinner (4 people)
              </button>
              <button
                onClick={() => processCommand('Add pasta ingredients')}
                disabled={isProcessing}
                className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 disabled:opacity-50"
              >
                🍝 Pasta Ingredients
              </button>
              <button
                onClick={() => processCommand('Add milk and bananas to my cart')}
                disabled={isProcessing}
                className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700 disabled:opacity-50"
              >
                🥛 Milk & Bananas
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Command History */}
      {commands.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h4 className="font-semibold text-gray-900 mb-3">Recent Commands</h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {commands.map((cmd, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-start space-x-2 mb-2">
                  <Volume2 className="h-4 w-4 text-walmart-blue mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">"{cmd.text}"</p>
                    <p className="text-xs text-gray-500">
                      {cmd.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                
                <div className="ml-6">
                  <p className="text-sm text-gray-700 mb-2">{cmd.response}</p>
                  
                  {cmd.products && cmd.products.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {cmd.products.map(product => (
                        <button
                          key={product.id}
                          onClick={() => onAddToCart(product, 1, 'voice')}
                          className="flex items-center space-x-1 bg-white px-2 py-1 rounded border border-gray-200 hover:border-walmart-blue text-xs"
                        >
                          <ShoppingCart className="h-3 w-3" />
                          <span>{product.name}</span>
                          <span className="text-gray-500">${product.price.toFixed(2)}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant; 