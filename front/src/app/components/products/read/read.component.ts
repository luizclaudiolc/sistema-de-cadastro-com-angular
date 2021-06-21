import { Observable } from 'rxjs';
import { ProductsService } from './../products.service';
import { Products } from './../product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  products: Products[] = [];
  displayedColumns = ['id', 'name', 'price', 'action'];

  productsObservable: Observable<Products[]> | undefined;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productsObservable = this.productService.read();

    this.productsObservable.subscribe(products => {
      this.products = products;
    });
  }
}
