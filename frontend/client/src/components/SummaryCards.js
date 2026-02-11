import React from 'react';
import { Card } from './ui/Card';
import { formatCurrency } from '../utils/format';
import { ArrowUp, ArrowDown, Wallet } from 'lucide-react';

function SummaryItem({ title, value, icon: Icon, color, trend }) {
    return (
        <Card className="flex-1 min-w-[250px]">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(value)}</h3>
                </div>
                <div className={`p-3 rounded-xl ${color}`}>
                    <Icon size={24} className="text-white" />
                </div>
            </div>
            {/* Visual only progress bar for "premium" feel */}
            <div className="mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${color.replace('bg-', 'bg-opacity-80 bg-')}`} style={{ width: '70%' }}></div>
            </div>
        </Card>
    );
}

export function SummaryCards({ summary }) {
    if (!summary) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <SummaryItem
                title="Receitas"
                value={summary.totalIncome}
                icon={ArrowUp}
                color="bg-green-500"
            />
            <SummaryItem
                title="Despesas"
                value={summary.totalExpense}
                icon={ArrowDown}
                color="bg-red-500"
            />
            <SummaryItem
                title="Saldo Atual"
                value={summary.balance}
                icon={Wallet}
                color="bg-indigo-600"
            />
        </div>
    );
}
