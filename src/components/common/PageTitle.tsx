import React from 'react';

/**
 * Page Title Props Interface
 */
interface PageTitleProps {
  children: React.ReactNode;
  centered?: boolean;
  level?: 1 | 2 | 3;
  className?: string;
}

/**
 * Reusable Page Title Component
 * Provides consistent styling for page headings
 * 
 * @example
 * <PageTitle>Users</PageTitle>
 * <PageTitle level={2} centered>Login</PageTitle>
 */
const PageTitle: React.FC<PageTitleProps> = ({ 
  children, 
  centered = false,
  level = 1,
  className = '',
}) => {
  const baseClasses = 'text-2xl font-bold text-text-primary mb-6';
  const alignmentClass = centered ? 'text-center' : '';
  const combinedClasses = `${baseClasses} ${alignmentClass} ${className}`.trim();
  
  // Render appropriate heading level
  if (level === 2) {
    return <h2 className={combinedClasses}>{children}</h2>;
  }
  if (level === 3) {
    return <h3 className={combinedClasses}>{children}</h3>;
  }
  return <h1 className={combinedClasses}>{children}</h1>;
};

export default PageTitle;
