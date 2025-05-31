
import React from 'react';

// Temporary debug component to help identify Navigation issues
const NavigationDebug: React.FC = () => {
  console.log('NavigationDebug: Component loaded successfully');
  
  return (
    <div className="fixed top-0 left-0 bg-red-500 text-white p-2 text-xs z-50">
      Navigation Debug: Checking for issues...
    </div>
  );
};

export default NavigationDebug;
