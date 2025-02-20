import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroisListaComponent } from './components/herois-lista/herois-lista.component';

export const routes: Routes = [
  { path: '', redirectTo: '/herois', pathMatch: 'full' },
  { path: 'herois', component: HeroisListaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }