import React, { useState, useEffect } from 'react';

function AjaxComponent() {
  const [users,setUsers] = useState([]);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Step 4: Make an AJAX request using XMLHttpRequest
    const xhr = new XMLHttpRequest();
    
    // Open a GET request to fetch data
    xhr.open('GET', 'http://localhost:5000/users', true);
    
    // Handle the response when the request is complete
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Parse the JSON data
        const response = JSON.parse(xhr.responseText);
        setUsers(response);
        setLoading(false);
      } else {
        setError(`Request failed with status: ${xhr.status}`);
        setLoading(false);
      }
    };
    
    // Handle network errors
    xhr.onerror = function () {
      setError('Network error occurred');
      setLoading(false);
    };

    // Send the request
    xhr.send();
  }, []); // Empty dependency array means this effect will run only once

  // Step 5: Display loading, error, or fetched data
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Fetched Data Using AJAX:</h1>
      <ul>
       {users.map(user=>(
        <li key={user.id}>{user.name} - {user.email} </li>
                  ))}
      </ul>
    </div>
  );
}

export default AjaxComponent;

