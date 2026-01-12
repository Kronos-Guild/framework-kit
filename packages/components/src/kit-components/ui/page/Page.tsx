import type React from 'react';

interface PageProps {
	children: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({ children }) => {
	return <div className="p-6 bg-white shadow-md rounded-md w-full">{children}</div>;
};
