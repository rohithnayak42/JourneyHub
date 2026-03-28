import React from 'react';

/**
 * ModifySearchButton
 * A reusable back-navigation button for all search result pages.
 * Calls window.history.back() on click to return the user to the search form.
 */
const ModifySearchButton = () => {
  return (
    <button
      onClick={() => window.history.back()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '8px 14px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#555',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'background 0.18s ease, border-color 0.18s ease, color 0.18s ease',
        lineHeight: '1',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = '#f5f5f5';
        e.currentTarget.style.borderColor = '#bbb';
        e.currentTarget.style.color = '#222';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = '#fff';
        e.currentTarget.style.borderColor = '#ddd';
        e.currentTarget.style.color = '#555';
      }}
      aria-label="Go back and modify your search"
    >
      ← Modify Search
    </button>
  );
};

export default ModifySearchButton;
