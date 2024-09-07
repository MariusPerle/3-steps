import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimComponent } from '../claim/claim.component';
import { OrgService } from './org.service';

@Component({
    selector: 'step-org',
    standalone: true,
    imports: [CommonModule, ClaimComponent],
    templateUrl: './org.component.html',
    styleUrl: './org.component.scss',
})
export class OrgComponent {
    items = this.orgService.loadDiscountedFood();

    constructor(private orgService: OrgService) {}
}
