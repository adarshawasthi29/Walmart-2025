import React from 'react';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { userData } from '../data/userData';

const SavingsTracker: React.FC = () => {
  return (
    <div className="walmart-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Savings</h3>
        <DollarSign className="h-5 w-5 text-green-500" />
      </div>
      
      <div className="space-y-4">
        {/* Current Order Savings */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Order</p>
              <p className="text-2xl font-bold text-green-600">
                ${userData.currentOrderSavings.toFixed(2)}
              </p>
            </div>
            <TrendingUp className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {userData.currentOrderSavings > 0 ? 'Smart recommendations working!' : 'Add items to see savings'}
          </p>
        </div>

        {/* Total Savings */}
        <div className="bg-walmart-lightblue rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Lifetime Savings</p>
              <p className="text-2xl font-bold text-walmart-blue">
                ${userData.totalSavings.toFixed(2)}
              </p>
            </div>
            <Calendar className="h-6 w-6 text-walmart-blue" />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Since {new Date(userData.joinDate).toLocaleDateString()}
          </p>
        </div>

        {/* Membership Benefits */}
        <div className="bg-walmart-yellow bg-opacity-20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Membership</p>
              <p className="text-lg font-bold text-walmart-darkblue capitalize">
                {userData.membershipLevel}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Additional</p>
              <p className="text-sm font-semibold text-walmart-darkblue">
                {userData.membershipLevel === 'plus' ? '5%' : '2%'} off
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Smart Cart Impact</h4>
          <div className="space-y-1 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Avg. savings per order:</span>
              <span className="font-medium">${(userData.totalSavings / 12).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Best deal found:</span>
              <span className="font-medium text-green-600">25% off</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsTracker; 