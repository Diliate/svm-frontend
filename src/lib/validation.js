export const validatePassword = (password) => {
  // At least one lowercase letter, one uppercase letter, one digit, one special character, and minimum 6 characters
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{6,}$/;
  return passwordRegex.test(password);
};
