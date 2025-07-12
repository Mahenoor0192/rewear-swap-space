
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
      'nav.profile': 'Profile',
      
      // Landing Page
      'landing.title': 'ReWear - Sustainable Fashion Exchange',
      'landing.subtitle': 'Give your clothes a second life while discovering amazing pieces from others',
      'landing.cta.swap': 'Start Swapping',
      'landing.cta.browse': 'Browse Items',
      'landing.cta.list': 'List an Item',
      'landing.cta.ready': 'Ready to Start Your Sustainable Fashion Journey?',
      'landing.cta.join': 'Join thousands of users who are already making a difference through fashion exchange',
      'landing.cta.getStarted': 'Get Started Today',
      'landing.featured': 'Featured Items',
      
      // Categories
      'categories.title': 'Shop by Category',
      'categories.subtitle': 'Discover amazing pieces in every category',
      'categories.tshirts': 'T-Shirts',
      'categories.bottomwear': 'Bottom Wear',
      'categories.tops': 'Tops',
      'categories.hoodies': 'Hoodies',
      'categories.jackets': 'Jackets',
      'categories.ethnic': 'Ethnic Wear',
      'categories.accessories': 'Accessories',
      
      // Features
      'features.title': 'Why Choose ReWear?',
      'features.subtitle': 'Join the sustainable fashion revolution and discover a new way to refresh your wardrobe',
      'features.sustainable.title': 'Sustainable Fashion',
      'features.sustainable.description': 'Give your clothes a second life and reduce fashion waste',
      'features.community.title': 'Community Driven',
      'features.community.description': 'Connect with fashion lovers and build a sustainable community',
      'features.ecofriendly.title': 'Eco-Friendly',
      'features.ecofriendly.description': 'Make a positive impact on the environment with every swap',
      
      // Testimonials
      'testimonials.title': 'What Our Users Say',
      'testimonials.subtitle': 'Real stories from our amazing community',
      'testimonials.sarah': 'ReWear has completely changed how I shop for clothes. I\'ve discovered so many unique pieces!',
      'testimonials.mike': 'Great platform for sustainable fashion. The community is amazing and very supportive.',
      'testimonials.emma': 'I love how easy it is to swap clothes. It\'s like having a new wardrobe every month!',
      'testimonials.alex': 'The quality of items is excellent. I\'ve made some great connections through ReWear.',
      
      // Stats
      'stats.title': 'Our Impact',
      'stats.subtitle': 'Numbers that show our growing community',
      'stats.itemsExchanged': 'Items Exchanged',
      'stats.happyUsers': 'Happy Users',
      'stats.pointsEarned': 'Points Earned',
      'stats.satisfactionRate': 'Satisfaction Rate',
      
      // Auth
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.name': 'Full Name',
      'auth.phone': 'Phone Number',
      'auth.address': 'Address',
      'auth.login': 'Login',
      'auth.signup': 'Sign Up',
      'auth.signupSubtitle': 'Create your account to start swapping',
      'auth.continueWithGoogle': 'Continue with Google',
      'auth.orContinueWith': 'Or continue with email',
      'auth.alreadyHaveAccount': 'Already have an account?',
      'auth.emailRequired': 'Email is required',
      'auth.emailInvalid': 'Invalid email format',
      'auth.passwordRequired': 'Password is required',
      'auth.passwordMin': 'Password must be at least 6 characters',
      'auth.nameRequired': 'Full name is required',
      'auth.nameMin': 'Name must be at least 2 characters',
      'auth.phoneRequired': 'Phone number is required',
      'auth.phoneInvalid': 'Please enter a valid 10-digit phone number',
      'auth.addressRequired': 'Address is required',
      'auth.addressMin': 'Address must be at least 5 characters',
      'auth.emailPlaceholder': 'Enter your email',
      'auth.passwordPlaceholder': 'Enter your password',
      'auth.namePlaceholder': 'Enter your full name',
      'auth.phonePlaceholder': 'Enter your phone number',
      'auth.addressPlaceholder': 'Enter your address',
      
      // Profile
      'profile.title': 'My Profile',
      'profile.edit': 'Edit Profile',
      'profile.member': 'Community Member',
      'profile.points': 'points',
      'profile.bio': 'Bio',
      
      // Dashboard
      'dashboard.welcome': 'Welcome back',
      'dashboard.subtitle': 'Manage your items and track your sustainable fashion journey',
      'dashboard.viewProfile': 'View Profile',
      'dashboard.addNewItem': 'Add New Item',
      'dashboard.myListings': 'My Listings',
      'dashboard.myPurchases': 'My Purchases',
      'dashboard.ongoingSwaps': 'Ongoing Swaps',
      'dashboard.completedSwaps': 'Completed Swaps',
      'dashboard.addItem': 'Add Item',
      'dashboard.noListings': 'You haven\'t listed any items yet',
      'dashboard.listFirstItem': 'List Your First Item',
      'dashboard.noPurchases': 'You haven\'t made any purchases yet',
      'dashboard.soldBy': 'Sold by',
      'dashboard.with': 'with',
      'dashboard.pts': 'pts',
      'dashboard.stats.totalPoints': 'Total Points',
      'dashboard.stats.itemsListed': 'Items Listed',
      'dashboard.stats.ongoingSwaps': 'Ongoing Swaps',
      'dashboard.stats.completedSwaps': 'Completed Swaps',
      'dashboard.status.delivered': 'Delivered',
      'dashboard.status.in_transit': 'In Transit',
      'dashboard.status.processing': 'Processing',
      
      // Items
      'item.title': 'Title',
      'item.description': 'Description',
      'item.category': 'Category',
      'item.size': 'Size',
      'item.condition': 'Condition',
      'item.tags': 'Tags',
      'item.points': 'Points',
      'item.swapRequest': 'Swap Request',
      'item.redeemPoints': 'Redeem with Points',
      'item.available': 'Available',
      'item.unavailable': 'Unavailable',
      
      // Admin
      'admin.title': 'Admin Panel',
      'admin.subtitle': 'Manage platform content and user submissions',
      'admin.pendingListings': 'Pending Listings',
      'admin.manageUsers': 'Manage Users',
      'admin.manageOrders': 'Manage Orders',
      'admin.approve': 'Approve',
      'admin.reject': 'Reject',
      'admin.remove': 'Remove',
      'admin.reviewItem': 'Review item details before making a decision',
      'admin.noPendingItems': 'No pending items to review',
      'admin.tabs.listings': 'Manage Listings',
      'admin.tabs.users': 'Manage Users',
      'admin.tabs.orders': 'Manage Orders',
      'admin.table.item': 'Item',
      'admin.table.user': 'User',
      'admin.table.category': 'Category',
      'admin.table.condition': 'Condition',
      'admin.table.points': 'Points',
      'admin.table.date': 'Date',
      'admin.table.actions': 'Actions',
      'admin.table.contact': 'Contact',
      'admin.table.joined': 'Joined',
      'admin.table.items': 'Items',
      'admin.table.purchases': 'Purchases',
      'admin.table.status': 'Status',
      'admin.table.orderId': 'Order ID',
      'admin.table.buyer': 'Buyer',
      'admin.table.seller': 'Seller',
      'admin.stats.pendingReviews': 'Pending Reviews',
      'admin.stats.totalItems': 'Total Items',
      'admin.stats.activeUsers': 'Active Users',
      'admin.stats.successRate': 'Success Rate',
      
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
      'nav.profile': 'प्रोफ़ाइल',
      'landing.title': 'ReWear - टिकाऊ फैशन एक्सचेंज',
      'landing.subtitle': 'अपने कपड़ों को दूसरा जीवन दें और दूसरों से अद्भुत टुकड़े खोजें',
      'landing.cta.swap': 'अदला-बदली शुरू करें',
      'landing.cta.browse': 'आइटम ब्राउज़ करें',
      'landing.cta.list': 'आइटम सूची बनाएं',
      'categories.title': 'श्रेणी के अनुसार खरीदारी करें',
      'categories.tshirts': 'टी-शर्ट',
      'categories.bottomwear': 'बॉटम वियर',
      'categories.tops': 'टॉप्स',
      'categories.hoodies': 'हूडीज़',
      'categories.jackets': 'जैकेट्स',
      'categories.ethnic': 'एथनिक वियर',
      'categories.accessories': 'एक्सेसरीज़',
      'auth.email': 'ईमेल',
      'auth.password': 'पासवर्ड',
      'auth.name': 'पूरा नाम',
      'auth.phone': 'फोन नंबर',
      'auth.address': 'पता',
      'auth.login': 'लॉगिन',
      'auth.signup': 'साइन अप'
    }
  },
  gu: {
    translation: {
      'nav.home': 'હોમ',
      'nav.dashboard': 'ડેશબોર્ડ',
      'nav.login': 'લોગિન',
      'nav.logout': 'લોગઆઉટ',
      'nav.profile': 'પ્રોફાઇલ',
      'landing.title': 'ReWear - ટકાઉ ફેશન એક્સચેન્જ',
      'landing.subtitle': 'તમારા કપડાંને બીજું જીવન આપો અને અન્યોથી અદ્ભુત ટુકડાઓ શોધો',
      'landing.cta.swap': 'અદલાબદલી શરૂ કરો',
      'landing.cta.browse': 'આઇટમ્સ બ્રાઉઝ કરો',
      'landing.cta.list': 'આઇટમ લિસ્ટ કરો',
      'categories.title': 'કેટેગરી પ્રમાણે ખરીદી કરો',
      'categories.tshirts': 'ટી-શર્ટ',
      'categories.bottomwear': 'બોટમ વેર',
      'categories.tops': 'ટોપ્સ',
      'categories.hoodies': 'હૂડીઝ',
      'categories.jackets': 'જેકેટ્સ',
      'categories.ethnic': 'એથનિક વેર',
      'categories.accessories': 'એક્સેસરીઝ',
      'auth.email': 'ઇમેઇલ',
      'auth.password': 'પાસવર્ડ',
      'auth.name': 'પૂરું નામ',
      'auth.phone': 'ફોન નંબર',
      'auth.address': 'સરનામું',
      'auth.login': 'લોગિન',
      'auth.signup': 'સાઇન અપ'
    }
  },
  ta: {
    translation: {
      'nav.home': 'முகப்பு',
      'nav.dashboard': 'டாஷ்போர்டு',
      'nav.login': 'உள்நுழைவு',
      'nav.logout': 'வெளியேறு',
      'nav.profile': 'சுயவிவரம்',
      'landing.title': 'ReWear - நிலையான ஃபேஷன் பரிமாற்றம்',
      'landing.subtitle': 'உங்கள் ஆடைகளுக்கு இரண்டாவது வாழ்க்கையை கொடுங்கள்',
      'landing.cta.swap': 'பரிமாற்றம் தொடங்கு',
      'landing.cta.browse': 'பொருட்களை உலாவு',
      'landing.cta.list': 'பொருள் பட்டியல்',
      'categories.title': 'வகை வாரியாக வாங்கவும்',
      'categories.tshirts': 'டி-ஷர்ட்',
      'categories.bottomwear': 'கீழ் உடை',
      'categories.tops': 'மேல் உடை',
      'categories.hoodies': 'ஹூடீஸ்',
      'categories.jackets': 'ஜாக்கெட்டுகள்',
      'categories.ethnic': 'பாரம்பரிய உடை',
      'categories.accessories': 'அணிகலன்கள்',
      'auth.email': 'மின்னஞ்சல்',
      'auth.password': 'கடவுச்சொல்',
      'auth.name': 'முழு பெயர்',
      'auth.phone': 'தொலைபேசி எண்',
      'auth.address': 'முகவரி',
      'auth.login': 'உள்நுழைவு',
      'auth.signup': 'பதிவு செய்யவும்'
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
