
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SwapRequest {
  id: string;
  offered_item_id: string;
  requested_item_id: string;
  offered_item: {
    id: string;
    title: string;
    images: string[];
  };
  requested_item: {
    id: string;
    title: string;
    images: string[];
  };
  requester: {
    id: string;
    name: string;
  };
  receiver: {
    id: string;
    name: string;
  };
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  created_at: string;
}

interface SwapState {
  myRequests: SwapRequest[];
  receivedRequests: SwapRequest[];
  loading: boolean;
  error: string | null;
}

const initialState: SwapState = {
  myRequests: [],
  receivedRequests: [],
  loading: false,
  error: null
};

const swapSlice = createSlice({
  name: 'swap',
  initialState,
  reducers: {
    setMyRequests: (state, action: PayloadAction<SwapRequest[]>) => {
      state.myRequests = action.payload;
    },
    setReceivedRequests: (state, action: PayloadAction<SwapRequest[]>) => {
      state.receivedRequests = action.payload;
    },
    addSwapRequest: (state, action: PayloadAction<SwapRequest>) => {
      state.myRequests.push(action.payload);
    },
    updateSwapStatus: (state, action: PayloadAction<{ id: string; status: string }>) => {
      const { id, status } = action.payload;
      
      // Update in myRequests
      const myRequestIndex = state.myRequests.findIndex(swap => swap.id === id);
      if (myRequestIndex !== -1) {
        state.myRequests[myRequestIndex].status = status as any;
      }
      
      // Update in receivedRequests
      const receivedRequestIndex = state.receivedRequests.findIndex(swap => swap.id === id);
      if (receivedRequestIndex !== -1) {
        state.receivedRequests[receivedRequestIndex].status = status as any;
      }
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
  setMyRequests,
  setReceivedRequests,
  addSwapRequest,
  updateSwapStatus,
  setLoading,
  setError
} = swapSlice.actions;

export default swapSlice.reducer;
