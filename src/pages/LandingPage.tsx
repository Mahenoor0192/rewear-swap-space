
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Recycle, Users, Leaf, Star, TrendingUp } from 'lucide-react';
import { RootState } from '../store';
import { setFeaturedItems } from '../store/slices/itemsSlice';
import { ROUTES } from '../config/constants';
import itemService from '../services/itemService';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import ItemCarousel from '../components/common/ItemCarousel';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { featuredItems } = useSelector((state: RootState) => state.items);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const loadFeaturedItems = async () => {
      try {
        const items = await itemService.getFeaturedItems();
        dispatch(setFeaturedItems(items));
      } catch (error) {
        console.error('Failed to load featured items:', error);
      }
    };

    loadFeaturedItems();
  }, [dispatch]);

  const handleCTAClick = (route: string) => {
    if (!isAuthenticated && route !== ROUTES.HOME) {
      navigate(ROUTES.LOGIN);
    } else {
      navigate(route);
    }
  };

  const features = [
    {
      icon: <Recycle className="h-8 w-8 text-green-500" />,
      title: 'Sustainable Fashion',
      description: 'Give your clothes a second life and reduce fashion waste'
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: 'Community Driven',
      description: 'Connect with fashion lovers and build a sustainable community'
    },
    {
      icon: <Leaf className="h-8 w-8 text-emerald-500" />,
      title: 'Eco-Friendly',
      description: 'Make a positive impact on the environment with every swap'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Items Exchanged' },
    { number: '5K+', label: 'Happy Users' },
    { number: '50K+', label: 'Points Earned' },
    { number: '95%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900/20 via-background to-pink-900/20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              {t('landing.title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('landing.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                onClick={() => handleCTAClick(ROUTES.DASHBOARD)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
              >
                {t('landing.cta.swap')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleCTAClick(ROUTES.HOME)}
                className="px-8 py-3 text-lg"
              >
                {t('landing.cta.browse')}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => handleCTAClick(ROUTES.ADD_ITEM)}
                className="px-8 py-3 text-lg"
              >
                {t('landing.cta.list')}
              </Button>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Fashion Exchange"
                className="rounded-2xl shadow-2xl mx-auto max-w-4xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose ReWear?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join the sustainable fashion revolution and discover a new way to refresh your wardrobe
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      {featuredItems.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <ItemCarousel items={featuredItems} title={t('landing.featured')} />
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/10 via-background to-pink-900/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Impact</h2>
            <p className="text-muted-foreground">Numbers that show our growing community</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-foreground mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Sustainable Fashion Journey?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already making a difference through fashion exchange
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => handleCTAClick(ROUTES.LOGIN)}
            className="px-8 py-3 text-lg"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
