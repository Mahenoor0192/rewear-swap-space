
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Package, Star } from 'lucide-react';
import { RootState } from '../../store';
import { setUserItems } from '../../store/slices/itemsSlice';
import itemService from '../../services/itemService';
import swapService from '../../services/swapService';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface SwapRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetItemId: string;
  targetItemTitle: string;
}

const SwapRequestModal: React.FC<SwapRequestModalProps> = ({
  isOpen,
  onClose,
  targetItemId,
  targetItemTitle
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { userItems } = useSelector((state: RootState) => state.items);
  
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      loadUserItems();
    }
  }, [isOpen, user]);

  const loadUserItems = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const items = await itemService.getUserItems(user.id);
      dispatch(setUserItems(items.filter((item: any) => item.isAvailable)));
    } catch (error) {
      console.error('Failed to load user items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwapRequest = async () => {
    if (!selectedItemId) return;

    setSubmitting(true);
    try {
      await swapService.requestSwap(selectedItemId, targetItemId);
      onClose();
      setSelectedItemId('');
    } catch (error) {
      console.error('Failed to create swap request:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            Request Swap for "{targetItemTitle}"
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <p className="text-muted-foreground mb-6">
            Select one of your items to offer in exchange:
          </p>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : userItems.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                You don't have any available items to offer for swap.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {userItems.map((item: any) => (
                <Card
                  key={item.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedItemId === item.id
                      ? 'ring-2 ring-primary border-primary'
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedItemId(item.id)}
                >
                  <CardContent className="p-4">
                    <div className="aspect-square rounded-lg overflow-hidden mb-3">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-muted-foreground">
                          {item.points} pts
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {item.condition}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {userItems.length > 0 && (
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
            <Button variant="outline" onClick={onClose} disabled={submitting}>
              Cancel
            </Button>
            <Button
              onClick={handleSwapRequest}
              disabled={!selectedItemId || submitting}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {submitting ? 'Requesting...' : 'Send Swap Request'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwapRequestModal;
