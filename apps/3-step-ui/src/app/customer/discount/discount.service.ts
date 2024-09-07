import { HttpClient } from '@angular/common/http';
import { FoodExpiresSoon } from '@3-steps/interfaces';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DiscountService {
    constructor(private readonly http: HttpClient) {}

    loadDiscountedFood(): Observable<FoodExpiresSoon[]> {
        this.http.get<FoodExpiresSoon[]>('api/Soon');

        return of([]);
    }
}
