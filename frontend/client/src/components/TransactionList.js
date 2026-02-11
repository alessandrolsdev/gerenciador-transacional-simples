import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpCircle, ArrowDownCircle, Trash2, Edit2 } from 'lucide-react';
import { Card } from './ui/Card';
import { formatCurrency, formatDate } from '../utils/format';
import clsx from 'clsx';

function TransactionItem({ tx, onDelete, onEdit }) {
    const isIncome = tx.type === 'INCOME';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center justify-between p-4 mb-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
        >
            <div className="flex items-center gap-4">
                <div className={clsx("p-2 rounded-full", isIncome ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600")}>
                    {isIncome ? <ArrowUpCircle size={24} /> : <ArrowDownCircle size={24} />}
                </div>
                <div>
                    <p className="font-semibold text-gray-900">{tx.description}</p>
                    <p className="text-xs text-gray-500">{tx.category} • {formatDate(tx.createdAt)}</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <span className={clsx("font-bold", isIncome ? "text-green-600" : "text-gray-900")}>
                    {isIncome ? '+' : '-'} {formatCurrency(tx.amount)}
                </span>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(tx)} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                        <Edit2 size={16} />
                    </button>
                    <button onClick={() => onDelete(tx.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export function TransactionList({ transactions, onDelete, onEdit }) {
    if (transactions.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                <p>Nenhuma transação encontrada.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <AnimatePresence>
                {transactions.map(tx => (
                    <TransactionItem key={tx.id} tx={tx} onDelete={onDelete} onEdit={onEdit} />
                ))}
            </AnimatePresence>
        </div>
    );
}
