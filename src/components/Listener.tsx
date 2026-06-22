import React, { useEffect } from "react";

const Listener = () => {
 useEffect(() => {
  fetch('http://localhost:3001/api/products')
    .then(res => {
      console.log('status:', res.status);
      return res.json();
    })
    .then(data => console.log('data:', data))
    .catch(err => console.error('fetch error:', err));
}, []);

  return <div></div>;
};

export default Listener;
