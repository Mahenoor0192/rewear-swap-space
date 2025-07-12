
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Globe, LogOut, User, Settings } from 'lucide-react';
import { RootState } from '../../store';
import { toggleTheme } from '../../store/slices/themeSlice';
import { setLanguage } from '../../store/slices/languageSlice';
import { logout } from '../../store/slices/authSlice';
import { ROUTES } from '../../config/constants';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { currentLanguage } = useSelector((state: RootState) => state.language);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleLanguageChange = (lang: string) => {
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.HOME);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'ta', name: 'தமிழ்' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to={ROUTES.HOME} className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            ReWear
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to={ROUTES.HOME} className="text-sm font-medium hover:text-primary transition-colors">
            {t('nav.home')}
          </Link>
          {isAuthenticated && (
            <Link to={ROUTES.DASHBOARD} className="text-sm font-medium hover:text-primary transition-colors">
              {t('nav.dashboard')}
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleThemeToggle}
            className="w-9 h-9 p-0"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background border border-border">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={currentLanguage === lang.code ? 'bg-muted' : ''}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline text-sm">{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background border border-border">
                <DropdownMenuItem onClick={() => navigate(ROUTES.DASHBOARD)}>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                {user?.userType === 'admin' && (
                  <DropdownMenuItem onClick={() => navigate(ROUTES.ADMIN_PANEL)}>
                    <Settings className="h-4 w-4 mr-2" />
                    Admin Panel
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('nav.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              {t('nav.login')}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
