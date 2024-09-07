import { HttpClient } from '@angular/common/http';
import { Food } from '@3-steps/interfaces';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FarmerService {
    constructor(private readonly http: HttpClient) {}

    loadDiscountedFood(): Observable<Food[]> {
        this.http.get<Food>('api/Waste');
        return of([]);
    }
}
