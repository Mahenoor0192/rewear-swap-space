
export const USER_TYPES = {
  ADMIN: 'admin',
  USER: 'user'
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  ADMIN_PANEL: '/admin',
  ITEM_DETAILS: '/item/:id',
  ADD_ITEM: '/add-item'
} as const;

export const ITEM_CONDITIONS = {
  NEW: 'new',
  LIKE_NEW: 'like_new',
  GOOD: 'good',
  FAIR: 'fair'
} as const;

export const ITEM_CATEGORIES = {
  TOPS: 'tops',
  BOTTOMS: 'bottoms',
  DRESSES: 'dresses',
  SHOES: 'shoes',
  ACCESSORIES: 'accessories'
} as const;

export const SIZES = {
  XS: 'xs',
  S: 's',
  M: 'm',
  L: 'l',
  XL: 'xl',
  XXL: 'xxl'
} as const;

export const SWAP_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  COMPLETED: 'completed',
  REJECTED: 'rejected'
} as const;
