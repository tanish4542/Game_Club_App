// Date utility functions

export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString();
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleString();
};

export const formatDateForAPI = (date) => {
  if (!date) return '';
  return new Date(date).toISOString();
};

export const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // YYYY-MM-DD format
};

export const getTodayTimestamp = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of day
  return today.getTime();
};

export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '₹0';
  return `₹${amount.toFixed(2)}`;
};
