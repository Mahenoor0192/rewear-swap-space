
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Check, X, Trash2, Eye, AlertTriangle, Package, Users, TrendingUp } from 'lucide-react';
import { RootState } from '../store';
import { setPendingItems } from '../store/slices/itemsSlice';
import itemService from '../services/itemService';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
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
  const dispatch = useDispatch();
  
  const { user } = useSelector((state: RootState) => state.auth);
  const { pendingItems } = useSelector((state: RootState) => state.items);
  
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const loadPendingItems = async () => {
      try {
        const items = await itemService.getPendingItems();
        dispatch(setPendingItems(items));
      } catch (error) {
        console.error('Failed to load pending items:', error);
      }
    };

    loadPendingItems();
  }, [dispatch]);

  const handleApprove = async (itemId: string) => {
    try {
      await itemService.approveItem(itemId);
      // Reload pending items
      const items = await itemService.getPendingItems();
      dispatch(setPendingItems(items));
    } catch (error) {
      console.error('Failed to approve item:', error);
    }
  };

  const handleReject = async (itemId: string) => {
    try {
      await itemService.rejectItem(itemId);
      // Reload pending items
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

  const stats = [
    {
      title: 'Pending Reviews',
      value: pendingItems.length,
      icon: <AlertTriangle className="h-6 w-6 text-orange-500" />,
      color: 'text-orange-500'
    },
    {
      title: 'Total Items',
      value: 145,
      icon: <Package className="h-6 w-6 text-blue-500" />,
      color: 'text-blue-500'
    },
    {
      title: 'Active Users',
      value: 1250,
      icon: <Users className="h-6 w-6 text-green-500" />,
      color: 'text-green-500'
    },
    {
      title: 'Success Rate',
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Admin Panel
          </h1>
          <p className="text-muted-foreground">
            Manage platform content and user submissions
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

        {/* Pending Items Table */}
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
                    <TableHead>Item</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
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
            ) : (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No pending items to review</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Item Preview Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedItem.title}</DialogTitle>
                  <DialogDescription>
                    Review item details before making a decision
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
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{selectedItem.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Category:</span> {selectedItem.category}
                    </div>
                    <div>
                      <span className="font-medium">Size:</span> {selectedItem.size.toUpperCase()}
                    </div>
                    <div>
                      <span className="font-medium">Condition:</span> {selectedItem.condition.replace('_', ' ')}
                    </div>
                    <div>
                      <span className="font-medium">Points:</span> {selectedItem.points}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Tags</h3>
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
