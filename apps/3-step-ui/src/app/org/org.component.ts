import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimComponent } from '../claim/claim.component';

@Component({
    selector: 'step-org',
    standalone: true,
    imports: [CommonModule, ClaimComponent],
    templateUrl: './org.component.html',
    styleUrl: './org.component.scss',
})
export class OrgComponent {}
