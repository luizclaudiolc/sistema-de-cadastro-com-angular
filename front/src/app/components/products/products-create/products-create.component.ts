import { Products } from './../product.model';
import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.css']
})
export class ProductsCreateComponent implements OnInit {

  product: Products = {
    name: '',
    price: null
  };

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit(): void {
  }

  createProducts(): void {
    this.productsService.create(this.product).subscribe(() => {
      this.productsService.showMessege('Sucesso!!!');
      this.router.navigate(['/products']);
    });
  }
  cancel(): void {
    this.router.navigate(['/products']);
  }
}
