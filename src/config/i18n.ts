
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      'nav.home': 'Home',
      'nav.dashboard': 'Dashboard',
      'nav.login': 'Login',
      'nav.logout': 'Logout',
      
      // Landing Page
      'landing.title': 'ReWear - Sustainable Fashion Exchange',
      'landing.subtitle': 'Give your clothes a second life while discovering amazing pieces from others',
      'landing.cta.swap': 'Start Swapping',
      'landing.cta.browse': 'Browse Items',
      'landing.cta.list': 'List an Item',
      'landing.featured': 'Featured Items',
      
      // Auth
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.login': 'Login',
      'auth.emailRequired': 'Email is required',
      'auth.emailInvalid': 'Invalid email format',
      'auth.passwordRequired': 'Password is required',
      'auth.passwordMin': 'Password must be at least 6 characters',
      
      // Dashboard
      'dashboard.welcome': 'Welcome back',
      'dashboard.points': 'Points Balance',
      'dashboard.myItems': 'My Items',
      'dashboard.ongoingSwaps': 'Ongoing Swaps',
      'dashboard.completedSwaps': 'Completed Swaps',
      
      // Items
      'item.title': 'Title',
      'item.description': 'Description',
      'item.category': 'Category',
      'item.size': 'Size',
      'item.condition': 'Condition',
      'item.tags': 'Tags',
      'item.swapRequest': 'Swap Request',
      'item.redeemPoints': 'Redeem with Points',
      'item.available': 'Available',
      'item.unavailable': 'Unavailable',
      
      // Admin
      'admin.pendingListings': 'Pending Listings',
      'admin.approve': 'Approve',
      'admin.reject': 'Reject',
      'admin.remove': 'Remove',
      
      // Common
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.submit': 'Submit',
      'common.loading': 'Loading...',
      'common.error': 'Error occurred',
      'common.success': 'Success',
      'common.darkMode': 'Dark Mode',
      'common.language': 'Language'
    }
  },
  hi: {
    translation: {
      'nav.home': 'होम',
      'nav.dashboard': 'डैशबोर्ड',
      'nav.login': 'लॉगिन',
      'nav.logout': 'लॉगआउट',
      'landing.title': 'ReWear - टिकाऊ फैशन एक्सचेंज',
      'landing.subtitle': 'अपने कपड़ों को दूसरा जीवन दें और दूसरों से अद्भुत टुकड़े खोजें',
      'auth.email': 'ईमेल',
      'auth.password': 'पासवर्ड',
      'auth.login': 'लॉगिन'
    }
  },
  gu: {
    translation: {
      'nav.home': 'હોમ',
      'nav.dashboard': 'ડેશબોર્ડ',
      'nav.login': 'લોગિન',
      'nav.logout': 'લોગઆઉટ',
      'landing.title': 'ReWear - ટકાઉ ફેશન એક્સચેન્જ',
      'landing.subtitle': 'તમારા કપડાંને બીજું જીવન આપો અને અન્યોથી અદ્ભુત ટુકડાઓ શોધો',
      'auth.email': 'ઇમેઇલ',
      'auth.password': 'પાસવર્ડ',
      'auth.login': 'લોગિન'
    }
  },
  ta: {
    translation: {
      'nav.home': 'முகப்பு',
      'nav.dashboard': 'டாஷ்போர்டு',
      'nav.login': 'உள்நுழைவு',
      'nav.logout': 'வெளியேறு',
      'landing.title': 'ReWear - நிலையான ஃபேஷன் பரிமாற்றம்',
      'landing.subtitle': 'உங்கள் ஆடைகளுக்கு இரண்டாவது வாழ்க்கையை கொடுங்கள்',
      'auth.email': 'மின்னஞ்சல்',
      'auth.password': 'கடவுச்சொல்',
      'auth.login': 'உள்நுழைவு'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
