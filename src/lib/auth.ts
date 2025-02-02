import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { User, AuthState } from '../types/auth';

const SALT_ROUNDS = 10;
const USERS_KEY = 'users';
const SESSION_KEY = 'session';

interface StoredUser extends Omit<User, 'id'> {
  id: string;
  password: string;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): string[] => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return errors;
};

const getStoredUsers = (): StoredUser[] => {
  const usersJson = localStorage.getItem(USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

const saveUsers = (users: StoredUser[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const signUp = async (
  email: string,
  password: string,
  name: string
): Promise<User> => {
  // Validate input
  if (!validateEmail(email)) {
    throw new AuthError('Invalid email format');
  }

  const passwordErrors = validatePassword(password);
  if (passwordErrors.length > 0) {
    throw new AuthError(passwordErrors.join(', '));
  }

  // Check if user exists
  const users = getStoredUsers();
  if (users.some(user => user.email === email)) {
    throw new AuthError('User already exists');
  }

  // Hash password and create user
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const newUser: StoredUser = {
    id: uuidv4(),
    email,
    name,
    password: hashedPassword
  };

  // Save user
  users.push(newUser);
  saveUsers(users);

  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const login = async (
  email: string,
  password: string,
  rememberMe: boolean
): Promise<User> => {
  const users = getStoredUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    throw new AuthError('Invalid email or password');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new AuthError('Invalid email or password');
  }

  // Create session
  const session = {
    userId: user.id,
    token: uuidv4(),
    createdAt: new Date().toISOString()
  };

  if (rememberMe) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const logout = (): void => {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
};

export const getStoredAuthState = (): AuthState => {
  const sessionJson = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
  
  if (!sessionJson) {
    return {
      user: null,
      isAuthenticated: false,
      rememberMe: false
    };
  }

  const session = JSON.parse(sessionJson);
  const users = getStoredUsers();
  const user = users.find(u => u.id === session.userId);

  if (!user) {
    logout();
    return {
      user: null,
      isAuthenticated: false,
      rememberMe: false
    };
  }

  const { password: _, ...userWithoutPassword } = user;
  return {
    user: userWithoutPassword,
    isAuthenticated: true,
    rememberMe: !!localStorage.getItem(SESSION_KEY)
  };
};