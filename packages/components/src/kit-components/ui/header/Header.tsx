import type React from 'react';

interface HeaderProps {
	title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
	return (
		<header className="bg-gray-100 p-4 border-b border-gray-300">
			<h1 className="text-xl font-bold text-gray-800">{title}</h1>
		</header>
	);
};
