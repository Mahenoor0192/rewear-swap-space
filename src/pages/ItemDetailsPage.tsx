
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Heart, Share2, Star, User, Clock, Tag, Package } from 'lucide-react';
import { RootState } from '../store';
import itemService from '../services/itemService';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';

const ItemDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const { user } = useSelector((state: RootState) => state.auth);
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const loadItem = async () => {
      if (id) {
        try {
          const itemData = await itemService.getItemById(id);
          setItem(itemData);
        } catch (error) {
          console.error('Failed to load item:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Item not found</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const conditionColors = {
    new: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    like_new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    good: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    fair: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
  };

  const isOwner = user?.id === item.userId;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="p-2">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-muted">
              <img
                src={item.images[selectedImage]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            {item.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {item.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-primary'
                        : 'border-transparent hover:border-muted-foreground'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${item.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-foreground">{item.title}</h1>
                <Badge
                  className={`${conditionColors[item.condition as keyof typeof conditionColors]}`}
                >
                  {item.condition.replace('_', ' ')}
                </Badge>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="text-xl font-semibold text-foreground">
                  {item.points} points
                </span>
                <Badge
                  className={`ml-2 ${
                    item.isAvailable
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}
                >
                  {item.isAvailable ? t('item.available') : t('item.unavailable')}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* User Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={item.userAvatar} alt={item.userName} />
                    <AvatarFallback>
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.userName}</h3>
                    <p className="text-sm text-muted-foreground">Fashion Enthusiast</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < 4
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">4.8 rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>

            {/* Item Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Category:</span>
                <span className="text-sm font-medium text-foreground capitalize">
                  {item.category}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Size:</span>
                <span className="text-sm font-medium text-foreground uppercase">
                  {item.size}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Listed:</span>
                <span className="text-sm font-medium text-foreground">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            {!isOwner && item.isAvailable && (
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {t('item.swapRequest')}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  disabled={!user || user.points < item.points}
                >
                  {t('item.redeemPoints')} ({item.points} pts)
                </Button>
              </div>
            )}

            {isOwner && (
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  This is your item. You can edit or remove it from your dashboard.
                </p>
              </div>
            )}

            {!item.isAvailable && !isOwner && (
              <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <p className="text-sm text-red-700 dark:text-red-300 text-center">
                  This item is currently unavailable for swapping.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsPage;
