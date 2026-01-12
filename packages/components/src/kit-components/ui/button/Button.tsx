import type React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'default' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'default', ...props }) => {
	const baseStyles = 'px-4 py-2 rounded text-sm font-medium';
	const variantStyles = variant === 'outline' ? 'border border-gray-300 text-gray-700' : 'bg-blue-500 text-white';

	return <button className={`${baseStyles} ${variantStyles}`} {...props} />;
};
