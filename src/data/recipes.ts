import { Product } from './products';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  servings: number;
  prepTime: number;
  cookTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  cuisine: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
  tags: string[];
}

export interface RecipeIngredient {
  name: string;
  amount: number;
  unit: string;
  productId?: string; // Maps to our product catalog
  alternatives?: string[]; // Alternative product names
  category: string;
}

export const recipes: Recipe[] = [
  {
    id: 'chicken-tikka-masala',
    name: 'Chicken Tikka Masala',
    description: 'A popular Indian curry dish with marinated chicken in a creamy tomato-based sauce',
    servings: 4,
    prepTime: 30,
    cookTime: 45,
    difficulty: 'medium',
    cuisine: 'Indian',
    ingredients: [
      {
        name: 'Boneless Chicken Breast',
        amount: 2,
        unit: 'lbs',
        productId: '3',
        category: 'Meat'
      },
      {
        name: 'Basmati Rice',
        amount: 2,
        unit: 'cups',
        productId: '4',
        category: 'Grains'
      },
      {
        name: 'Plain Greek Yogurt',
        amount: 1,
        unit: 'cup',
        productId: '6',
        category: 'Dairy'
      },
      {
        name: 'Diced Tomatoes',
        amount: 1,
        unit: 'can',
        productId: '9',
        category: 'Canned Goods'
      },
      {
        name: 'Coconut Milk',
        amount: 1,
        unit: 'can',
        productId: '10',
        category: 'Canned Goods'
      },
      {
        name: 'Yellow Onions',
        amount: 2,
        unit: 'medium',
        productId: '7',
        category: 'Vegetables'
      },
      {
        name: 'Fresh Garlic',
        amount: 6,
        unit: 'cloves',
        productId: '8',
        category: 'Vegetables'
      },
      {
        name: 'Garam Masala',
        amount: 2,
        unit: 'tbsp',
        productId: '5',
        category: 'Spices'
      },
      {
        name: 'Fresh Ginger',
        amount: 1,
        unit: 'inch piece',
        alternatives: ['Ground Ginger'],
        category: 'Spices'
      },
      {
        name: 'Cumin Powder',
        amount: 1,
        unit: 'tsp',
        category: 'Spices'
      },
      {
        name: 'Paprika',
        amount: 1,
        unit: 'tsp',
        category: 'Spices'
      },
      {
        name: 'Heavy Cream',
        amount: 0.5,
        unit: 'cup',
        category: 'Dairy'
      },
      {
        name: 'Vegetable Oil',
        amount: 3,
        unit: 'tbsp',
        category: 'Cooking Oil'
      },
      {
        name: 'Salt',
        amount: 1,
        unit: 'tsp',
        category: 'Spices'
      },
      {
        name: 'Black Pepper',
        amount: 0.5,
        unit: 'tsp',
        category: 'Spices'
      }
    ],
    instructions: [
      'Cut chicken into bite-sized pieces and marinate with yogurt, garlic, ginger, and spices for 30 minutes',
      'Heat oil in a large pan and cook marinated chicken until golden',
      'In the same pan, sauté onions until golden brown',
      'Add tomatoes, coconut milk, and remaining spices',
      'Simmer for 20 minutes until sauce thickens',
      'Add cooked chicken back to sauce and simmer for 10 minutes',
      'Stir in heavy cream and serve hot with basmati rice'
    ],
    tags: ['indian', 'curry', 'chicken', 'dinner', 'spicy']
  },
  {
    id: 'pasta-marinara',
    name: 'Pasta Marinara',
    description: 'Classic Italian pasta with tomato-based marinara sauce',
    servings: 4,
    prepTime: 10,
    cookTime: 20,
    difficulty: 'easy',
    cuisine: 'Italian',
    ingredients: [
      {
        name: 'Pasta',
        amount: 1,
        unit: 'lb',
        category: 'Grains'
      },
      {
        name: 'Diced Tomatoes',
        amount: 2,
        unit: 'cans',
        productId: '9',
        category: 'Canned Goods'
      },
      {
        name: 'Yellow Onions',
        amount: 1,
        unit: 'medium',
        productId: '7',
        category: 'Vegetables'
      },
      {
        name: 'Fresh Garlic',
        amount: 4,
        unit: 'cloves',
        productId: '8',
        category: 'Vegetables'
      },
      {
        name: 'Olive Oil',
        amount: 3,
        unit: 'tbsp',
        category: 'Cooking Oil'
      },
      {
        name: 'Basil',
        amount: 2,
        unit: 'tbsp',
        category: 'Herbs'
      },
      {
        name: 'Oregano',
        amount: 1,
        unit: 'tsp',
        category: 'Spices'
      },
      {
        name: 'Salt',
        amount: 1,
        unit: 'tsp',
        category: 'Spices'
      },
      {
        name: 'Black Pepper',
        amount: 0.5,
        unit: 'tsp',
        category: 'Spices'
      }
    ],
    instructions: [
      'Cook pasta according to package directions',
      'Heat olive oil in a large pan',
      'Sauté onions until translucent',
      'Add garlic and cook for 1 minute',
      'Add tomatoes, basil, oregano, salt, and pepper',
      'Simmer for 15 minutes',
      'Toss with cooked pasta and serve'
    ],
    tags: ['italian', 'pasta', 'vegetarian', 'dinner', 'easy']
  },
  {
    id: 'beef-tacos',
    name: 'Beef Tacos',
    description: 'Delicious ground beef tacos with fresh toppings',
    servings: 4,
    prepTime: 15,
    cookTime: 15,
    difficulty: 'easy',
    cuisine: 'Mexican',
    ingredients: [
      {
        name: 'Ground Beef',
        amount: 1,
        unit: 'lb',
        category: 'Meat'
      },
      {
        name: 'Taco Shells',
        amount: 8,
        unit: 'pieces',
        category: 'Grains'
      },
      {
        name: 'Yellow Onions',
        amount: 1,
        unit: 'small',
        productId: '7',
        category: 'Vegetables'
      },
      {
        name: 'Fresh Garlic',
        amount: 2,
        unit: 'cloves',
        productId: '8',
        category: 'Vegetables'
      },
      {
        name: 'Shredded Cheese',
        amount: 1,
        unit: 'cup',
        category: 'Dairy'
      },
      {
        name: 'Lettuce',
        amount: 2,
        unit: 'cups',
        category: 'Vegetables'
      },
      {
        name: 'Tomatoes',
        amount: 2,
        unit: 'medium',
        category: 'Vegetables'
      },
      {
        name: 'Sour Cream',
        amount: 0.5,
        unit: 'cup',
        category: 'Dairy'
      },
      {
        name: 'Cumin',
        amount: 1,
        unit: 'tsp',
        category: 'Spices'
      },
      {
        name: 'Chili Powder',
        amount: 1,
        unit: 'tsp',
        category: 'Spices'
      },
      {
        name: 'Salt',
        amount: 0.5,
        unit: 'tsp',
        category: 'Spices'
      }
    ],
    instructions: [
      'Brown ground beef in a large skillet',
      'Add onions and garlic, cook until softened',
      'Add spices and cook for 1 minute',
      'Warm taco shells according to package directions',
      'Fill shells with beef mixture',
      'Top with cheese, lettuce, tomatoes, and sour cream'
    ],
    tags: ['mexican', 'beef', 'tacos', 'dinner', 'easy']
  }
];

export const scaleRecipe = (recipe: Recipe, targetServings: number): Recipe => {
  const scaleFactor = targetServings / recipe.servings;
  
  return {
    ...recipe,
    servings: targetServings,
    ingredients: recipe.ingredients.map(ingredient => ({
      ...ingredient,
      amount: Math.round((ingredient.amount * scaleFactor) * 100) / 100
    }))
  };
};

export const findRecipeByName = (name: string): Recipe | undefined => {
  const lowerName = name.toLowerCase();
  return recipes.find(recipe => 
    recipe.name.toLowerCase().includes(lowerName) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(lowerName))
  );
};

export const getRecipeIngredients = (recipeName: string, servings: number = 4): RecipeIngredient[] => {
  const recipe = findRecipeByName(recipeName);
  if (!recipe) return [];
  
  const scaledRecipe = scaleRecipe(recipe, servings);
  return scaledRecipe.ingredients;
};

// Common recipe variations and their mappings
export const recipeVariations: { [key: string]: string } = {
  'chicken tikka masala': 'chicken-tikka-masala',
  'chicken tikka': 'chicken-tikka-masala',
  'tikka masala': 'chicken-tikka-masala',
  'indian chicken curry': 'chicken-tikka-masala',
  'pasta marinara': 'pasta-marinara',
  'marinara pasta': 'pasta-marinara',
  'spaghetti marinara': 'pasta-marinara',
  'beef tacos': 'beef-tacos',
  'ground beef tacos': 'beef-tacos',
  'taco': 'beef-tacos',
  'tacos': 'beef-tacos'
};

export const parseRecipeCommand = (command: string): { recipeName: string; servings: number } | null => {
  const lowerCommand = command.toLowerCase();
  
  // Extract servings number
  const servingsMatch = lowerCommand.match(/for (\d+) people?/);
  const servings = servingsMatch ? parseInt(servingsMatch[1]) : 4;
  
  // Find recipe name
  for (const [variation, recipeId] of Object.entries(recipeVariations)) {
    if (lowerCommand.includes(variation)) {
      return { recipeName: recipeId, servings };
    }
  }
  
  return null;
}; 