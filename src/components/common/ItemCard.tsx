
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface ItemCardProps {
  item: {
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
  };
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/item/${item.id}`);
  };

  const conditionColors = {
    new: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    like_new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    good: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    fair: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
  };

  return (
    <div className="group cursor-pointer bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-t-xl" onClick={handleItemClick}>
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <Badge className={`text-xs ${conditionColors[item.condition as keyof typeof conditionColors]}`}>
            {item.condition.replace('_', ' ')}
          </Badge>
        </div>
        <div className="absolute top-2 left-2">
          {item.isAvailable ? (
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs">
              Available
            </Badge>
          ) : (
            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 text-xs">
              Unavailable
            </Badge>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 
            className="font-semibold text-lg text-foreground line-clamp-1 cursor-pointer hover:text-primary"
            onClick={handleItemClick}
          >
            {item.title}
          </h3>
          <Button variant="ghost" size="sm" className="p-1 h-auto hover:text-red-500">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center space-x-2 mb-3">
          <img
            src={item.userAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.userName}`}
            alt={item.userName}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-sm text-muted-foreground">{item.userName}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {item.tags.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {item.tags.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{item.tags.length - 2}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-foreground">{item.points} pts</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Users className="h-3 w-3" />
            <span>Size {item.size.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
