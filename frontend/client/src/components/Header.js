import React from 'react';
import { User, LogOut } from 'lucide-react';
import { Button } from './ui/Button';

export function Header({ user }) {
    return (
        <header className="flex items-center justify-between py-6 mb-8 animate-fade-in-down">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
                    💸
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Relay Flow</h1>
                    <p className="text-xs text-gray-500">Gerenciador Financeiro</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                        <User size={18} />
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden sm:block">
                        {user?.name || 'Visitante'}
                    </span>
                </div>
                <Button variant="ghost" className="!p-2 text-gray-400 hover:text-gray-600">
                    <LogOut size={20} />
                </Button>
            </div>
        </header>
    );
}
