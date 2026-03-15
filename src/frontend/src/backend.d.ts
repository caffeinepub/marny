import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Order {
    user: Principal;
    productId: bigint;
    orderId: bigint;
    quantity: bigint;
    totalPrice: bigint;
}
export interface Product {
    id: bigint;
    name: string;
    description: string;
    emoji: string;
    pricePerCap: bigint;
}
export interface backendInterface {
    getAllProducts(): Promise<Array<Product>>;
    getOrderById(orderId: bigint): Promise<Order | null>;
    getUserOrders(user: Principal): Promise<Array<Order>>;
    initialize(): Promise<void>;
    placeOrder(productId: bigint, quantity: bigint): Promise<bigint>;
}
