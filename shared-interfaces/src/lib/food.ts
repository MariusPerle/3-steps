export interface FoodExpiresSoon extends Food {
    discountInPercent: number;
}

export interface Food {
    amount: number;
    name: string;
    expires: Date;
}
