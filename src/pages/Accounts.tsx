import React, { useState } from 'react';
import { Wallet, CreditCard, ArrowUpRight, ArrowDownRight, Plus, DollarSign } from 'lucide-react';
import { Transaction, Account } from '../types';

const Accounts: React.FC = () => {
  const [accounts] = useState<Account[]>([
    {
      id: '1',
      name: 'Main Operating Account',
      balance: 250000,
      type: 'current',
      bank_name: 'State Bank of India',
      account_number: 'XXXX1234',
      ifsc_code: 'SBIN0001234'
    },
    {
      id: '2',
      name: 'Savings Account',
      balance: 150000,
      type: 'savings',
      bank_name: 'HDFC Bank',
      account_number: 'XXXX5678',
      ifsc_code: 'HDFC0001234'
    }
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      amount: 25000,
      type: 'credit',
      description: 'Payment received for wheat delivery',
      category: 'sales',
      date: '2024-03-15',
      member_id: '1'
    },
    {
      id: '2',
      amount: 15000,
      type: 'debit',
      description: 'Equipment maintenance',
      category: 'maintenance',
      date: '2024-03-14',
      member_id: '2'
    }
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Account Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Track and manage all financial accounts and transactions.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </button>
        </div>
      </div>

     
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <div key={account.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Wallet className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {account.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        ₹{account.balance.toLocaleString()}
                      </div>
                    </dd>
                    <dt className="mt-2 text-sm text-gray-500">
                      {account.bank_name} • {account.account_number}
                    </dt>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Recent Transactions</h2>
        <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <li key={transaction.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 rounded-full p-2 ${
                        transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <ArrowUpRight className={`h-5 w-5 text-green-600`} />
                        ) : (
                          <ArrowDownRight className={`h-5 w-5 text-red-600`} />
                        )}
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className={`text-sm font-semibold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Accounts;