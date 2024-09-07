import { HttpClient } from '@angular/common/http';
import { Food } from '@3-steps/interfaces';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FarmerService {
    constructor(private readonly http: HttpClient) {}

    loadDiscountedFood(): Observable<Food[]> {
        return this.http.get<Food[]>('api/Waste');
        return of([
            {
                id: '1',
                name: 'Bread',
                expiresAt: new Date('2024-09-09'),
                price: 2.19,
                weight: '500g',
                available: 200,
            },
            {
                id: '2',
                name: 'Bear',
                expiresAt: new Date('2024-09-09'),
                price: 2.99,
                weight: '500g',
                available: 200,
            },
        ]);
    }
}
