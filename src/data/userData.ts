export interface UserData {
  id: string;
  name: string;
  email: string;
  totalSavings: number;
  currentOrderSavings: number;
  membershipLevel: 'basic' | 'premium' | 'plus';
  joinDate: string;
  preferredCategories: string[];
  budgetPreferences: {
    grocery: number;
    household: number;
    electronics: number;
    petSupplies: number;
  };
}

export interface ConsumptionPattern {
  productId: string;
  productName: string;
  category: string;
  averageConsumptionDays: number;
  lastPurchaseDate: string;
  nextRecommendedDate: string;
  quantity: number;
  priority: 'high' | 'medium' | 'low';
  confidence: number; // 0-1 scale
}

export interface PurchaseHistory {
  id: string;
  date: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  savings: number;
}

export const userData: UserData = {
  id: 'user-123',
  name: 'John Doe',
  email: 'john.doe@email.com',
  totalSavings: 347.82,
  currentOrderSavings: 0,
  membershipLevel: 'plus',
  joinDate: '2023-01-15',
  preferredCategories: ['Groceries', 'Household', 'Pet Supplies'],
  budgetPreferences: {
    grocery: 150,
    household: 50,
    electronics: 200,
    petSupplies: 75
  }
};

export const consumptionPatterns: ConsumptionPattern[] = [
  {
    productId: '1',
    productName: 'Great Value Whole Milk',
    category: 'Groceries',
    averageConsumptionDays: 7,
    lastPurchaseDate: '2024-01-15',
    nextRecommendedDate: '2024-01-22',
    quantity: 2,
    priority: 'high',
    confidence: 0.95
  },
  {
    productId: '2',
    productName: 'Bananas',
    category: 'Groceries',
    averageConsumptionDays: 5,
    lastPurchaseDate: '2024-01-18',
    nextRecommendedDate: '2024-01-23',
    quantity: 2,
    priority: 'medium',
    confidence: 0.88
  },
  {
    productId: '11',
    productName: 'Bounty Paper Towels',
    category: 'Household',
    averageConsumptionDays: 19,
    lastPurchaseDate: '2024-01-10',
    nextRecommendedDate: '2024-01-29',
    quantity: 1,
    priority: 'medium',
    confidence: 0.92
  },
  {
    productId: '12',
    productName: 'Tide Laundry Detergent',
    category: 'Household',
    averageConsumptionDays: 28,
    lastPurchaseDate: '2024-01-05',
    nextRecommendedDate: '2024-02-02',
    quantity: 1,
    priority: 'low',
    confidence: 0.85
  },
  {
    productId: '13',
    productName: 'Charmin Ultra Soft Toilet Paper',
    category: 'Household',
    averageConsumptionDays: 21,
    lastPurchaseDate: '2024-01-12',
    nextRecommendedDate: '2024-02-02',
    quantity: 1,
    priority: 'medium',
    confidence: 0.9
  },
  {
    productId: '14',
    productName: 'Pedigree Adult Dry Dog Food',
    category: 'Pet Supplies',
    averageConsumptionDays: 32,
    lastPurchaseDate: '2024-01-08',
    nextRecommendedDate: '2024-02-09',
    quantity: 1,
    priority: 'high',
    confidence: 0.97
  },
  {
    productId: '15',
    productName: 'Friskies Cat Food Variety Pack',
    category: 'Pet Supplies',
    averageConsumptionDays: 25,
    lastPurchaseDate: '2024-01-14',
    nextRecommendedDate: '2024-02-08',
    quantity: 1,
    priority: 'high',
    confidence: 0.93
  }
];

export const purchaseHistory: PurchaseHistory[] = [
  {
    id: 'ph-001',
    date: '2024-01-15',
    productId: '1',
    productName: 'Great Value Whole Milk',
    quantity: 2,
    price: 6.96,
    savings: 0.52
  },
  {
    id: 'ph-002',
    date: '2024-01-15',
    productId: '2',
    productName: 'Bananas',
    quantity: 3,
    price: 1.74,
    savings: 0.26
  },
  {
    id: 'ph-003',
    date: '2024-01-10',
    productId: '11',
    productName: 'Bounty Paper Towels',
    quantity: 1,
    price: 18.97,
    savings: 3.00
  },
  {
    id: 'ph-004',
    date: '2024-01-08',
    productId: '14',
    productName: 'Pedigree Adult Dry Dog Food',
    quantity: 1,
    price: 22.98,
    savings: 2.50
  },
  {
    id: 'ph-005',
    date: '2024-01-05',
    productId: '12',
    productName: 'Tide Laundry Detergent',
    quantity: 1,
    price: 12.97,
    savings: 1.75
  }
];

export const getRecommendedRefills = (): ConsumptionPattern[] => {
  const today = new Date();
  return consumptionPatterns.filter(pattern => {
    const nextDate = new Date(pattern.nextRecommendedDate);
    const daysDiff = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff <= 7; // Show items needed within next 7 days
  }).sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
};

export const updateUserSavings = (orderSavings: number): void => {
  userData.currentOrderSavings = orderSavings;
  userData.totalSavings += orderSavings;
}; 