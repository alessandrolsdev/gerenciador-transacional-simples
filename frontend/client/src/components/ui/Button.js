import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

/**
 * Button component with variants and tap/hover animations.
 * @param {string} variant - 'primary', 'secondary', 'danger', 'ghost'
 */
export function Button({ children, className, variant = 'primary', ...props }) {
    const baseStyles = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm hover:shadow",
        secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className={clsx(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </motion.button>
    );
}
