export class Food {
    amount: number;
    name: string;
    expires: Date;
}

export class FoodExpiresSoon extends Food {
    discountInPercent: number;
}
