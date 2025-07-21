import React from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';

const ClerkTest = () => {
  const { user, isLoaded } = useUser();
  const { openSignIn, openSignUp } = useClerk();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', margin: '20px' }}>
      <h2>Clerk Test Component</h2>
      <p>Clerk is {isLoaded ? 'loaded' : 'not loaded'}</p>
      <p>User is {user ? 'signed in' : 'not signed in'}</p>
      
      {user ? (
        <div>
          <p>User ID: {user.id}</p>
          <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
          <p>Name: {user.fullName || user.firstName || 'No name'}</p>
        </div>
      ) : (
        <div>
          <button 
            onClick={() => openSignIn()}
            style={{ 
              padding: '10px 15px', 
              background: '#6b8e23', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              marginRight: '10px',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
          <button 
            onClick={() => openSignUp()}
            style={{ 
              padding: '10px 15px', 
              background: '#4a6c2a', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default ClerkTest;