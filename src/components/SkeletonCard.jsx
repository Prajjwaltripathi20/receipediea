import React from 'react';
import '../styles/SkeletonCard.css';

const SkeletonCard = () => {
    return (
        <div className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-meta">
                    <div className="skeleton-badge"></div>
                    <div className="skeleton-badge"></div>
                </div>
                <div className="skeleton-button"></div>
            </div>
        </div>
    );
};

export default SkeletonCard;
