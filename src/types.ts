export type PageId = 'home' | 'order_menu' | 'gallery' | 'about' | 'contact' | 'menu' | 'book_order';

export interface MenuItem {
  id: string;
  category: 'cakes' | 'custom_cakes' | 'desserts' | 'cupcakes' | 'brownies' | 'specials' | string;
  categoryGroup?: 'cakes' | 'cupcakes' | 'brownies' | 'cookies';
  categoryLabel?: string;
  themeStyle?: 'chocolate' | 'fruit' | 'fusion' | 'creamy' | 'caramel' | 'cookies' | 'classic';
  name: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
  isVegetarian?: boolean;
  flavours?: string[];
  tags?: string[];
  sheetNumber?: 1 | 2 | 3 | 4;
}

export type MenuItemDetail = MenuItem;

export interface CakeBookingOrder {
  clientName: string;
  clientPhone: string;
  eventDate: string;
  eventTime: string;
  selectedCategory: string;
  selectedItem: string;
  weight: string;
  occasionTheme: string;
  cakeInscription: string;
  dietary: string;
  deliveryType: 'pickup' | 'delivery';
  deliveryAddress?: string;
  imageReferenceUrl?: string;
  imageReferenceName?: string;
  specialInstructions?: string;
}

export type GalleryCategory =
  | 'all'
  | 'cakes'
  | 'desserts'
  | 'cupcakes'
  | 'brownies'
  | 'custom_cakes'
  | 'instagram_reels';

export interface GalleryItem {
  id: string;
  type: 'photo' | 'reel';
  title: string;
  description?: string;
  category: 'cakes' | 'desserts' | 'cupcakes' | 'brownies' | 'custom_cakes';
  image: string;
  instagramUrl?: string;
  aspectRatio?: 'square' | 'portrait' | 'reel';
  viewsCount?: string;
  likesCount?: string;
}

export interface InstagramFeedItem {
  id: string;
  type: 'reel' | 'post';
  title: string;
  thumbnail: string;
  url: string;
  caption: string;
  likes?: string;
}

export interface CustomCakeCategory {
  id: string;
  name: string;
  tagline: string;
  image: string;
  whatsappMessage: string;
}
