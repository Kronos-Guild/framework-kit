// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';

import { DashboardShell } from './DashboardShell';

afterEach(() => {
	cleanup();
});
describe('DashboardShell', () => {
	//basic rendering test
	it('renders without crashing', () => {
		render(
			<DashboardShell data-testid="shell">
				<p>Content</p>
			</DashboardShell>,
		);
		expect(screen.getByTestId('shell')).toBeInTheDocument();
	});
	//test to see that children are rendered
	it('renders children content', () => {
		render(
			<DashboardShell>
				<p data-testid="child">Hello World</p>
			</DashboardShell>,
		);
		expect(screen.getByTestId('child')).toBeInTheDocument();
		expect(screen.getByText('Hello World')).toBeInTheDocument();
	});
	// test to see that header slot works
	it('renders header when provided', () => {
		render(
			<DashboardShell header={<nav data-testid="header">Navigation</nav>}>
				<p>Content</p>
			</DashboardShell>,
		);
		expect(screen.getByTestId('header')).toBeInTheDocument();
		expect(screen.getByText('Navigation')).toBeInTheDocument();
	});
	// test that header is optional
	it('does not render header element when not provided', () => {
		render(
			<DashboardShell data-testid="shell">
				<p>Content</p>
			</DashboardShell>,
		);
		expect(screen.queryByRole('banner')).not.toBeInTheDocument();
	});
	// test that light theme is the default
	it('applies light theme by default', () => {
		render(
			<DashboardShell data-testid="shell">
				<p>Content</p>
			</DashboardShell>,
		);
		expect(screen.getByTestId('shell')).toHaveClass('bg-zinc-100');
	});
	// test that dark theme is applied when specified
	it('applies dark theme when specified', () => {
		render(
			<DashboardShell data-testid="shell" theme="dark">
				<p>Content</p>
			</DashboardShell>,
		);
		expect(screen.getByTestId('shell')).toHaveClass('bg-zinc-900');
	});
	// test that custom classes are applied
	it('applies custom className', () => {
		render(
			<DashboardShell data-testid="shell" className="custom-class">
				<p>Content</p>
			</DashboardShell>,
		);
		expect(screen.getByTestId('shell')).toHaveClass('custom-class');
	});
	//test that props are passed through
	it('passes through additional props', () => {
		render(
			<DashboardShell data-testid="shell" id="my-shell" aria-label="Dashboard">
				<p>Content</p>
			</DashboardShell>,
		);
		const shell = screen.getByTestId('shell');
		expect(shell).toHaveAttribute('id', 'my-shell');
		expect(shell).toHaveAttribute('aria-label', 'Dashboard');
	});
	// test that dot grid shows by default
	it('renders dot grid background pattern by default', () => {
		render(
			<DashboardShell data-testid="shell">
				<p>Content</p>
			</DashboardShell>,
		);
		const shell = screen.getByTestId('shell');
		const dotGrid = shell.querySelector('[aria-hidden="true"]');
		expect(dotGrid).toBeInTheDocument();
	});
	// test that dot grid can be hidden
	it('hides dot grid when showDotGrid is false', () => {
		render(
			<DashboardShell data-testid="shell" showDotGrid={false}>
				<p>Content</p>
			</DashboardShell>,
		);
		const shell = screen.getByTestId('shell');
		const dotGrid = shell.querySelector('[aria-hidden="true"]');
		expect(dotGrid).not.toBeInTheDocument();
	});
	//test for semantic HTML structure
	it('uses semantic HTML elements', () => {
		render(
			<DashboardShell header={<span>Nav</span>}>
				<p>Content</p>
			</DashboardShell>,
		);
		// header slot renders inside <header> element
		expect(screen.getByRole('banner')).toBeInTheDocument();
		// children render inside <main> element
		expect(screen.getByRole('main')).toBeInTheDocument();
	});
});
