
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Plus, Star, TrendingUp, Package, Clock, CheckCircle } from 'lucide-react';
import { RootState } from '../store';
import { setUserItems } from '../store/slices/itemsSlice';
import { ROUTES } from '../config/constants';
import itemService from '../services/itemService';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import ItemCard from '../components/common/ItemCard';

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
      title: 'Total Points',
      value: user?.points || 0,
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      color: 'text-yellow-500'
    },
    {
      title: 'Items Listed',
      value: userItems.length,
      icon: <Package className="h-6 w-6 text-blue-500" />,
      color: 'text-blue-500'
    },
    {
      title: 'Ongoing Swaps',
      value: 2,
      icon: <Clock className="h-6 w-6 text-orange-500" />,
      color: 'text-orange-500'
    },
    {
      title: 'Completed Swaps',
      value: 8,
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      color: 'text-green-500'
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
                Manage your items and track your sustainable fashion journey
              </p>
            </div>
          </div>
          <Button
            onClick={() => navigate(ROUTES.ADD_ITEM)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Item
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* My Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold">
                  {t('dashboard.myItems')}
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(ROUTES.ADD_ITEM)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
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
                      You haven't listed any items yet
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => navigate(ROUTES.ADD_ITEM)}
                    >
                      List Your First Item
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
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
                    <p className="text-xs text-muted-foreground">with {swap.otherUser}</p>
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
                    <p className="text-xs text-muted-foreground">with {swap.otherUser}</p>
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
