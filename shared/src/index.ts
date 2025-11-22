export interface User {
    id: number;
    telegramId: string;
    walletAddress?: string;
    createdAt: Date;
}

export interface Product {
    id: number;
    name: string;
    description?: string;
    priceWei: string;
    imageUrl?: string;
    createdAt: Date;
}

export interface Order {
    id: number;
    userId: number;
    productId: number;
    status: 'pending' | 'paid' | 'shipped' | 'cancelled';
    txHash?: string;
    createdAt: Date;
}
