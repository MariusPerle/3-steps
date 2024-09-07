import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Food } from '@3-steps/interfaces';
import { ClaimItemComponent } from './claim-item/claim-item.component';
import { ClaimService } from './claim.service';

@Component({
    selector: 'step-claim',
    standalone: true,
    imports: [CommonModule, ClaimItemComponent],
    templateUrl: './claim.component.html',
    styleUrl: './claim.component.scss',
})
export class ClaimComponent {
    @Input({ required: true }) items!: Food[];
    selectedIds: string[] = [];

    constructor(private readonly claimService: ClaimService) {}

    select(id: string) {
        if (this.selectedIds.includes(id)) {
            this.selectedIds = this.selectedIds.filter(
                (itemId) => itemId === id
            );
        } else {
            this.selectedIds = [...this.selectedIds, id];
        }
    }

    claimItems() {
        this.claimService.claimItems(this.selectedIds).subscribe();
    }
}
