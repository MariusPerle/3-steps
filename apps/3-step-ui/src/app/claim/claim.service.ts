import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ClaimService {
    private userId = 'hackerfest';

    constructor(private readonly http: HttpClient) {}

    claimItems(itemIds: string[]) {
        return this.http.post('api/Waste/claim', {
            userId: this.userId,
            itemIds,
        });
    }
}
