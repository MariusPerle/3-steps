export class Food {
    id!: string;
    name!: string;
    expiresAt!: Date;
    price!: number;
    weight!: string;
    available!: number;
}

export class FoodExpiresSoon extends Food {
    discountInPercent!: number;
}
