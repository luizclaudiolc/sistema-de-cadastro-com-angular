import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from './../products.service';
import { Products } from './../product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  'product': Products;

  constructor(private productsService: ProductsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productsService.readById(id).subscribe(product => {
      this.product = product;
    });
  }

  deleteProducts(): void {
    this.productsService.delete(this.product.id).subscribe(() => {
      this.productsService.showMessege('Excluido com sucesso!');
      this.router.navigate(['/products']);
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

}
