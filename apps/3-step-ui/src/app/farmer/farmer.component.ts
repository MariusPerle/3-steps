import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimComponent } from '../claim/claim.component';
import { FarmerService } from './farmer.service';

@Component({
    selector: 'step-farmer',
    standalone: true,
    imports: [CommonModule, ClaimComponent],
    templateUrl: './farmer.component.html',
    styleUrl: './farmer.component.scss',
})
export class FarmerComponent {
    items = this.farmerService.loadDiscountedFood();

    constructor(private farmerService: FarmerService) {}
}
