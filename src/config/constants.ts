
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  ADD_ITEM: '/add-item',
  ADMIN_PANEL: '/admin',
  ITEM_DETAILS: '/item'
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh'
  },
  ITEMS: {
    LIST: '/items',
    CREATE: '/items',
    UPDATE: '/items',
    DELETE: '/items',
    FEATURED: '/items/featured',
    USER_ITEMS: '/items/user',
    PENDING: '/admin/items/pending'
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/profile'
  }
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'rewear_auth_token',
  USER_DATA: 'rewear_user_data',
  THEME: 'rewear_theme',
  LANGUAGE: 'rewear_language'
} as const;

export const ITEM_CONDITIONS = [
  { value: 'new', label: 'New with tags' },
  { value: 'like_new', label: 'Like new' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' }
] as const;

export const ITEM_CATEGORIES = [
  { value: 'tops', label: 'Tops' },
  { value: 'bottoms', label: 'Bottoms' },
  { value: 'dresses', label: 'Dresses' },
  { value: 'outerwear', label: 'Outerwear' },
  { value: 'shoes', label: 'Shoes' },
  { value: 'accessories', label: 'Accessories' }
] as const;

export const ITEM_SIZES = [
  { value: 'xs', label: 'XS' },
  { value: 's', label: 'S' },
  { value: 'm', label: 'M' },
  { value: 'l', label: 'L' },
  { value: 'xl', label: 'XL' },
  { value: 'xxl', label: 'XXL' }
] as const;
