export const getInitials = (username: string): string => {
  if (!username) {
    return '';
  }

  const parts = username.split(' ').filter(Boolean);

  if (parts.length === 1) {
    return username.substring(0, 2).toUpperCase();
  } else {
    const firstInitial = parts[0].charAt(0).toUpperCase();
    const secondInitial = parts[1].charAt(0).toUpperCase();
    return `${firstInitial}${secondInitial}`;
  }
};