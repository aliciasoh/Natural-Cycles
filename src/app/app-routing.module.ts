import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TextInputComponent } from './components/text-input/text-input.component';


const routes: Routes = [
  { path: '', component: TextInputComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
