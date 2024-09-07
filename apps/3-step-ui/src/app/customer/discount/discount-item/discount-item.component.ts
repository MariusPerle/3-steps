import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodExpiresSoon } from '@3-steps/interfaces';

@Component({
    selector: 'step-discount-item',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './discount-item.component.html',
    styleUrl: './discount-item.component.scss',
})
export class DiscountItemComponent {
    @Input({ required: true }) item!: FoodExpiresSoon;
}
