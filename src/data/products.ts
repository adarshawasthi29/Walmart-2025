export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  brand: string;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  features: string[];
  availability: 'in-stock' | 'out-of-stock' | 'low-stock';
  tags: string[];
  nutritionalInfo?: {
    calories?: number;
    servingSize?: string;
    ingredients?: string[];
  };
  reviews?: {
    positive: string;
    negative: string;
  };
}

export const products: Product[] = [
  // Groceries & Food
  {
    id: '1',
    name: 'Great Value Whole Milk',
    price: 3.48,
    category: 'Groceries',
    subcategory: 'Dairy',
    brand: 'Great Value',
    rating: 4.5,
    reviewCount: 1247,
    image: '/images/groceries/dairy/milk-whole.svg',
    description: 'Fresh whole milk, perfect for drinking and cooking',
    features: ['Vitamin D fortified', 'Farm fresh', '1 gallon'],
    availability: 'in-stock',
    tags: ['dairy', 'fresh', 'organic', 'milk'],
    nutritionalInfo: {
      calories: 150,
      servingSize: '1 cup',
      ingredients: ['Milk', 'Vitamin D3']
    },
    reviews: {
      positive: "Love the taste and freshness! Perfect for my morning coffee and cereal. Great value for money.",
      negative: "Sometimes arrives close to expiration date. Packaging could be improved as it leaks occasionally."
    }
  },
  {
    id: '2',
    name: 'Bananas',
    price: 0.58,
    category: 'Groceries',
    subcategory: 'Fruits',
    brand: 'Fresh',
    rating: 4.3,
    reviewCount: 892,
    image: '/images/groceries/fruits/bananas.svg',
    description: 'Fresh yellow bananas, perfect for snacking',
    features: ['Per pound', 'Rich in potassium', 'Natural'],
    availability: 'in-stock',
    tags: ['fruit', 'healthy', 'fresh', 'banana'],
    nutritionalInfo: {
      calories: 105,
      servingSize: '1 medium banana',
      ingredients: ['Bananas']
    },
    reviews: {
      positive: "Always ripe and sweet! Great for smoothies and my kids love them as snacks. Good price per pound.",
      negative: "Sometimes get overripe ones mixed in. Wish they had better quality control on ripeness."
    }
  },
  {
    id: '3',
    name: 'Boneless Chicken Breast',
    price: 2.98,
    category: 'Groceries',
    subcategory: 'Meat',
    brand: 'Fresh',
    rating: 4.2,
    reviewCount: 634,
    image: '/images/groceries/meat/chicken-breast.svg',
    description: 'Fresh boneless chicken breast, perfect for grilling',
    features: ['Per pound', 'No antibiotics', 'Fresh'],
    availability: 'in-stock',
    tags: ['meat', 'protein', 'fresh', 'chicken'],
    nutritionalInfo: {
      calories: 165,
      servingSize: '3.5 oz',
      ingredients: ['Chicken breast']
    },
    reviews: {
      positive: "High quality meat, very tender when cooked properly. Great for meal prep and family dinners.",
      negative: "Sometimes contains excess water. Packaging could be better sealed to prevent leaks."
    }
  },
  {
    id: '4',
    name: 'Basmati Rice',
    price: 4.98,
    category: 'Groceries',
    subcategory: 'Grains',
    brand: 'Great Value',
    rating: 4.6,
    reviewCount: 456,
    image: '/images/groceries/grains/rice-basmati.svg',
    description: 'Premium basmati rice, long grain',
    features: ['2 lb bag', 'Long grain', 'Aromatic'],
    availability: 'in-stock',
    tags: ['rice', 'grains', 'indian', 'basmati'],
    nutritionalInfo: {
      calories: 205,
      servingSize: '1 cup cooked',
      ingredients: ['Basmati rice']
    },
    reviews: {
      positive: "Amazing aroma and fluffy texture! Perfect for Indian dishes and pairs well with curries.",
      negative: "Price is higher than regular rice. Sometimes grains are broken in the package."
    }
  },
  {
    id: '5',
    name: 'Garam Masala Spice',
    price: 3.24,
    category: 'Groceries',
    subcategory: 'Spices',
    brand: 'McCormick',
    rating: 4.4,
    reviewCount: 289,
    image: '/images/groceries/spices/garam-masala.svg',
    description: 'Authentic garam masala spice blend',
    features: ['2 oz container', 'Aromatic blend', 'No MSG'],
    availability: 'in-stock',
    tags: ['spices', 'indian', 'cooking', 'masala'],
    nutritionalInfo: {
      calories: 6,
      servingSize: '1 tsp',
      ingredients: ['Coriander', 'Cumin', 'Cardamom', 'Cloves', 'Cinnamon']
    },
    reviews: {
      positive: "Authentic taste that transforms any dish! Great blend of spices, very aromatic and flavorful.",
      negative: "Container is small for the price. Spice blend could be more potent for authentic Indian taste."
    }
  },
  {
    id: '6',
    name: 'Yogurt Plain Greek',
    price: 4.48,
    category: 'Groceries',
    subcategory: 'Dairy',
    brand: 'Fage',
    rating: 4.7,
    reviewCount: 723,
    image: '/images/groceries/dairy/yogurt-greek.svg',
    description: 'Thick and creamy Greek yogurt',
    features: ['32 oz container', 'High protein', 'Probiotic'],
    availability: 'in-stock',
    tags: ['yogurt', 'protein', 'healthy', 'greek', 'plain'],
    nutritionalInfo: {
      calories: 130,
      servingSize: '1 cup',
      ingredients: ['Milk', 'Live cultures']
    },
    reviews: {
      positive: "Thick, creamy texture and perfect for breakfast! High protein content keeps me full longer.",
      negative: "Too tangy for some palates. Price is higher compared to regular yogurt brands."
    }
  },

  // More Yogurt Variations
  {
    id: '41',
    name: 'Greek Yogurt Vanilla',
    price: 5.28,
    category: 'Groceries',
    subcategory: 'Dairy',
    brand: 'Chobani',
    rating: 4.6,
    reviewCount: 892,
    image: '/images/groceries/dairy/yogurt-vanilla.svg',
    description: 'Creamy Greek yogurt with natural vanilla flavor',
    features: ['32 oz container', '20g protein', 'Natural vanilla'],
    availability: 'in-stock',
    tags: ['yogurt', 'greek', 'vanilla', 'protein', 'chobani'],
    nutritionalInfo: {
      calories: 140,
      servingSize: '1 cup',
      ingredients: ['Milk', 'Live cultures', 'Natural vanilla']
    },
    reviews: {
      positive: "Perfect vanilla flavor! Not too sweet and great texture. Kids love it with granola.",
      negative: "More expensive than store brands. Container size could be larger for families."
    }
  },
  {
    id: '42',
    name: 'Greek Yogurt Strawberry',
    price: 4.98,
    category: 'Groceries',
    subcategory: 'Dairy',
    brand: 'Oikos',
    rating: 4.4,
    reviewCount: 567,
    image: '/images/groceries/dairy/yogurt-strawberry.svg',
    description: 'Greek yogurt with real strawberry pieces',
    features: ['32 oz container', 'Real fruit', '15g protein'],
    availability: 'in-stock',
    tags: ['yogurt', 'greek', 'strawberry', 'fruit', 'oikos'],
    nutritionalInfo: {
      calories: 150,
      servingSize: '1 cup',
      ingredients: ['Milk', 'Strawberries', 'Live cultures']
    },
    reviews: {
      positive: "Real strawberry pieces make it delicious! Good protein content and creamy texture.",
      negative: "A bit too sweet for some. Fruit settles at bottom of container."
    }
  },
  {
    id: '43',
    name: 'Yogurt Regular Vanilla',
    price: 3.48,
    category: 'Groceries',
    subcategory: 'Dairy',
    brand: 'Yoplait',
    rating: 4.2,
    reviewCount: 445,
    image: '/images/groceries/dairy/yogurt-regular-vanilla.svg',
    description: 'Classic vanilla yogurt, smooth and creamy',
    features: ['32 oz container', 'Classic recipe', 'Smooth texture'],
    availability: 'in-stock',
    tags: ['yogurt', 'vanilla', 'regular', 'yoplait', 'classic'],
    nutritionalInfo: {
      calories: 110,
      servingSize: '1 cup',
      ingredients: ['Milk', 'Sugar', 'Natural vanilla', 'Live cultures']
    },
    reviews: {
      positive: "Great classic taste! Affordable and kids love it. Perfect for smoothies.",
      negative: "Higher sugar content than Greek yogurt. Not as thick as premium brands."
    }
  },
  {
    id: '44',
    name: 'Yogurt Low Fat Blueberry',
    price: 3.78,
    category: 'Groceries',
    subcategory: 'Dairy',
    brand: 'Dannon',
    rating: 4.3,
    reviewCount: 356,
    image: '/images/groceries/dairy/yogurt-blueberry.svg',
    description: 'Low-fat yogurt with blueberry flavor',
    features: ['32 oz container', 'Low fat', 'Real blueberries'],
    availability: 'in-stock',
    tags: ['yogurt', 'blueberry', 'low-fat', 'dannon', 'fruit'],
    nutritionalInfo: {
      calories: 100,
      servingSize: '1 cup',
      ingredients: ['Low-fat milk', 'Blueberries', 'Live cultures']
    },
    reviews: {
      positive: "Good blueberry flavor and lower calories! Perfect for weight management.",
      negative: "Not as creamy as full-fat versions. Artificial taste in some batches."
    }
  },
  {
    id: '45',
    name: 'Greek Yogurt Plain Organic',
    price: 5.98,
    category: 'Groceries',
    subcategory: 'Dairy',
    brand: 'Stonyfield',
    rating: 4.8,
    reviewCount: 678,
    image: '/images/groceries/dairy/yogurt-greek-organic.svg',
    description: 'Organic Greek yogurt, plain and unsweetened',
    features: ['32 oz container', 'USDA Organic', '22g protein'],
    availability: 'in-stock',
    tags: ['yogurt', 'greek', 'organic', 'plain', 'stonyfield'],
    nutritionalInfo: {
      calories: 130,
      servingSize: '1 cup',
      ingredients: ['Organic milk', 'Live cultures']
    },
    reviews: {
      positive: "Premium organic quality! Rich taste and perfect texture. Worth the price for health benefits.",
      negative: "Most expensive option. Too tangy for kids without adding honey."
    }
  },

  // More Milk Variations
  {
    id: '46',
    name: 'Milk Whole Organic',
    price: 4.98,
    category: 'Groceries',
    subcategory: 'Dairy',
    brand: 'Organic Valley',
    rating: 4.7,
    reviewCount: 789,
    image: '/images/groceries/dairy/milk-organic-whole.svg',
    description: 'Organic whole milk from grass-fed cows',
    features: ['64 fl oz carton', 'USDA Organic', 'Grass-fed'],
    availability: 'in-stock',
    tags: ['milk', 'whole', 'organic', 'grass-fed', 'dairy'],
    nutritionalInfo: {
      calories: 150,
      servingSize: '1 cup',
      ingredients: ['Organic milk', 'Vitamin D3']
    },
    reviews: {
      positive: "Best tasting milk! Creamy texture and you can taste the quality. Kids prefer it over regular milk.",
      negative: "Expensive but worth it. Shorter shelf life than ultra-pasteurized milk."
    }
  },
  {
    id: '47',
    name: 'Milk 1% Low Fat',
    price: 3.18,
    category: 'Groceries',
    subcategory: 'Dairy',
    brand: 'Great Value',
    rating: 4.3,
    reviewCount: 567,
    image: '/images/groceries/dairy/milk-1percent.svg',
    description: '1% low-fat milk, good source of protein',
    features: ['64 fl oz carton', '1% milkfat', 'Vitamin fortified'],
    availability: 'in-stock',
    tags: ['milk', '1%', 'low-fat', 'protein', 'dairy'],
    nutritionalInfo: {
      calories: 110,
      servingSize: '1 cup',
      ingredients: ['Low-fat milk', 'Vitamin A', 'Vitamin D3']
    },
    reviews: {
      positive: "Good balance of taste and health! Not too watery like skim milk. Great value for money.",
      negative: "Less creamy than whole milk. Generic taste compared to premium brands."
    }
  },
  {
    id: '48',
    name: 'Milk Skim Fat Free',
    price: 2.98,
    category: 'Groceries',
    subcategory: 'Dairy',
    brand: 'Great Value',
    rating: 4.0,
    reviewCount: 445,
    image: '/images/groceries/dairy/milk-skim.svg',
    description: 'Fat-free skim milk, lowest calorie option',
    features: ['64 fl oz carton', '0% fat', 'High protein'],
    availability: 'in-stock',
    tags: ['milk', 'skim', 'fat-free', 'low-calorie', 'dairy'],
    nutritionalInfo: {
      calories: 80,
      servingSize: '1 cup',
      ingredients: ['Skim milk', 'Vitamin A', 'Vitamin D3']
    },
    reviews: {
      positive: "Lowest calorie milk option! Good for dieting and still has protein. Very affordable.",
      negative: "Watery texture. Not creamy enough for coffee or cereal for some people."
    }
  },
  {
    id: '49',
    name: 'Oat Milk Original',
    price: 4.48,
    category: 'Groceries',
    subcategory: 'Dairy',
    brand: 'Oatly',
    rating: 4.5,
    reviewCount: 692,
    image: '/images/groceries/dairy/oat-milk.svg',
    description: 'Creamy oat milk, dairy-free alternative',
    features: ['64 fl oz carton', 'Dairy-free', 'Beta-glucan fiber'],
    availability: 'in-stock',
    tags: ['oat', 'milk', 'dairy-free', 'vegan', 'plant-based'],
    nutritionalInfo: {
      calories: 120,
      servingSize: '1 cup',
      ingredients: ['Oatbase', 'Rapeseed oil', 'Sea salt']
    },
    reviews: {
      positive: "Creamiest plant milk! Great for coffee and cereal. Environmentally friendly choice.",
      negative: "More expensive than dairy milk. Higher calories than other plant milks."
    }
  },
  {
    id: '50',
    name: 'Soy Milk Unsweetened',
    price: 3.78,
    category: 'Groceries',
    subcategory: 'Dairy',
    brand: 'Silk',
    rating: 4.2,
    reviewCount: 534,
    image: '/images/groceries/dairy/soy-milk.svg',
    description: 'Unsweetened soy milk, high protein plant-based option',
    features: ['64 fl oz carton', 'High protein', 'No added sugar'],
    availability: 'in-stock',
    tags: ['soy', 'milk', 'unsweetened', 'protein', 'vegan'],
    nutritionalInfo: {
      calories: 80,
      servingSize: '1 cup',
      ingredients: ['Soymilk', 'Vitamin A', 'Vitamin D2']
    },
    reviews: {
      positive: "High protein content! Good for vegans and lactose intolerant. Neutral taste.",
      negative: "Beany aftertaste for some. Can curdle in hot coffee if not careful."
    }
  },

  // More Bread Variations
  {
    id: '51',
    name: 'Bread Sourdough',
    price: 3.48,
    category: 'Groceries',
    subcategory: 'Bakery',
    brand: 'Boudin',
    rating: 4.6,
    reviewCount: 567,
    image: '/images/groceries/bakery/bread-sourdough.svg',
    description: 'Authentic sourdough bread with tangy flavor',
    features: ['24 oz loaf', 'Sourdough starter', 'Artisan quality'],
    availability: 'in-stock',
    tags: ['bread', 'sourdough', 'artisan', 'tangy', 'authentic'],
    reviews: {
      positive: "Amazing tangy flavor! Perfect crust and soft inside. Great for sandwiches and toast.",
      negative: "More expensive than regular bread. Gets stale faster than preservative bread."
    }
  },
  {
    id: '52',
    name: 'Bread Honey Wheat',
    price: 2.78,
    category: 'Groceries',
    subcategory: 'Bakery',
    brand: 'Nature\'s Own',
    rating: 4.4,
    reviewCount: 445,
    image: '/images/groceries/bakery/bread-honey-wheat.svg',
    description: 'Soft honey wheat bread, lightly sweetened',
    features: ['20 oz loaf', 'Honey sweetened', 'Whole grains'],
    availability: 'in-stock',
    tags: ['bread', 'honey', 'wheat', 'sweet', 'whole-grain'],
    reviews: {
      positive: "Perfect sweetness from honey! Kids love it and it's healthier than white bread.",
      negative: "Can be too sweet for savory sandwiches. Higher sugar content."
    }
  },
  {
    id: '53',
    name: 'Bread Rye Dark',
    price: 3.28,
    category: 'Groceries',
    subcategory: 'Bakery',
    brand: 'Pepperidge Farm',
    rating: 4.3,
    reviewCount: 234,
    image: '/images/groceries/bakery/bread-rye-dark.svg',
    description: 'Dark rye bread with caraway seeds',
    features: ['24 oz loaf', 'Caraway seeds', 'Dense texture'],
    availability: 'in-stock',
    tags: ['bread', 'rye', 'dark', 'caraway', 'dense'],
    reviews: {
      positive: "Rich rye flavor! Perfect for deli sandwiches and pairs well with strong cheeses.",
      negative: "Not for everyone's taste. Dense texture can be heavy for some."
    }
  },
  {
    id: '54',
    name: 'Bread Gluten Free',
    price: 4.98,
    category: 'Groceries',
    subcategory: 'Bakery',
    brand: 'Udi\'s',
    rating: 4.1,
    reviewCount: 389,
    image: '/images/groceries/bakery/bread-gluten-free.svg',
    description: 'Gluten-free white bread, celiac-friendly',
    features: ['18 oz loaf', 'Gluten-free', 'Soft texture'],
    availability: 'in-stock',
    tags: ['bread', 'gluten-free', 'celiac', 'white', 'special-diet'],
    reviews: {
      positive: "Best gluten-free bread! Soft texture and doesn't crumble. Great for celiacs.",
      negative: "Expensive and smaller loaf. Needs to be kept frozen for freshness."
    }
  },

  // More Egg Variations
  {
    id: '55',
    name: 'Eggs Extra Large',
    price: 3.48,
    category: 'Groceries',
    subcategory: 'Dairy',
    brand: 'Great Value',
    rating: 4.5,
    reviewCount: 567,
    image: '/images/groceries/dairy/eggs-extra-large.svg',
    description: 'Extra large eggs, perfect for baking',
    features: ['12 count', 'Extra Large', 'Grade A'],
    availability: 'in-stock',
    tags: ['eggs', 'extra-large', 'baking', 'grade-a', 'fresh'],
    nutritionalInfo: {
      calories: 80,
      servingSize: '1 extra large egg',
      ingredients: ['Eggs']
    },
    reviews: {
      positive: "Bigger eggs mean more value! Perfect for baking recipes that call for extra large.",
      negative: "Slightly more expensive per dozen. Not always available in all stores."
    }
  },
  {
    id: '56',
    name: 'Eggs Cage Free',
    price: 3.78,
    category: 'Groceries',
    subcategory: 'Dairy',
    brand: 'Nellie\'s',
    rating: 4.6,
    reviewCount: 678,
    image: '/images/groceries/dairy/eggs-cage-free.svg',
    description: 'Cage-free eggs from happy hens',
    features: ['12 count', 'Cage-free', 'Humane certified'],
    availability: 'in-stock',
    tags: ['eggs', 'cage-free', 'humane', 'ethical', 'free-range'],
    nutritionalInfo: {
      calories: 70,
      servingSize: '1 large egg',
      ingredients: ['Cage-free eggs']
    },
    reviews: {
      positive: "Ethical choice! Better taste and brighter yolks. Feel good about supporting humane farms.",
      negative: "More expensive than conventional eggs. Limited shelf life sometimes."
    }
  },
  {
    id: '57',
    name: 'Eggs Pasture Raised',
    price: 5.48,
    category: 'Groceries',
    subcategory: 'Dairy',
    brand: 'Vital Farms',
    rating: 4.8,
    reviewCount: 445,
    image: '/images/groceries/dairy/eggs-pasture-raised.svg',
    description: 'Pasture-raised eggs from outdoor hens',
    features: ['12 count', 'Pasture-raised', 'Orange yolks'],
    availability: 'in-stock',
    tags: ['eggs', 'pasture-raised', 'premium', 'orange-yolks', 'outdoor'],
    nutritionalInfo: {
      calories: 70,
      servingSize: '1 large egg',
      ingredients: ['Pasture-raised eggs']
    },
    reviews: {
      positive: "Best eggs ever! Rich orange yolks and amazing flavor. You can taste the difference.",
      negative: "Very expensive. Not in everyone's budget for regular purchase."
    }
  },

  // More Rice Variations
  {
    id: '58',
    name: 'Rice Arborio',
    price: 6.98,
    category: 'Groceries',
    subcategory: 'Grains',
    brand: 'RiceSelect',
    rating: 4.7,
    reviewCount: 334,
    image: '/images/groceries/grains/rice-arborio.svg',
    description: 'Premium Arborio rice for risotto',
    features: ['32 oz jar', 'Italian variety', 'Creamy texture'],
    availability: 'in-stock',
    tags: ['rice', 'arborio', 'risotto', 'italian', 'premium'],
    nutritionalInfo: {
      calories: 200,
      servingSize: '1/4 cup dry',
      ingredients: ['Arborio rice']
    },
    reviews: {
      positive: "Perfect for risotto! Creamy texture and absorbs flavors well. Restaurant quality at home.",
      negative: "Expensive for rice. Only good for specific dishes like risotto."
    }
  },
  {
    id: '59',
    name: 'Rice Wild Blend',
    price: 7.48,
    category: 'Groceries',
    subcategory: 'Grains',
    brand: 'Uncle Ben\'s',
    rating: 4.4,
    reviewCount: 256,
    image: '/images/groceries/grains/rice-wild-blend.svg',
    description: 'Wild rice blend with long grain white rice',
    features: ['2 lb bag', 'Wild rice blend', 'Nutty flavor'],
    availability: 'in-stock',
    tags: ['rice', 'wild', 'blend', 'nutty', 'gourmet'],
    nutritionalInfo: {
      calories: 170,
      servingSize: '1/4 cup dry',
      ingredients: ['Wild rice', 'Long grain rice']
    },
    reviews: {
      positive: "Delicious nutty flavor! Great texture and makes any meal feel gourmet. Nutritious option.",
      negative: "Takes longer to cook. More expensive than regular rice."
    }
  },

  // More Chicken Variations
  {
    id: '60',
    name: 'Chicken Wings Fresh',
    price: 4.98,
    category: 'Groceries',
    subcategory: 'Meat',
    brand: 'Fresh',
    rating: 4.3,
    reviewCount: 445,
    image: '/images/groceries/meat/chicken-wings.svg',
    description: 'Fresh chicken wings, perfect for grilling',
    features: ['Per pound', 'Party wings', 'Fresh cut'],
    availability: 'in-stock',
    tags: ['chicken', 'wings', 'fresh', 'grilling', 'party'],
    nutritionalInfo: {
      calories: 203,
      servingSize: '3.5 oz',
      ingredients: ['Chicken wings']
    },
    reviews: {
      positive: "Great for game day! Crispy skin when cooked right. Good meat to bone ratio.",
      negative: "Can be messy to eat. Price varies with market conditions."
    }
  },
  {
    id: '61',
    name: 'Chicken Drumsticks',
    price: 2.48,
    category: 'Groceries',
    subcategory: 'Meat',
    brand: 'Fresh',
    rating: 4.2,
    reviewCount: 356,
    image: '/images/groceries/meat/chicken-drumsticks.svg',
    description: 'Fresh chicken drumsticks, economical choice',
    features: ['Per pound', 'Dark meat', 'Budget friendly'],
    availability: 'in-stock',
    tags: ['chicken', 'drumsticks', 'economical', 'dark-meat', 'budget'],
    nutritionalInfo: {
      calories: 172,
      servingSize: '3.5 oz',
      ingredients: ['Chicken drumsticks']
    },
    reviews: {
      positive: "Most economical chicken cut! Kids love them and they're juicy when cooked properly.",
      negative: "More work to eat around the bone. Takes longer to cook than breast meat."
    }
  },

  // More Pasta Variations
  {
    id: '62',
    name: 'Pasta Linguine',
    price: 1.38,
    category: 'Groceries',
    subcategory: 'Grains',
    brand: 'Barilla',
    rating: 4.5,
    reviewCount: 445,
    image: '/images/groceries/grains/pasta-linguine.svg',
    description: 'Linguine pasta, flat and elegant',
    features: ['1 lb box', 'Flat shape', 'Perfect for seafood'],
    availability: 'in-stock',
    tags: ['pasta', 'linguine', 'flat', 'seafood', 'italian'],
    nutritionalInfo: {
      calories: 200,
      servingSize: '2 oz dry',
      ingredients: ['Durum wheat semolina']
    },
    reviews: {
      positive: "Perfect with seafood sauces! Elegant presentation and good quality. Cooks evenly.",
      negative: "Can stick together if not stirred. Limited sauce pairing compared to other shapes."
    }
  },
  {
    id: '63',
    name: 'Pasta Rigatoni',
    price: 1.48,
    category: 'Groceries',
    subcategory: 'Grains',
    brand: 'De Cecco',
    rating: 4.6,
    reviewCount: 567,
    image: '/images/groceries/grains/pasta-rigatoni.svg',
    description: 'Rigatoni pasta tubes, holds sauce well',
    features: ['1 lb box', 'Tube shape', 'Ridged surface'],
    availability: 'in-stock',
    tags: ['pasta', 'rigatoni', 'tubes', 'ridged', 'sauce-holding'],
    nutritionalInfo: {
      calories: 200,
      servingSize: '2 oz dry',
      ingredients: ['Durum wheat semolina']
    },
    reviews: {
      positive: "Holds sauce amazingly! Ridged surface grabs every bit of flavor. Premium quality pasta.",
      negative: "Slightly more expensive than basic brands. Takes a bit longer to cook."
    }
  },
  {
    id: '7',
    name: 'Onions Yellow',
    price: 0.98,
    category: 'Groceries',
    subcategory: 'Vegetables',
    brand: 'Fresh',
    rating: 4.1,
    reviewCount: 567,
    image: '/images/groceries/vegetables/onions.svg',
    description: 'Fresh yellow onions, great for cooking',
    features: ['Per pound', 'Cooking essential', 'Long lasting'],
    availability: 'in-stock',
    tags: ['vegetables', 'cooking', 'fresh', 'onion'],
    nutritionalInfo: {
      calories: 40,
      servingSize: '1 medium onion',
      ingredients: ['Yellow onions']
    },
    reviews: {
      positive: "Good quality onions that store well! Perfect for cooking and add great flavor to dishes.",
      negative: "Sometimes get soft or sprouting onions. Quality can be inconsistent batch to batch."
    }
  },
  {
    id: '8',
    name: 'Garlic Fresh',
    price: 0.48,
    category: 'Groceries',
    subcategory: 'Vegetables',
    brand: 'Fresh',
    rating: 4.3,
    reviewCount: 234,
    image: '/images/groceries/vegetables/garlic.svg',
    description: 'Fresh garlic bulbs, aromatic and flavorful',
    features: ['Per bulb', 'Aromatic', 'Cooking essential'],
    availability: 'in-stock',
    tags: ['garlic', 'vegetables', 'cooking', 'fresh'],
    nutritionalInfo: {
      calories: 4,
      servingSize: '1 clove',
      ingredients: ['Fresh garlic']
    },
    reviews: {
      positive: "Very fresh and aromatic! Bulbs are firm and flavorful. Essential for my cooking.",
      negative: "Sometimes bulbs are small. Cloves can be difficult to peel when very fresh."
    }
  },
  {
    id: '9',
    name: 'Tomatoes Diced Canned',
    price: 1.28,
    category: 'Groceries',
    subcategory: 'Canned Goods',
    brand: 'Hunt\'s',
    rating: 4.4,
    reviewCount: 445,
    image: '/images/groceries/spices/canned-tomatoes.svg',
    description: 'Diced tomatoes in juice, perfect for cooking',
    features: ['14.5 oz can', 'No preservatives', 'Vine ripened'],
    availability: 'in-stock',
    tags: ['tomatoes', 'canned', 'cooking', 'sauce'],
    nutritionalInfo: {
      calories: 35,
      servingSize: '1/2 cup',
      ingredients: ['Tomatoes', 'Tomato juice', 'Citric acid']
    },
    reviews: {
      positive: "Great for sauces and soups! Good tomato flavor and convenient to use in recipes.",
      negative: "Can be watery sometimes. Wish pieces were more consistently sized."
    }
  },
  {
    id: '10',
    name: 'Coconut Milk',
    price: 1.98,
    category: 'Groceries',
    subcategory: 'Canned Goods',
    brand: 'Thai Kitchen',
    rating: 4.5,
    reviewCount: 356,
    image: '/images/groceries/canned-goods/coconut-milk.svg',
    description: 'Rich and creamy coconut milk',
    features: ['13.66 fl oz can', 'No preservatives', 'Gluten free'],
    availability: 'in-stock',
    tags: ['coconut', 'milk', 'cooking', 'asian'],
    nutritionalInfo: {
      calories: 70,
      servingSize: '1/3 cup',
      ingredients: ['Coconut', 'Water']
    },
    reviews: {
      positive: "Perfect for Thai curries! Rich, creamy texture and authentic coconut flavor.",
      negative: "Can separate in the can. More expensive than other brands but worth the quality."
    }
  },

  // Additional Groceries for variety
  {
    id: '19',
    name: 'Bread Whole Wheat',
    price: 2.48,
    category: 'Groceries',
    subcategory: 'Bakery',
    brand: 'Sara Lee',
    rating: 4.2,
    reviewCount: 678,
    image: '/images/groceries/bakery/bread.svg',
    description: 'Soft whole wheat bread, perfect for sandwiches',
    features: ['20 oz loaf', 'Whole grains', 'No artificial colors'],
    availability: 'in-stock',
    tags: ['bread', 'wheat', 'bakery', 'healthy'],
    reviews: {
      positive: "Great taste and texture! Stays fresh longer than other brands. Perfect for sandwiches.",
      negative: "Gets moldy quickly in humid weather. Slices are sometimes uneven."
    }
  },
  {
    id: '20',
    name: 'Eggs Large Grade A',
    price: 2.78,
    category: 'Groceries',
    subcategory: 'Dairy',
    brand: 'Great Value',
    rating: 4.6,
    reviewCount: 1034,
    image: '/images/groceries/dairy/eggs.svg',
    description: 'Fresh large eggs, perfect for cooking and baking',
    features: ['12 count', 'Grade A', 'Farm fresh'],
    availability: 'in-stock',
    tags: ['eggs', 'dairy', 'protein', 'fresh'],
    nutritionalInfo: {
      calories: 70,
      servingSize: '1 large egg',
      ingredients: ['Eggs']
    },
    reviews: {
      positive: "Fresh eggs with bright yolks! Great for baking and breakfast. Good value for money.",
      negative: "Occasionally get cracked eggs. Packaging could be more protective."
    }
  },
  {
    id: '21',
    name: 'Ground Beef 80/20',
    price: 4.98,
    category: 'Groceries',
    subcategory: 'Meat',
    brand: 'Fresh',
    rating: 4.1,
    reviewCount: 567,
    image: '/images/groceries/meat/ground-beef.svg',
    description: 'Fresh ground beef, 80% lean',
    features: ['Per pound', '80% lean', 'Fresh ground'],
    availability: 'in-stock',
    tags: ['beef', 'meat', 'protein', 'ground'],
    nutritionalInfo: {
      calories: 287,
      servingSize: '4 oz',
      ingredients: ['Ground beef']
    },
    reviews: {
      positive: "Great for burgers and tacos! Good fat content makes it flavorful and juicy.",
      negative: "Can be fatty sometimes. Wish it was more consistently lean."
    }
  },
  {
    id: '22',
    name: 'Potatoes Russet',
    price: 2.98,
    category: 'Groceries',
    subcategory: 'Vegetables',
    brand: 'Fresh',
    rating: 4.3,
    reviewCount: 445,
    image: '/images/groceries/vegetables/potatoes.svg',
    description: 'Fresh russet potatoes, perfect for baking and frying',
    features: ['5 lb bag', 'Russet variety', 'Great for baking'],
    availability: 'in-stock',
    tags: ['potatoes', 'vegetables', 'fresh', 'russet'],
    nutritionalInfo: {
      calories: 168,
      servingSize: '1 medium potato',
      ingredients: ['Russet potatoes']
    },
    reviews: {
      positive: "Perfect for mashed potatoes and fries! Good size and cook evenly.",
      negative: "Some potatoes have eyes or green spots. Storage life could be better."
    }
  },
  {
    id: '23',
    name: 'Pasta Spaghetti',
    price: 1.18,
    category: 'Groceries',
    subcategory: 'Grains',
    brand: 'Barilla',
    rating: 4.5,
    reviewCount: 789,
    image: '/images/groceries/grains/pasta.svg',
    description: 'Classic spaghetti pasta, made from durum wheat',
    features: ['1 lb box', 'Durum wheat', 'Al dente texture'],
    availability: 'in-stock',
    tags: ['pasta', 'spaghetti', 'italian', 'grains'],
    nutritionalInfo: {
      calories: 200,
      servingSize: '2 oz dry',
      ingredients: ['Durum wheat semolina']
    },
    reviews: {
      positive: "Perfect texture when cooked! Holds sauce well and has great authentic taste.",
      negative: "Breaks easily during cooking if not careful. Box packaging tears easily."
    }
  },
  {
    id: '24',
    name: 'Olive Oil Extra Virgin',
    price: 7.98,
    category: 'Groceries',
    subcategory: 'Oils',
    brand: 'Bertolli',
    rating: 4.6,
    reviewCount: 892,
    image: '/images/groceries/oils/olive-oil.svg',
    description: 'Premium extra virgin olive oil, cold pressed',
    features: ['16.9 fl oz', 'Extra virgin', 'Cold pressed'],
    availability: 'in-stock',
    tags: ['oil', 'olive', 'cooking', 'healthy'],
    nutritionalInfo: {
      calories: 120,
      servingSize: '1 tbsp',
      ingredients: ['Extra virgin olive oil']
    },
    reviews: {
      positive: "Great flavor and quality! Perfect for salads and cooking. Authentic Italian taste.",
      negative: "Price is higher than other oils. Bottle design makes it hard to control pour."
    }
  },

  // Alternative product variations for the same items
  {
    id: '27',
    name: 'Coconut Milk Organic',
    price: 2.48,
    category: 'Groceries',
    subcategory: 'Canned Goods',
    brand: 'Great Value',
    rating: 4.2,
    reviewCount: 234,
    image: '/images/groceries/canned-goods/coconut-milk-organic.svg',
    description: 'Organic coconut milk, rich and creamy',
    features: ['13.5 fl oz can', 'Organic', 'No additives'],
    availability: 'in-stock',
    tags: ['coconut', 'milk', 'cooking', 'organic'],
    nutritionalInfo: {
      calories: 75,
      servingSize: '1/3 cup',
      ingredients: ['Organic coconut', 'Water']
    },
    reviews: {
      positive: "Great organic option! Good consistency and natural taste. Value for money.",
      negative: "Less rich than premium brands. Can be watery after opening."
    }
  },
  {
    id: '28',
    name: 'Coconut Milk Light',
    price: 1.68,
    category: 'Groceries',
    subcategory: 'Canned Goods',
    brand: 'Goya',
    rating: 4.0,
    reviewCount: 189,
    image: '/images/groceries/canned-goods/coconut-milk.svg',
    description: 'Light coconut milk with reduced fat',
    features: ['13.5 fl oz can', 'Light version', 'Lower calories'],
    availability: 'in-stock',
    tags: ['coconut', 'milk', 'cooking', 'light', 'low-fat'],
    nutritionalInfo: {
      calories: 45,
      servingSize: '1/3 cup',
      ingredients: ['Coconut', 'Water']
    },
    reviews: {
      positive: "Good for lighter dishes! Lower calories but still good flavor. Budget-friendly.",
      negative: "Not as creamy as full-fat versions. Limited richness for curries."
    }
  },
  {
    id: '29',
    name: 'Almond Milk Unsweetened',
    price: 3.48,
    category: 'Groceries',
    subcategory: 'Dairy',
    brand: 'Silk',
    rating: 4.3,
    reviewCount: 567,
    image: '/images/groceries/dairy/soy-milk.svg',
    description: 'Unsweetened almond milk, dairy-free alternative',
    features: ['64 fl oz carton', 'Dairy-free', 'Low calories'],
    availability: 'in-stock',
    tags: ['almond', 'milk', 'dairy-free', 'vegan'],
    nutritionalInfo: {
      calories: 40,
      servingSize: '1 cup',
      ingredients: ['Almondmilk', 'Vitamin E']
    },
    reviews: {
      positive: "Perfect milk alternative! Great for cereal and coffee. Stays fresh long.",
      negative: "Thin consistency compared to dairy milk. Can separate when heated."
    }
  },
  {
    id: '30',
    name: 'Milk 2% Reduced Fat',
    price: 3.28,
    category: 'Groceries',
    subcategory: 'Dairy',
    brand: 'Horizon Organic',
    rating: 4.4,
    reviewCount: 890,
    image: '/images/groceries/dairy/milk-organic-whole.svg',
    description: 'Organic 2% reduced fat milk',
    features: ['64 fl oz carton', 'Organic', '2% fat'],
    availability: 'in-stock',
    tags: ['milk', 'dairy', 'organic', '2%'],
    nutritionalInfo: {
      calories: 130,
      servingSize: '1 cup',
      ingredients: ['Organic reduced fat milk', 'Vitamin D3']
    },
    reviews: {
      positive: "Best organic milk! Great taste and from grass-fed cows. Kids love it.",
      negative: "More expensive than regular milk. Shorter shelf life than ultra-pasteurized."
    }
  },
  {
    id: '31',
    name: 'Bread White Wonder',
    price: 1.98,
    category: 'Groceries',
    subcategory: 'Bakery',
    brand: 'Wonder',
    rating: 4.0,
    reviewCount: 445,
    image: '/images/groceries/bakery/bread.svg',
    description: 'Classic white bread, soft and fluffy',
    features: ['20 oz loaf', 'Classic white', 'Soft texture'],
    availability: 'in-stock',
    tags: ['bread', 'white', 'bakery', 'classic'],
    reviews: {
      positive: "Kids love it! Perfect for sandwiches and toast. Stays soft longer.",
      negative: "Not very nutritious. Gets stale quickly once opened."
    }
  },
  {
    id: '32',
    name: 'Bread Multigrain',
    price: 2.98,
    category: 'Groceries',
    subcategory: 'Bakery',
    brand: 'Pepperidge Farm',
    rating: 4.5,
    reviewCount: 523,
    image: '/images/groceries/bakery/bread-honey-wheat.svg',
    description: 'Hearty multigrain bread with seeds',
    features: ['24 oz loaf', 'Multigrain', 'Whole grains'],
    availability: 'in-stock',
    tags: ['bread', 'multigrain', 'healthy', 'seeds'],
    reviews: {
      positive: "Very healthy and filling! Great texture with seeds. Perfect for toast.",
      negative: "Price is higher. Can be dense for some preferences."
    }
  },
  {
    id: '33',
    name: 'Eggs Organic Free Range',
    price: 4.28,
    category: 'Groceries',
    subcategory: 'Dairy',
    brand: 'Pete & Gerry\'s',
    rating: 4.7,
    reviewCount: 678,
    image: '/images/groceries/dairy/eggs-pasture-raised.svg',
    description: 'Organic free-range eggs from pasture-raised hens',
    features: ['12 count', 'Organic', 'Free-range'],
    availability: 'in-stock',
    tags: ['eggs', 'organic', 'free-range', 'premium'],
    nutritionalInfo: {
      calories: 70,
      servingSize: '1 large egg',
      ingredients: ['Organic eggs']
    },
    reviews: {
      positive: "Amazing quality eggs! Rich orange yolks and superior taste. Worth the premium.",
      negative: "Expensive compared to regular eggs. Limited availability sometimes."
    }
  },
  {
    id: '34',
    name: 'Eggs Brown Large',
    price: 3.08,
    category: 'Groceries',
    subcategory: 'Dairy',
    brand: 'Eggland\'s Best',
    rating: 4.4,
    reviewCount: 789,
    image: '/images/groceries/dairy/eggs.svg',
    description: 'Brown eggs with enhanced nutrition',
    features: ['12 count', 'Brown eggs', 'Enhanced nutrition'],
    availability: 'in-stock',
    tags: ['eggs', 'brown', 'enhanced', 'nutrition'],
    nutritionalInfo: {
      calories: 70,
      servingSize: '1 large egg',
      ingredients: ['Eggs']
    },
    reviews: {
      positive: "Better nutrition profile! Firm shells and consistent quality. Great for baking.",
      negative: "Slightly more expensive. No major taste difference from white eggs."
    }
  },
  {
    id: '35',
    name: 'Chicken Breast Organic',
    price: 6.98,
    category: 'Groceries',
    subcategory: 'Meat',
    brand: 'Perdue',
    rating: 4.6,
    reviewCount: 445,
    image: '/images/groceries/meat/chicken-breast.svg',
    description: 'Organic boneless chicken breast',
    features: ['Per pound', 'Organic', 'No antibiotics'],
    availability: 'in-stock',
    tags: ['chicken', 'breast', 'organic', 'premium'],
    nutritionalInfo: {
      calories: 165,
      servingSize: '3.5 oz',
      ingredients: ['Organic chicken breast']
    },
    reviews: {
      positive: "Superior quality! Tender and flavorful. Worth the organic premium.",
      negative: "Much more expensive. Limited package sizes available."
    }
  },
  {
    id: '36',
    name: 'Chicken Thighs Boneless',
    price: 3.98,
    category: 'Groceries',
    subcategory: 'Meat',
    brand: 'Fresh',
    rating: 4.4,
    reviewCount: 356,
    image: '/images/groceries/meat/chicken-breast.svg',
    description: 'Boneless chicken thighs, juicy and flavorful',
    features: ['Per pound', 'Boneless', 'Dark meat'],
    availability: 'in-stock',
    tags: ['chicken', 'thighs', 'boneless', 'juicy'],
    nutritionalInfo: {
      calories: 209,
      servingSize: '3.5 oz',
      ingredients: ['Chicken thighs']
    },
    reviews: {
      positive: "More flavorful than breast meat! Stays juicy when cooked. Great value.",
      negative: "Higher fat content. Takes longer to cook than breast meat."
    }
  },
  {
    id: '37',
    name: 'Rice Jasmine',
    price: 5.48,
    category: 'Groceries',
    subcategory: 'Grains',
    brand: 'Mahatma',
    rating: 4.5,
    reviewCount: 678,
    image: '/images/groceries/grains/rice-jasmine.svg',
    description: 'Fragrant jasmine rice, long grain',
    features: ['2 lb bag', 'Jasmine variety', 'Aromatic'],
    availability: 'in-stock',
    tags: ['rice', 'jasmine', 'aromatic', 'thai'],
    nutritionalInfo: {
      calories: 205,
      servingSize: '1 cup cooked',
      ingredients: ['Jasmine rice']
    },
    reviews: {
      positive: "Amazing aroma and fluffy texture! Perfect for Asian dishes. Cooks perfectly.",
      negative: "More expensive than regular rice. Can be sticky if overcooked."
    }
  },
  {
    id: '38',
    name: 'Rice Brown Long Grain',
    price: 3.98,
    category: 'Groceries',
    subcategory: 'Grains',
    brand: 'Great Value',
    rating: 4.1,
    reviewCount: 445,
    image: '/images/groceries/grains/rice-basmati.svg',
    description: 'Nutritious brown rice, whole grain',
    features: ['2 lb bag', 'Brown rice', 'Whole grain'],
    availability: 'in-stock',
    tags: ['rice', 'brown', 'healthy', 'whole-grain'],
    nutritionalInfo: {
      calories: 218,
      servingSize: '1 cup cooked',
      ingredients: ['Brown rice']
    },
    reviews: {
      positive: "Healthy option! Nutty flavor and good nutrition. Filling and satisfying.",
      negative: "Takes longer to cook. Texture is chewier than white rice."
    }
  },
  {
    id: '39',
    name: 'Pasta Penne',
    price: 1.28,
    category: 'Groceries',
    subcategory: 'Grains',
    brand: 'Barilla',
    rating: 4.4,
    reviewCount: 567,
    image: '/images/groceries/grains/pasta-rigatoni.svg',
    description: 'Penne pasta, perfect for sauces',
    features: ['1 lb box', 'Durum wheat', 'Tube shape'],
    availability: 'in-stock',
    tags: ['pasta', 'penne', 'italian', 'tube'],
    nutritionalInfo: {
      calories: 200,
      servingSize: '2 oz dry',
      ingredients: ['Durum wheat semolina']
    },
    reviews: {
      positive: "Perfect shape for chunky sauces! Good quality and consistent texture.",
      negative: "Can overcook easily. Package size could be larger for families."
    }
  },
  {
    id: '40',
    name: 'Pasta Whole Wheat',
    price: 1.68,
    category: 'Groceries',
    subcategory: 'Grains',
    brand: 'Ronzoni',
    rating: 4.0,
    reviewCount: 234,
    image: '/images/groceries/grains/pasta.svg',
    description: 'Whole wheat spaghetti, healthier option',
    features: ['1 lb box', 'Whole wheat', 'High fiber'],
    availability: 'in-stock',
    tags: ['pasta', 'whole-wheat', 'healthy', 'fiber'],
    nutritionalInfo: {
      calories: 180,
      servingSize: '2 oz dry',
      ingredients: ['Whole wheat durum flour']
    },
    reviews: {
      positive: "Healthier alternative! Good fiber content and nutty flavor. Kids adapted well.",
      negative: "Different texture than regular pasta. Can get mushy if overcooked."
    }
  },

  // More Household Items
  {
    id: '25',
    name: 'Dishwasher Detergent Pods',
    price: 16.97,
    category: 'Household',
    subcategory: 'Kitchen',
    brand: 'Cascade',
    rating: 4.5,
    reviewCount: 1234,
    image: '/images/household/cleaning/all-purpose-cleaner.svg',
    description: 'Powerful dishwasher detergent pods',
    features: ['85 count', 'Grease cutting', 'Rinse aid action'],
    availability: 'in-stock',
    tags: ['dishwasher', 'detergent', 'cleaning', 'pods'],
    reviews: {
      positive: "Cleans dishes perfectly! No residue and removes tough stains. Convenient to use.",
      negative: "Packaging is not child-safe enough. Sometimes pods don't dissolve completely."
    }
  },
  {
    id: '26',
    name: 'All-Purpose Cleaner',
    price: 3.47,
    category: 'Household',
    subcategory: 'Cleaning',
    brand: 'Mr. Clean',
    rating: 4.4,
    reviewCount: 567,
    image: '/images/household/cleaning/all-purpose-cleaner.svg',
    description: 'Multi-surface all-purpose cleaner',
    features: ['28 fl oz', 'Multi-surface', 'Fresh scent'],
    availability: 'in-stock',
    tags: ['cleaner', 'all-purpose', 'household', 'cleaning'],
    reviews: {
      positive: "Cleans everything well! Good value and pleasant scent. Works on multiple surfaces.",
      negative: "Can leave streaks on glass. Scent might be too strong for sensitive people."
    }
  },

  // Household Items with reviews
  {
    id: '11',
    name: 'Bounty Paper Towels',
    price: 18.97,
    originalPrice: 21.97,
    category: 'Household',
    subcategory: 'Paper Products',
    brand: 'Bounty',
    rating: 4.6,
    reviewCount: 2156,
    image: '/images/household/paper-products/paper-towels.svg',
    description: 'Super absorbent paper towels, 12 pack',
    features: ['12 rolls', 'Super absorbent', 'Strong when wet'],
    availability: 'in-stock',
    tags: ['paper towels', 'cleaning', 'household', 'absorbent'],
    reviews: {
      positive: "Most absorbent paper towels! Strong even when wet and one sheet cleans a lot.",
      negative: "More expensive than other brands. Rolls run out quickly with heavy use."
    }
  },
  {
    id: '12',
    name: 'Tide Laundry Detergent',
    price: 12.97,
    category: 'Household',
    subcategory: 'Laundry',
    brand: 'Tide',
    rating: 4.7,
    reviewCount: 1834,
    image: '/images/household/laundry/detergent.svg',
    description: 'Original scent liquid laundry detergent',
    features: ['100 fl oz', 'He compatible', 'Stain fighting'],
    availability: 'in-stock',
    tags: ['laundry', 'detergent', 'cleaning', 'tide'],
    reviews: {
      positive: "Best stain removal! Clothes come out clean and fresh. Works in all water temperatures.",
      negative: "Price is higher than generic brands. Strong scent might be overwhelming for some."
    }
  },
  {
    id: '13',
    name: 'Charmin Ultra Soft Toilet Paper',
    price: 24.94,
    category: 'Household',
    subcategory: 'Paper Products',
    brand: 'Charmin',
    rating: 4.5,
    reviewCount: 1456,
    image: '/images/household/paper-products/toilet-paper.svg',
    description: 'Ultra soft toilet paper, 24 mega rolls',
    features: ['24 mega rolls', 'Ultra soft', 'Strong'],
    availability: 'in-stock',
    tags: ['toilet paper', 'bathroom', 'household', 'soft'],
    reviews: {
      positive: "Super soft and comfortable! Mega rolls last long and great value for families.",
      negative: "Can clog pipes if used too much. More expensive than basic brands."
    }
  },

  // Pet Supplies with reviews
  {
    id: '14',
    name: 'Pedigree Adult Dry Dog Food',
    price: 22.98,
    category: 'Pet Supplies',
    subcategory: 'Dog Food',
    brand: 'Pedigree',
    rating: 4.3,
    reviewCount: 892,
    image: '/images/pet-supplies/dog-food/dog-food.svg',
    description: 'Complete nutrition for adult dogs',
    features: ['15 lb bag', 'Real beef', 'Vitamins & minerals'],
    availability: 'in-stock',
    tags: ['dog food', 'pet', 'nutrition', 'beef'],
    reviews: {
      positive: "Dogs love the taste! Good nutrition and affordable price. Keeps coat shiny.",
      negative: "Contains fillers and by-products. Some dogs have digestive issues with it."
    }
  },
  {
    id: '15',
    name: 'Friskies Cat Food Variety Pack',
    price: 15.48,
    category: 'Pet Supplies',
    subcategory: 'Cat Food',
    brand: 'Friskies',
    rating: 4.4,
    reviewCount: 567,
    image: '/images/pet-supplies/cat-food/cat-food.svg',
    description: 'Wet cat food variety pack, 32 cans',
    features: ['32 cans', 'Variety pack', 'Complete nutrition'],
    availability: 'in-stock',
    tags: ['cat food', 'pet', 'wet food', 'variety'],
    reviews: {
      positive: "Cats love the variety! Good value and different flavors keep them interested.",
      negative: "Some flavors are less popular. Cans can be difficult to open sometimes."
    }
  },

  // Electronics with reviews
  {
    id: '16',
    name: 'Samsung 55" 4K Smart TV',
    price: 448.00,
    originalPrice: 598.00,
    category: 'Electronics',
    subcategory: 'TVs',
    brand: 'Samsung',
    rating: 4.4,
    reviewCount: 1234,
    image: '/images/electronics/tvs/samsung-tv.svg',
    description: '55-inch 4K UHD Smart TV with streaming apps',
    features: ['4K UHD', 'Smart TV', 'HDR10+', 'Voice control'],
    availability: 'in-stock',
    tags: ['tv', 'electronics', 'smart', '4k', 'samsung'],
    reviews: {
      positive: "Amazing picture quality! Smart features work great and setup was easy. Great value.",
      negative: "Remote control is flimsy. Sound quality could be better for the price."
    }
  },
  {
    id: '17',
    name: 'Apple iPhone 15',
    price: 799.00,
    category: 'Electronics',
    subcategory: 'Phones',
    brand: 'Apple',
    rating: 4.6,
    reviewCount: 2345,
    image: '/images/electronics/phones/iphone.svg',
    description: 'Latest iPhone with advanced camera system',
    features: ['128GB storage', 'A17 chip', 'Advanced camera', 'Face ID'],
    availability: 'in-stock',
    tags: ['iphone', 'smartphone', 'electronics', 'apple', 'camera'],
    reviews: {
      positive: "Best camera quality! Fast performance and great battery life. iOS is smooth.",
      negative: "Very expensive. No headphone jack and lightning to USB-C transition is annoying."
    }
  },
  {
    id: '18',
    name: 'HP Laptop 15.6"',
    price: 379.00,
    originalPrice: 449.00,
    category: 'Electronics',
    subcategory: 'Computers',
    brand: 'HP',
    rating: 4.2,
    reviewCount: 856,
    image: '/images/electronics/computers/laptop.svg',
    description: 'Intel Core i3 laptop with 8GB RAM',
    features: ['Intel Core i3', '8GB RAM', '256GB SSD', 'Windows 11'],
    availability: 'in-stock',
    tags: ['laptop', 'computer', 'electronics', 'hp', 'windows'],
    reviews: {
      positive: "Great value for money! Fast boot up and handles everyday tasks well. Good build quality.",
      negative: "Battery life could be better. Gets warm during heavy usage. Screen could be brighter."
    }
  },

  // Kitchen Tools - Perfect for Image Search Demo
  {
    id: '64',
    name: 'OXO Good Grips V-Blade Mandoline Slicer',
    price: 49.99,
    originalPrice: 59.99,
    category: 'Household',
    subcategory: 'Kitchen',
    brand: 'OXO',
    rating: 4.3,
    reviewCount: 1247,
    image: '/images/household/kitchen/mandoline-slicer.svg',
    description: 'Professional mandoline slicer with adjustable thickness settings and safety features',
    features: ['Adjustable thickness dial', 'Safety hand guard', 'Non-slip base', 'Straight & wavy blades', 'Easy cleanup'],
    availability: 'in-stock',
    tags: ['mandoline', 'slicer', 'kitchen', 'vegetables', 'cooking', 'professional', 'slicing', 'julienne', 'thin slices'],
    reviews: {
      positive: "Makes perfect paper-thin slices! Great for potato chips, onion rings, and professional presentations. The safety guard actually works well once you get used to it.",
      negative: "Scary to use at first - definitely need the safety guard! Blade is extremely sharp. Takes practice to get consistent results. Hand guard is a bit clunky."
    }
  },

  // Alternative Mandoline Slicer - Different Brand
  {
    id: '65',
    name: 'Progressive International Adjust-A-Slice Mandoline',
    price: 29.99,
    originalPrice: 39.99,
    category: 'Household',
    subcategory: 'Kitchen',
    brand: 'Progressive',
    rating: 4.1,
    reviewCount: 892,
    image: '/images/household/kitchen/mandoline-progressive.svg',
    description: 'Compact mandoline slicer with 9 thickness settings for precise vegetable slicing',
    features: ['9 thickness settings', 'Fold-flat design', 'Non-slip feet', 'Easy storage', 'Dishwasher safe'],
    availability: 'in-stock',
    tags: ['mandoline', 'slicer', 'kitchen', 'vegetables', 'cooking', 'compact', 'adjustable', 'storage'],
    reviews: {
      positive: "Great value for money! Compact design saves space and still delivers consistent slices. Easy to store.",
      negative: "Not as sturdy as more expensive models. Safety guard could be better designed. Limited to lighter vegetables."
    }
  }
];

export const categories = [
  'Groceries',
  'Household',
  'Pet Supplies',
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Health & Beauty',
  'Sports & Outdoors'
];

export const subcategories = {
  'Groceries': ['Dairy', 'Fruits', 'Vegetables', 'Meat', 'Grains', 'Spices', 'Canned Goods'],
  'Household': ['Paper Products', 'Laundry', 'Cleaning', 'Kitchen'],
  'Pet Supplies': ['Dog Food', 'Cat Food', 'Toys', 'Accessories'],
  'Electronics': ['TVs', 'Phones', 'Computers', 'Audio'],
  'Clothing': ['Men', 'Women', 'Kids', 'Shoes'],
  'Home & Garden': ['Furniture', 'Decor', 'Garden', 'Tools'],
  'Health & Beauty': ['Skincare', 'Haircare', 'Vitamins', 'Personal Care'],
  'Sports & Outdoors': ['Fitness', 'Outdoor', 'Sports Equipment', 'Activewear']
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}; 