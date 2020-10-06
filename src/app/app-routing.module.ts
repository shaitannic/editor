import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './pages/editor/editor.component';

const routes: Routes = [
  {
    path: 'editor',
    component: EditorComponent
  },
  {
    path:'**', redirectTo: 'editor' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
