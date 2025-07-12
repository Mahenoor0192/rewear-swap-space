
import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import ItemCard from './ItemCard';

interface ItemCarouselProps {
  items: any[];
  title: string;
}

const ItemCarousel: React.FC<ItemCarouselProps> = ({ items, title }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    skipSnaps: false,
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={scrollPrev}
            className="w-9 h-9 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={scrollNext}
            className="w-9 h-9 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {items.map((item) => (
            <div key={item.id} className="flex-[0_0_280px] min-w-0">
              <ItemCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemCarousel;
