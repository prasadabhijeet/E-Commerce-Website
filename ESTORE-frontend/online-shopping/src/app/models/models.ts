import {Observable} from 'rxjs';

export enum Roles {
  Admin = 'Admin',
  Seller = 'Seller',
  Buyer = 'Buyer'
}

export class User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  role: string;
  isApprovedUser: number;
  points: number;
}

export class LoginInfo {
  username: string;
  password: string;
}

export class ApiResponse {

  status: number;
  message: string;
  result: any;
}

export class Product {
  _id: string;
  title: string;
  description: string;
  imagePath: string;
  price: number;
  qty: number;
  seller: string;
  reviews: Review[];

  reviewAverage = () => {
      let average = 0;
      if (this.reviews) {
        average = this.reviews.reduce( (sum, value) => {
          return sum + value.rating;
        }, 0) / this.reviews.length;
      }
      return 3;
    };
}

export class Cart {
  items: Product[];
  totals = 0;
  constructor() {
    this.items = new Array();
  }
}

export interface IService<T> {
  GetById(id: String): Observable<ApiResponse>;
  Post(entity: T): Observable<ApiResponse>;
  Put(id, entity: T): Observable<T>;
  Delete(id: String): Observable<ApiResponse>;
}

export enum ApprovalType {
  Seller = 1,
  Review = 2,
}
export enum OrderStatus{
  PENDING = 'Pending',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELED = 'Canceled'
}

export enum PaymentMethod{
  DEBIT = 'DebitCard',
  CREDIT = 'CreditCard',
  PAYPAL = 'PayPal'
}


export class Order {
  _id: String;
  totalPrice: number;
  subTotalPrice: number;
  shippingPrice: number = 10;
  purchaseDate: Date;
  status: String;
  products: Product[];
  billingAddress: Address;
  shippingAddress: Address;
  buyer: User;
  coupon: Coupon;
  payment: Payment;
  seller: User;

  constructor() {
    this.products = new Array();
    this.billingAddress = new Address();
    this.shippingAddress = new Address();
    this.buyer = new User();
    this.coupon = new Coupon();
    this.payment = new Payment();
  }
}

export class Review {
  description: string;
  rating: number;
  buyer: string;
  approved = false;
}

export class Address {
  firstName: string;
  lastName: string;
  email:string;
  phone:string;
  city:string;
  zipCode:string;
  streetAddress:string;
}

export class Coupon {
  code: string;
  description:string;
  percentage:number;
  expiryDate: Date;
  seller: string;
}

export class Payment {
  paymentMethod: string;
  amount: number;
  status: string;
  date: Date;
}
