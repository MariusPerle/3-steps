import { Route } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { FarmerComponent } from './farmer/farmer.component';
import { OrgComponent } from './org/org.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: HomeComponent,
    },
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
