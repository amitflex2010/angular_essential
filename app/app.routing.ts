import { Routes, RouterModule } from '@angular/router';

import { MediaItemFormComponent } from './media-item-form.component';
import { MediaItemListComponent } from './media-item-list.component';
import { MediaItemDetailComponent } from './media-item-detail.component';

const appRoutes: Routes = [
  { path: 'add', component: MediaItemFormComponent },
  { path: 'details/:id', component: MediaItemDetailComponent },
  { path: ':medium', component: MediaItemListComponent },
  { path: '', pathMatch: 'full', redirectTo: 'all' }
];

export const routing = RouterModule.forRoot(appRoutes);

