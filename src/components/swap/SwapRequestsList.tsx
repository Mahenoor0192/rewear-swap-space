
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Clock, Check, X, Package, User } from 'lucide-react';
import { RootState } from '../../store';
import { setMyRequests, setReceivedRequests, updateSwapStatus } from '../../store/slices/swapSlice';
import swapService from '../../services/swapService';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const SwapRequestsList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { myRequests, receivedRequests } = useSelector((state: RootState) => state.swap);
  
  const [loading, setLoading] = useState(true);
  const [respondingTo, setRespondingTo] = useState<string>('');

  useEffect(() => {
    loadSwapRequests();
  }, []);

  const loadSwapRequests = async () => {
    setLoading(true);
    try {
      const [myRequestsData, receivedRequestsData] = await Promise.all([
        swapService.getMyRequests(),
        swapService.getReceivedRequests()
      ]);
      
      dispatch(setMyRequests(myRequestsData));
      dispatch(setReceivedRequests(receivedRequestsData));
    } catch (error) {
      console.error('Failed to load swap requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwapResponse = async (swapId: string, status: 'accepted' | 'rejected') => {
    setRespondingTo(swapId);
    try {
      await swapService.respondToSwap(swapId, status);
      dispatch(updateSwapStatus({ id: swapId, status }));
    } catch (error) {
      console.error('Failed to respond to swap:', error);
    } finally {
      setRespondingTo('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'accepted':
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="sent" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sent" className="flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Sent Requests ({myRequests.length})</span>
          </TabsTrigger>
          <TabsTrigger value="received" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Received Requests ({receivedRequests.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sent" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Swap Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {myRequests.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No swap requests sent yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {myRequests.map((swap) => (
                    <div
                      key={swap.id}
                      className="flex items-center space-x-4 p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <img
                          src={swap.offered_item.images[0]}
                          alt={swap.offered_item.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">
                            {swap.offered_item.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            For: {swap.requested_item.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            To: {swap.receiver.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(swap.created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(swap.status)}>
                          {swap.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="received" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Received Swap Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {receivedRequests.length === 0 ? (
                <div className="text-center py-8">
                  <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No swap requests received yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {receivedRequests.map((swap) => (
                    <div
                      key={swap.id}
                      className="flex items-center space-x-4 p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <img
                          src={swap.requested_item.images[0]}
                          alt={swap.requested_item.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">
                            {swap.requested_item.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Offered: {swap.offered_item.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            From: {swap.requester.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(swap.created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(swap.status)}>
                          {swap.status}
                        </Badge>
                        {swap.status === 'pending' && (
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSwapResponse(swap.id, 'accepted')}
                              disabled={respondingTo === swap.id}
                              className="text-green-600 border-green-600 hover:bg-green-50"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSwapResponse(swap.id, 'rejected')}
                              disabled={respondingTo === swap.id}
                              className="text-red-600 border-red-600 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SwapRequestsList;
