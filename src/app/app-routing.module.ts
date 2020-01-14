import { NgModule, Input } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignatureComponent } from './signature/signature.component';

const routes: Routes = [
  { path: 'root', component: SignatureComponent },
  { path: '', component: SignatureComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule {
}
