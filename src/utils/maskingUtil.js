const maskEmail = (email) => {
  if (!email) return "";
  const [username, domain] = email.split("@");
  if (!domain) return email;
  const visibleLength = 3;
  if (username.length <= visibleLength) {
    return `${username}***@${domain}`;
  }
  const visiblePart = username.slice(0, visibleLength);
  const maskedPart = "*".repeat(username.length - visibleLength);
  return `${visiblePart}${maskedPart}@${domain}`;
};

const maskMobile = (mobile) => {
  if (!mobile) return "";
  const visibleStart = 3;
  const visibleEnd = 2;
  if (mobile.length <= visibleStart + visibleEnd) {
    return "*".repeat(mobile.length);
  }
  const start = mobile.slice(0, visibleStart);
  const end = mobile.slice(-visibleEnd);
  const maskedMiddle = "*".repeat(mobile.length - visibleStart - visibleEnd);
  return `${start}${maskedMiddle}${end}`;
};
