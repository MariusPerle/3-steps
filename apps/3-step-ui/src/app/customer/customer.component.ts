import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountComponent } from './discount/discount.component';

@Component({
    selector: 'step-customer',
    standalone: true,
    imports: [CommonModule, DiscountComponent],
    templateUrl: './customer.component.html',
    styleUrl: './customer.component.scss',
})
export class CustomerComponent {}
