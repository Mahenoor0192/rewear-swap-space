
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Plus, Star, TrendingUp, Package, Clock, CheckCircle, User, ShoppingBag, Repeat } from 'lucide-react';
import { RootState } from '../store';
import { setUserItems } from '../store/slices/itemsSlice';
import { ROUTES } from '../config/constants';
import itemService from '../services/itemService';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import ItemCard from '../components/common/ItemCard';
import SwapRequestsList from '../components/swap/SwapRequestsList';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state: RootState) => state.auth);
  const { userItems } = useSelector((state: RootState) => state.items);

  useEffect(() => {
    const loadUserItems = async () => {
      if (user) {
        try {
          const items = await itemService.getUserItems(user.id);
          dispatch(setUserItems(items));
        } catch (error) {
          console.error('Failed to load user items:', error);
        }
      }
    };

    loadUserItems();
  }, [user, dispatch]);

  const stats = [
    {
      title: t('dashboard.stats.totalPoints'),
      value: user?.points || 0,
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      color: 'text-yellow-500'
    },
    {
      title: t('dashboard.stats.itemsListed'),
      value: userItems.length,
      icon: <Package className="h-6 w-6 text-blue-500" />,
      color: 'text-blue-500'
    },
    {
      title: t('dashboard.stats.ongoingSwaps'),
      value: 2,
      icon: <Clock className="h-6 w-6 text-orange-500" />,
      color: 'text-orange-500'
    },
    {
      title: t('dashboard.stats.completedSwaps'),
      value: 8,
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      color: 'text-green-500'
    }
  ];

  // Mock data for purchases
  const myPurchases = [
    {
      id: '1',
      title: 'Vintage Leather Jacket',
      image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      seller: 'Emma Wilson',
      purchaseDate: '2024-01-15',
      points: 45,
      status: 'delivered'
    },
    {
      id: '2',
      title: 'Designer Silk Scarf',
      image: 'https://images.unsplash.com/photo-1520327352970-6f3d44b3e040?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      seller: 'Sarah Johnson',
      purchaseDate: '2024-01-10',
      points: 25,
      status: 'in_transit'
    },
    {
      id: '3',
      title: 'Casual Summer Dress',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      seller: 'Mike Chen',
      purchaseDate: '2024-01-05',
      points: 30,
      status: 'delivered'
    }
  ];

  const ongoingSwaps = [
    {
      id: '1',
      itemTitle: 'Vintage Denim Jacket',
      otherUser: 'Sarah Johnson',
      status: 'Pending Approval',
      date: '2024-01-15'
    },
    {
      id: '2',
      itemTitle: 'Designer Silk Dress',
      otherUser: 'Emma Wilson',
      status: 'In Transit',
      date: '2024-01-12'
    }
  ];

  const completedSwaps = [
    {
      id: '1',
      itemTitle: 'Casual Summer Dress',
      otherUser: 'Alex Chen',
      completedDate: '2024-01-10',
      rating: 5
    },
    {
      id: '2',
      itemTitle: 'Leather Boots',
      otherUser: 'Maya Patel',
      completedDate: '2024-01-05',
      rating: 4
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in_transit':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {t('dashboard.welcome')}, {user?.name}!
              </h1>
              <p className="text-muted-foreground">
                {t('dashboard.subtitle')}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(ROUTES.PROFILE)}
                className="mt-1 p-0 h-auto text-primary hover:text-primary/80"
              >
                <User className="h-4 w-4 mr-1" />
                {t('dashboard.viewProfile')}
              </Button>
            </div>
          </div>
          <Button
            onClick={() => navigate(ROUTES.ADD_ITEM)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('dashboard.addNewItem')}
          </Button>
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

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* My Items and Purchases */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="listings" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="listings" className="flex items-center space-x-2">
                  <Package className="h-4 w-4" />
                  <span>{t('dashboard.myListings')}</span>
                </TabsTrigger>
                <TabsTrigger value="purchases" className="flex items-center space-x-2">
                  <ShoppingBag className="h-4 w-4" />
                  <span>{t('dashboard.myPurchases')}</span>
                </TabsTrigger>
                <TabsTrigger value="swaps" className="flex items-center space-x-2">
                  <Repeat className="h-4 w-4" />
                  <span>Swaps</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="listings" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl font-semibold">
                      {t('dashboard.myListings')}
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(ROUTES.ADD_ITEM)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {t('dashboard.addItem')}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {userItems.length > 0 ? (
                      <div className="grid sm:grid-cols-2 gap-4">
                        {userItems.map((item) => (
                          <ItemCard key={item.id} item={item} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          {t('dashboard.noListings')}
                        </p>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => navigate(ROUTES.ADD_ITEM)}
                        >
                          {t('dashboard.listFirstItem')}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="purchases" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                      {t('dashboard.myPurchases')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {myPurchases.length > 0 ? (
                      <div className="space-y-4">
                        {myPurchases.map((purchase) => (
                          <div key={purchase.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
                            <img
                              src={purchase.image}
                              alt={purchase.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground">{purchase.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {t('dashboard.soldBy')} {purchase.seller}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(purchase.purchaseDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-1 mb-2">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{purchase.points} {t('dashboard.pts')}</span>
                              </div>
                              <Badge className={getStatusColor(purchase.status)}>
                                {t(`dashboard.status.${purchase.status}`)}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          {t('dashboard.noPurchases')}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="swaps" className="mt-6">
                <SwapRequestsList />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ongoing Swaps */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-orange-500" />
                  {t('dashboard.ongoingSwaps')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {ongoingSwaps.map((swap) => (
                  <div key={swap.id} className="p-3 bg-muted/30 rounded-lg">
                    <h4 className="font-medium text-sm">{swap.itemTitle}</h4>
                    <p className="text-xs text-muted-foreground">{t('dashboard.with')} {swap.otherUser}</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {swap.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{swap.date}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Completed Swaps */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                  {t('dashboard.completedSwaps')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {completedSwaps.map((swap) => (
                  <div key={swap.id} className="p-3 bg-muted/30 rounded-lg">
                    <h4 className="font-medium text-sm">{swap.itemTitle}</h4>
                    <p className="text-xs text-muted-foreground">{t('dashboard.with')} {swap.otherUser}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < swap.rating
                                ? 'text-yellow-500 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{swap.completedDate}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
