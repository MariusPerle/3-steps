import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountItemComponent } from './discount-item/discount-item.component';
import { DiscountService } from './discount.service';

@Component({
    selector: 'step-discount',
    standalone: true,
    imports: [CommonModule, DiscountItemComponent],
    templateUrl: './discount.component.html',
    styleUrl: './discount.component.scss',
})
export class DiscountComponent {
    items = this.discountService.loadDiscountedFood();

    constructor(private discountService: DiscountService) {}
}
