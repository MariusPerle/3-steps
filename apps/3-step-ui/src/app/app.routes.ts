import { Route } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { FarmerComponent } from './farmer/farmer.component';
import { OrgComponent } from './org/org.component';

export const appRoutes: Route[] = [
    {
        path: 'customer',
        component: CustomerComponent,
    },
    {
        path: 'farmer',
        component: FarmerComponent,
    },
    {
        path: 'org',
        component: OrgComponent,
    },
];
