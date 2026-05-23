export interface Product {
  readonly id: string;
  readonly name: string;
  readonly category: 'dairy' | 'greens' | 'eggs' | 'other';
  readonly price: number;
  readonly unit: string;
  readonly emoji: string;
  readonly description: string;
  available: boolean;
  stock: number;
}

export interface SubscriptionItem {
  readonly productId: string;
  readonly productName: string;
  quantity: number;
  readonly pricePerUnit: number;
}

export type SubscriptionFrequency = 'daily' | 'alternate-days' | 'weekly';
export type SubscriptionStatus = 'active' | 'paused' | 'cancelled';
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'out-for-delivery'
  | 'delivered'
  | 'cancelled';
export type DeliverySlot = '6AM-8AM' | '7AM-9AM' | '8AM-10AM';
export type DeliveryStatus = 'pending' | 'delivered' | 'failed';

export interface Subscription {
  readonly id: string;
  readonly userId: string;
  readonly userName: string;
  readonly userPhone: string;
  readonly deliveryAddress: string;
  items: SubscriptionItem[];
  frequency: SubscriptionFrequency;
  readonly startDate: string;
  status: SubscriptionStatus;
  readonly deliverySlot: DeliverySlot;
  nextDelivery: string;
  readonly monthlyTotal: number;
}

export interface OrderItem {
  readonly productId: string;
  readonly productName: string;
  readonly quantity: number;
  readonly price: number;
}

export interface Order {
  readonly id: string;
  readonly userId: string;
  readonly userName: string;
  readonly type: 'subscription' | 'one-time';
  readonly items: OrderItem[];
  readonly total: number;
  status: OrderStatus;
  readonly deliveryDate: string;
  readonly deliveryAddress: string;
  readonly createdAt: string;
}

export interface DeliveryTask {
  readonly id: string;
  readonly orderId: string;
  readonly customerName: string;
  readonly address: string;
  readonly phone: string;
  readonly itemsSummary: string;
  readonly slot: DeliverySlot;
  status: DeliveryStatus;
  notes: string;
  readonly sequence: number;
}

export interface User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  readonly joinedAt: string;
  readonly activeSubscriptions: number;
  readonly totalOrders: number;
  readonly totalSpend: number;
}

export interface CartItem {
  readonly product: Product;
  quantity: number;
}

export interface DashboardStats {
  readonly totalActiveUsers: number;
  readonly totalActiveSubscriptions: number;
  readonly todayDeliveries: number;
  readonly todayCompletedDeliveries: number;
  readonly todayRevenue: number;
  readonly pendingOrders: number;
  readonly lowStockProducts: number;
}
