
import React from 'react';

interface CategoryCardProps {
  name: string;
  image: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, image, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      <div className="aspect-square relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white font-semibold text-sm text-center">
            {name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
