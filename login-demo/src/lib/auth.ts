export interface User {
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  phone: string;
}

const AUTH_STORAGE_KEY = 'auth_user';

/**
 * Validates whether a given phone number is a valid Iranian mobile number.
 *
 * Supported formats:
 * - `09xxxxxxxxx` (11 digits, starts with 09)
 * - `+989xxxxxxxxx` (13 characters, starts with +989)
 * - `00989xxxxxxxxx` (13 digits, starts with 00989)
 *
 * The function removes spaces and special characters (except `+` and digits) before validation.
 *
 * @param phone - The phone number to validate.
 * @returns `true` if the phone number matches one of the valid Iranian mobile formats, otherwise `false`.
 */
export const validateIranianMobile = (phone: string): boolean => {
  // Remove all spaces and special characters except + and digits
  const cleanPhone = phone.replace(/[\s-()]/g, '');
  
  // Valid Iranian mobile formats:
  // 09xxxxxxxxx (11 digits)
  // +989xxxxxxxxx (13 chars)
  // 00989xxxxxxxxx (13 digits)
  
  const patterns = [
    /^09\d{9}$/,           // 09xxxxxxxxx
    /^\+989\d{9}$/,        // +989xxxxxxxxx  
    /^00989\d{9}$/         // 00989xxxxxxxxx
  ];
  
  return patterns.some(pattern => pattern.test(cleanPhone));
};

export const normalizeIranianMobile = (phone: string): string => {
  const cleanPhone = phone.replace(/[\s-()]/g, '');
  
  // Convert all formats to 09xxxxxxxxx
  if (cleanPhone.startsWith('+989')) {
    return '0' + cleanPhone.slice(4);
  }
  if (cleanPhone.startsWith('00989')) {
    return '0' + cleanPhone.slice(5);
  }
  return cleanPhone;
};

export const fetchRandomUser = async (): Promise<User> => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=1&nat=us');
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    
    const data = await response.json();
    return data.results[0] as User;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Unable to authenticate. Please try again.');
  }
};

export const saveUser = (user: User, phone: string): void => {
  const userWithPhone = { ...user, phone };
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userWithPhone));
};

export const getStoredUser = (): (User & { phone: string }) | null => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const clearStoredUser = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const isAuthenticated = (): boolean => {
  return getStoredUser() !== null;
};