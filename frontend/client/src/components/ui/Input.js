import React from 'react';
import clsx from 'clsx';

/**
 * Input component with optional icon and clean styling.
 */
export function Input({ className, icon, ...props }) {
    return (
        <div className="relative w-full">
            {icon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    {icon}
                </div>
            )}
            <input
                className={clsx(
                    "block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 sm:text-sm py-3 transition-all duration-200 outline-none",
                    icon ? "pl-10" : "pl-4",
                    className
                )}
                {...props}
            />
        </div>
    );
}
