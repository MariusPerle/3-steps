import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountComponent } from './discount/discount.component';
import { RecipesComponent } from './recipes/recipes.component';

@Component({
    selector: 'step-customer',
    standalone: true,
    imports: [CommonModule, DiscountComponent, RecipesComponent],
    templateUrl: './customer.component.html',
    styleUrl: './customer.component.scss',
})
export class CustomerComponent {}
