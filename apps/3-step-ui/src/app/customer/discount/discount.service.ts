import { HttpClient } from '@angular/common/http';
import { FoodExpiresSoon } from '@3-steps/interfaces';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DiscountService {
    constructor(private readonly http: HttpClient) {}

    loadDiscountedFood(): Observable<FoodExpiresSoon[]> {
        return this.http.get<FoodExpiresSoon[]>('api/Soon');

        return of([
            {
                id: '1',
                name: 'Bread',
                expiresAt: new Date('2024-09-09'),
                price: 2.19,
                weight: '500g',
                available: 200,
                discountInPercent: 30,
            },
            {
                id: '2',
                name: 'Bear',
                expiresAt: new Date('2024-09-09'),
                price: 2.99,
                weight: '500g',
                available: 200,
                discountInPercent: 10,
            },
        ]);
    }
}
