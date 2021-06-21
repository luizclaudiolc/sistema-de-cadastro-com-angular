import { DeleteComponent } from './components/products/delete/delete.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ProductsComponent } from './views/products/products.component';
import { ProductsCreateComponent } from './components/products/products-create/products-create.component';
import { UpdateComponent } from './components/products/update/update.component';

import { from } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },{
    path: 'products',
    component: ProductsComponent
  },{
    path: 'products/create',
    component: ProductsCreateComponent
  },{
    path: 'products/update/:id',
    component: UpdateComponent
  },{
    path: 'products/delete/:id',
    component: DeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
