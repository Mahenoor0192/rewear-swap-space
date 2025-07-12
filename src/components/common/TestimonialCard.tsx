
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface TestimonialCardProps {
  name: string;
  avatar: string;
  rating: number;
  text: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, avatar, rating, text }) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Avatar className="h-12 w-12 mr-3">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-foreground">{name}</h4>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating
                      ? 'text-yellow-500 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="relative">
          <Quote className="h-6 w-6 text-muted-foreground mb-2" />
          <p className="text-muted-foreground italic">
            "{text}"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
