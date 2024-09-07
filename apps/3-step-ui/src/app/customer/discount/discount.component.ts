import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountItemComponent } from './discount-item/discount-item.component';

@Component({
    selector: 'step-discount',
    standalone: true,
    imports: [CommonModule, DiscountItemComponent],
    templateUrl: './discount.component.html',
    styleUrl: './discount.component.scss',
})
export class DiscountComponent {}
