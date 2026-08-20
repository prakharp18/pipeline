import React from 'react';
import styles from './LoadingSkeleton.module.css';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className={styles['skeleton-card']}>
      <div className={styles['sk-shimmer']} />
      <div className={styles['sk-el']} style={{ width: '100%', height: '14px', marginBottom: 'auto' }} />
      <div className={styles['sk-el']} style={{ width: '90px', height: '90px', borderRadius: '50%', marginBottom: '1rem' }} />
      <div className={styles['sk-el']} style={{ width: '70%', height: '18px', marginBottom: '0.75rem' }} />
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        <div className={styles['sk-el']} style={{ width: '50px', height: '22px', borderRadius: '99px' }} />
        <div className={styles['sk-el']} style={{ width: '50px', height: '22px', borderRadius: '99px' }} />
      </div>
    </div>
  );
};
