import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bundle } from '@3-steps/interfaces';

@Injectable({ providedIn: 'root' })
export class RecipesService {
    constructor(private readonly http: HttpClient) {}

    getRecipes() {
        return this.http.get<Bundle[]>('api/receips');
    }
}
