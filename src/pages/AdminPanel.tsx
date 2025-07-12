import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Check, X, Trash2, Eye, AlertTriangle, Package, Users, TrendingUp, Ban, ShoppingCart } from 'lucide-react';
import { RootState, AppDispatch } from '../store';
import { setPendingItems } from '../store/slices/itemsSlice';
import { fetchAllUsers, toggleUserStatus } from '../store/slices/adminSlice';
import itemService from '../services/itemService';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';

const AdminPanel: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  
  const { user } = useSelector((state: RootState) => state.auth);
  const { pendingItems } = useSelector((state: RootState) => state.items);
  const { users, loading: usersLoading } = useSelector((state: RootState) => state.admin);
  
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [toggleLoading, setToggleLoading] = useState<string | null>(null);

  // Mock data for orders
  const mockOrders = [
    {
      id: 'ORD001',
      buyer: 'John Doe',
      seller: 'Jane Smith',
      item: 'Vintage Denim Jacket',
      points: 45,
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 'ORD002',
      buyer: 'Sarah Wilson',
      seller: 'Mike Johnson',
      item: 'Designer Handbag',
      points: 60,
      date: '2024-01-14',
      status: 'in_progress'
    },
    {
      id: 'ORD003',
      buyer: 'Alex Chen',
      seller: 'Emma Brown',
      item: 'Leather Boots',
      points: 35,
      date: '2024-01-12',
      status: 'pending'
    }
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load pending items
        const items = await itemService.getPendingItems();
        dispatch(setPendingItems(items));
        
        // Load users for admin panel
        dispatch(fetchAllUsers());
      } catch (error) {
        console.error('Failed to load admin data:', error);
      }
    };

    loadData();
  }, [dispatch]);

  const handleApprove = async (itemId: string) => {
    try {
      await itemService.approveItem(itemId);
      const items = await itemService.getPendingItems();
      dispatch(setPendingItems(items));
    } catch (error) {
      console.error('Failed to approve item:', error);
    }
  };

  const handleReject = async (itemId: string) => {
    try {
      await itemService.rejectItem(itemId);
      const items = await itemService.getPendingItems();
      dispatch(setPendingItems(items));
    } catch (error) {
      console.error('Failed to reject item:', error);
    }
  };

  const handleViewItem = (item: any) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleUserStatusToggle = async (userId: string, currentStatus: boolean) => {
    setToggleLoading(userId);
    try {
      await dispatch(toggleUserStatus({ userId, isEnabled: !currentStatus })).unwrap();
    } catch (error) {
      console.error('Failed to toggle user status:', error);
    } finally {
      setToggleLoading(null);
    }
  };

  const stats = [
    {
      title: t('admin.stats.pendingReviews'),
      value: pendingItems.length,
      icon: <AlertTriangle className="h-6 w-6 text-orange-500" />,
      color: 'text-orange-500'
    },
    {
      title: t('admin.stats.totalItems'),
      value: 145,
      icon: <Package className="h-6 w-6 text-blue-500" />,
      color: 'text-blue-500'
    },
    {
      title: t('admin.stats.activeUsers'),
      value: users.filter(u => u.is_enabled).length,
      icon: <Users className="h-6 w-6 text-green-500" />,
      color: 'text-green-500'
    },
    {
      title: t('admin.stats.successRate'),
      value: '95%',
      icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
      color: 'text-purple-500'
    }
  ];

  const conditionColors = {
    new: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    like_new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    good: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    fair: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('admin.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('admin.subtitle')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabbed Content */}
        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="listings" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>{t('admin.tabs.listings')}</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>{t('admin.tabs.users')}</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span>{t('admin.tabs.orders')}</span>
            </TabsTrigger>
          </TabsList>

          {/* Manage Listings Tab */}
          <TabsContent value="listings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                  {t('admin.pendingListings')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pendingItems.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('admin.table.item')}</TableHead>
                        <TableHead>{t('admin.table.user')}</TableHead>
                        <TableHead>{t('admin.table.category')}</TableHead>
                        <TableHead>{t('admin.table.condition')}</TableHead>
                        <TableHead>{t('admin.table.points')}</TableHead>
                        <TableHead>{t('admin.table.date')}</TableHead>
                        <TableHead>{t('admin.table.actions')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <img
                                src={item.images[0]}
                                alt={item.title}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div>
                                <p className="font-medium text-foreground">{item.title}</p>
                                <p className="text-sm text-muted-foreground line-clamp-1">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                {item.userName.charAt(0)}
                              </div>
                              <span className="text-sm">{item.userName}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="capitalize">
                              {item.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={`text-xs ${conditionColors[item.condition as keyof typeof conditionColors]}`}>
                              {item.condition.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">{item.points} pts</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewItem(item)}
                                className="p-2"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleApprove(item.id)}
                                className="p-2 text-green-600 hover:text-green-700 hover:bg-green-100 dark:hover:bg-green-900"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReject(item.id)}
                                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">{t('admin.noPendingItems')}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Users Tab */}
          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  {t('admin.manageUsers')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {usersLoading ? (
                  <div className="text-center py-8">Loading users...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('admin.table.user')}</TableHead>
                        <TableHead>{t('admin.table.contact')}</TableHead>
                        <TableHead>{t('admin.table.joined')}</TableHead>
                        <TableHead>{t('admin.table.items')}</TableHead>
                        <TableHead>{t('admin.table.purchases')}</TableHead>
                        <TableHead>{t('admin.table.status')}</TableHead>
                        <TableHead>{t('admin.table.actions')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                                {user.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm">{user.phone_number || 'N/A'}</p>
                            <p className="text-xs text-muted-foreground">{user.address || 'N/A'}</p>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">
                              {new Date(user.created_at).toLocaleDateString()}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">{user.items_count}</span>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">{user.purchases_count}</span>
                          </TableCell>
                          <TableCell>
                            <Badge className={user.is_enabled ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}>
                              {user.is_enabled ? 'Active' : 'Disabled'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Switch
                                checked={user.is_enabled}
                                onCheckedChange={() => handleUserStatusToggle(user.id, user.is_enabled)}
                                disabled={toggleLoading === user.id}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Orders Tab */}
          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2 text-green-500" />
                  {t('admin.manageOrders')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('admin.table.orderId')}</TableHead>
                      <TableHead>{t('admin.table.buyer')}</TableHead>
                      <TableHead>{t('admin.table.seller')}</TableHead>
                      <TableHead>{t('admin.table.item')}</TableHead>
                      <TableHead>{t('admin.table.points')}</TableHead>
                      <TableHead>{t('admin.table.date')}</TableHead>
                      <TableHead>{t('admin.table.status')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <span className="font-mono text-sm">{order.id}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{order.buyer}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{order.seller}</span>
                        </TableCell>
                        <TableCell>
                          <span>{order.item}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{order.points} pts</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Item Preview Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedItem.title}</DialogTitle>
                  <DialogDescription>
                    {t('admin.reviewItem')}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {selectedItem.images.map((image: string, index: number) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${selectedItem.title} ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">{t('item.description')}</h3>
                    <p className="text-muted-foreground">{selectedItem.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">{t('item.category')}:</span> {selectedItem.category}
                    </div>
                    <div>
                      <span className="font-medium">{t('item.size')}:</span> {selectedItem.size.toUpperCase()}
                    </div>
                    <div>
                      <span className="font-medium">{t('item.condition')}:</span> {selectedItem.condition.replace('_', ' ')}
                    </div>
                    <div>
                      <span className="font-medium">{t('item.points')}:</span> {selectedItem.points}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">{t('item.tags')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <Button
                      onClick={() => {
                        handleApprove(selectedItem.id);
                        setIsDialogOpen(false);
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      {t('admin.approve')}
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleReject(selectedItem.id);
                        setIsDialogOpen(false);
                      }}
                      className="flex-1"
                    >
                      <X className="h-4 w-4 mr-2" />
                      {t('admin.reject')}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminPanel;
