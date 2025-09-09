import { memo } from 'react';

// Ultra-fast, lightweight loading spinner
const FastLoadingSpinner = memo(({ size = 24, className = '' }: { 
  size?: number; 
  className?: string; 
}) => (
  <div 
    className={`inline-block animate-spin rounded-full border-2 border-primary border-r-transparent ${className}`}
    style={{ width: size, height: size }}
    role="status"
    aria-label="Loading"
  >
    <span className="sr-only">Loading...</span>
  </div>
));

FastLoadingSpinner.displayName = 'FastLoadingSpinner';

export default FastLoadingSpinner;