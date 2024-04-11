import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Success() {
  const navigate = useNavigate();

  // Redirect to scanner.js page after 5 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/'); // Replace '/' with the actual route to your scanner.js page
    }, 9000); // 5000 milliseconds (5 seconds)

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return <div>You are Done! Redirecting...</div>;
}

export default Success;
