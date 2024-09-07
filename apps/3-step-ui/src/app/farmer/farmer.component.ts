import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimComponent } from '../claim/claim.component';

@Component({
    selector: 'step-farmer',
    standalone: true,
    imports: [CommonModule, ClaimComponent],
    templateUrl: './farmer.component.html',
    styleUrl: './farmer.component.scss',
})
export class FarmerComponent {}
