import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Food } from '@3-steps/interfaces';
import { ClaimItemComponent } from './claim-item/claim-item.component';

@Component({
    selector: 'step-claim',
    standalone: true,
    imports: [CommonModule, ClaimItemComponent],
    templateUrl: './claim.component.html',
    styleUrl: './claim.component.scss',
})
export class ClaimComponent {
    @Input({ required: true }) items!: Food[];
}
