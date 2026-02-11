import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

/**
 * Reusable Card component with entrance animation.
 * Follows "Glassmorphism" light style if needed, but defaults to clean white.
 */
export function Card({ children, className, ...props }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={clsx(
                "bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
}
