import React, { useState, useRef } from 'react';
import { Camera, Upload, X, ShoppingCart, AlertCircle, Check } from 'lucide-react';
import { Product, products } from '../data/products';

interface ImageUploadProps {
  onAddToCart: (product: Product, quantity: number, addedBy: 'user') => void;
}

interface IdentifiedProduct {
  product: Product;
  confidence: number;
  description: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onAddToCart }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [identifiedProducts, setIdentifiedProducts] = useState<IdentifiedProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const processImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setUploadedImage(imageUrl);
      identifyProduct(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const identifyProduct = async (imageUrl: string) => {
    setIsProcessing(true);
    setError(null);
    setIdentifiedProducts([]);

    try {
      // Simulate AI image recognition processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Simulate product identification based on dummy scenarios
      const scenarios = [
        {
          products: [
            { product: products.find(p => p.id === '1')!, confidence: 0.92, description: 'Detected: Milk carton with Great Value brand logo' },
            { product: products.find(p => p.id === '6')!, confidence: 0.78, description: 'Alternative: Greek yogurt (similar dairy product)' }
          ]
        },
        {
          products: [
            { product: products.find(p => p.id === '16')!, confidence: 0.89, description: 'Detected: Samsung smart TV display showing 4K logo' },
            { product: products.find(p => p.id === '17')!, confidence: 0.65, description: 'Alternative: Apple iPhone (electronic device)' }
          ]
        },
        {
          products: [
            { product: products.find(p => p.id === '11')!, confidence: 0.95, description: 'Detected: Bounty paper towels package with blue packaging' },
            { product: products.find(p => p.id === '13')!, confidence: 0.72, description: 'Alternative: Charmin toilet paper (paper product)' }
          ]
        },
        {
          products: [
            { product: products.find(p => p.id === '2')!, confidence: 0.88, description: 'Detected: Yellow bananas, fresh produce' },
            { product: products.find(p => p.id === '7')!, confidence: 0.54, description: 'Alternative: Yellow onions (yellow produce)' }
          ]
        },
        {
          products: [
            { product: products.find(p => p.id === '14')!, confidence: 0.91, description: 'Detected: Pedigree dog food bag with dog illustration' },
            { product: products.find(p => p.id === '15')!, confidence: 0.67, description: 'Alternative: Friskies cat food (pet food)' }
          ]
        },
        {
          products: [
            { product: products.find(p => p.id === '64')!, confidence: 0.94, description: 'Detected: V-blade mandoline slicer with safety guard and adjustment dial' },
            { product: products.find(p => p.id === '24')!, confidence: 0.58, description: 'Alternative: Olive oil (cooking/kitchen product)' }
          ]
        }
      ];

      // Prioritize mandoline slicer for demo (70% chance)
      const randomValue = Math.random();
      let selectedScenario;
      
      if (randomValue < 0.7) {
        // 70% chance of mandoline slicer scenario
        selectedScenario = scenarios[5]; // Mandoline slicer is the 6th scenario (index 5)
      } else {
        // 30% chance of other scenarios
        const otherScenarios = scenarios.slice(0, 5); // First 5 scenarios
        selectedScenario = otherScenarios[Math.floor(Math.random() * otherScenarios.length)];
      }
      
      setIdentifiedProducts(selectedScenario.products);

      // For demo reliability, let's force the mandoline slicer scenario with alternative brand
      const primaryMandoline = products.find(p => p.id === '64'); // OXO
      const alternativeMandoline = products.find(p => p.id === '65'); // Progressive
      
      if (primaryMandoline && alternativeMandoline) {
        const mandolineScenario = [
          { 
            product: primaryMandoline, 
            confidence: 0.94, 
            description: 'Detected: Professional V-blade mandoline slicer with safety features and adjustable thickness settings' 
          },
          { 
            product: alternativeMandoline, 
            confidence: 0.87, 
            description: 'Alternative: Compact mandoline slicer from different brand with 9 thickness settings' 
          }
        ];
        setIdentifiedProducts(mandolineScenario);
      } else {
        // Fallback to banana scenario if mandoline not found
        const bananaProduct = products.find(p => p.id === '2');
        const onionProduct = products.find(p => p.id === '7');
        
        if (bananaProduct && onionProduct) {
          const fallbackScenario = [
            { 
              product: bananaProduct, 
              confidence: 0.88, 
              description: 'Detected: Yellow bananas, fresh produce' 
            },
            { 
              product: onionProduct, 
              confidence: 0.54, 
              description: 'Alternative: Yellow onions (yellow produce)' 
            }
          ];
          setIdentifiedProducts(fallbackScenario);
        }
      }
    } catch (err) {
      setError('Failed to identify product. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processImageFile(file);
    }
  };

  const clearImage = () => {
    setUploadedImage(null);
    setIdentifiedProducts([]);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const addToCart = (identifiedProduct: IdentifiedProduct) => {
    onAddToCart(identifiedProduct.product, 1, 'user');
  };

  return (
    <div className="walmart-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Image Search</h3>
        <Camera className="h-5 w-5 text-walmart-blue" />
      </div>

      {/* Upload Area */}
      <div className="space-y-4">
        {!uploadedImage ? (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-walmart-blue transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">
              Upload an image to identify the product
            </p>
            <p className="text-sm text-gray-500">
              Drag and drop or click to select
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Supports JPG, PNG, WebP
            </p>
          </div>
        ) : (
          <div className="relative">
            <img
              src={uploadedImage}
              alt="Uploaded product"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              onClick={clearImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Processing State */}
        {isProcessing && (
          <div className="flex items-center justify-center space-x-2 text-walmart-blue py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-walmart-blue"></div>
            <span>Analyzing image...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center space-x-2 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        {/* How it works */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">How it works:</h4>
          <ol className="text-xs text-gray-600 space-y-1">
            <li>1. Upload or drag an image of any product</li>
            <li>2. AI analyzes the image to identify the product</li>
            <li>3. Get product details like name, price, and reviews</li>
            <li>4. Add identified products directly to your cart</li>
          </ol>
        </div>
      </div>

      {/* Identified Products */}
      {identifiedProducts.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h4 className="font-semibold text-gray-900 mb-4">Identified Products</h4>
          <div className="space-y-3">
            {identifiedProducts.map((identified, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <img
                  src={identified.product.image}
                  alt={identified.product.name}
                  className="w-16 h-16 object-cover rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yOCAyMEgyNFYyOEgyOFYyMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTI4IDI0SDQwVjI4SDI4VjI0WiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNNDAgMjBIMzZWMjhINDBWMjBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yOCAyOEg0MFY0NEgyOFYyOFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                  }}
                />
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className="font-medium text-gray-900">
                      {identified.product.name}
                    </h5>
                    <div className="flex items-center space-x-1">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600">
                        {Math.round(identified.confidence * 100)}% match
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    {identified.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="font-semibold text-gray-900">
                      ${identified.product.price.toFixed(2)}
                    </span>
                    <span className="text-gray-600">
                      {identified.product.brand}
                    </span>
                    <span className="text-gray-600">
                      ⭐ {identified.product.rating}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(identified)}
                  className="walmart-button flex items-center space-x-1 px-3 py-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            ))}
          </div>

          {/* Product Details */}
          <div className="mt-4 p-3 bg-walmart-lightblue rounded-lg">
            <h5 className="font-medium text-gray-900 mb-2">Product Information</h5>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Features:</strong> {identifiedProducts[0].product.features.join(', ')}</p>
              <p><strong>Category:</strong> {identifiedProducts[0].product.category}</p>
              <p><strong>Reviews:</strong> {identifiedProducts[0].product.reviewCount} customer reviews</p>
              <p><strong>Availability:</strong> {identifiedProducts[0].product.availability}</p>
            </div>
          </div>

          {/* Mandoline Slicer Educational Section */}
          {identifiedProducts[0].product.tags.includes('mandoline') && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h5 className="font-semibold text-blue-900 mb-3 flex items-center">
                <span className="mr-2">🔪</span>
                What is a Mandoline Slicer?
              </h5>
              <div className="text-sm text-blue-800 space-y-3">
                <p>
                  <strong>A mandoline slicer</strong> is a professional kitchen tool designed to cut vegetables, fruits, and other foods into uniform, precise slices with consistent thickness. 
                  It's the secret weapon chefs use to create perfect potato chips, paper-thin onion slices, and restaurant-quality vegetable preparations.
                </p>
                
                <div>
                  <p className="font-medium mb-2">🍅 Common Uses:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2 text-xs">
                    <li>Creating uniform potato chips and vegetable chips</li>
                    <li>Paper-thin onion slices for salads and sandwiches</li>
                    <li>Perfect julienne cuts for stir-fries and garnishes</li>
                    <li>Consistent slices for gratins and layered dishes</li>
                    <li>Professional presentation for catering and restaurants</li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium mb-2">⚠️ How to Use Safely:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2 text-xs">
                    <li><strong>Always use the safety guard</strong> - never slice without it</li>
                    <li>Start with the thickest setting and adjust gradually</li>
                    <li>Keep fingers away from the blade at all times</li>
                    <li>Use slow, steady motions for best results</li>
                    <li>Clean carefully - blades are extremely sharp</li>
                  </ul>
                </div>

                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="font-medium text-blue-900 mb-1">💡 Pro Tip:</p>
                  <p className="text-xs">
                    Practice with softer vegetables like zucchini or cucumber before moving to harder items like potatoes. 
                    The key is consistent pressure and letting the mandoline do the work!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 