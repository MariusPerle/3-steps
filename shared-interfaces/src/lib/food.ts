export class Food {
    id: string;
    name: string;
    expiresAt: Date;
    price: number;
    weight: string;
    available: number;

    constructor(id: string, name: string, expiresAt: string, price: number, weight: string, available: number) {
        this.id = id;
        this.name = name;
        this.expiresAt = new Date(expiresAt);
        this.price = price;
        this.weight = weight;
        this.available = available;
    }
}

export class FoodExpiresSoon extends Food {
    discountInPercent: number;

    constructor(id: string, name: string, expiresAt: string, price: number, weight: string, available: number, discountInPercent: number) {
        super(id, name, expiresAt, price, weight, available);
        this.discountInPercent = discountInPercent;
    }

    
}
