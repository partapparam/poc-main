import React from "react";

const UserDetails = () => {
  const value = localStorage.getItem('user');
  return value ? JSON.parse(value) : null;
};

export default UserDetails;