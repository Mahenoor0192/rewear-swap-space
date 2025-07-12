
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  size: string;
  condition: string;
  tags: string[];
  images: string[];
  userId: string;
  userName: string;
  userAvatar?: string;
  points: number;
  status: string;
  createdAt: string;
  isAvailable: boolean;
}

interface ItemsState {
  items: Item[];
  userItems: Item[];
  featuredItems: Item[];
  pendingItems: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  userItems: [],
  featuredItems: [],
  pendingItems: [],
  loading: false,
  error: null
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
    setUserItems: (state, action: PayloadAction<Item[]>) => {
      state.userItems = action.payload;
    },
    setFeaturedItems: (state, action: PayloadAction<Item[]>) => {
      state.featuredItems = action.payload;
    },
    setPendingItems: (state, action: PayloadAction<Item[]>) => {
      state.pendingItems = action.payload;
    },
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
      state.userItems.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<Item>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.userItems = state.userItems.filter(item => item.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const {
  setItems,
  setUserItems,
  setFeaturedItems,
  setPendingItems,
  addItem,
  updateItem,
  removeItem,
  setLoading,
  setError
} = itemsSlice.actions;

export default itemsSlice.reducer;
