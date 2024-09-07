import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Food } from '@3-steps/interfaces';

@Component({
    selector: 'step-claim-item',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './claim-item.component.html',
    styleUrl: './claim-item.component.scss',
})
export class ClaimItemComponent {
    @Input({ required: true }) item!: Food;
}
