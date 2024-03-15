export const UserDetails = () => {
  const value = localStorage.getItem('user');
  if(!value){
    localStorage.clear();
  }
  return value ? JSON.parse(value) : null;
};
export const commonMail = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'icloud.com', 'protonmail.com'];
