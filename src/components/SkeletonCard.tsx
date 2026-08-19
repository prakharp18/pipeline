import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-circle" />
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-badge" />
    </div>
  );
};
