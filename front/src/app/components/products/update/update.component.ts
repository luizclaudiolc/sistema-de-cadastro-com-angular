import { ProductsService } from './../products.service';
import { Products } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  'product': Products;

  constructor(private productsService: ProductsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productsService.readById(id).subscribe((product) => {
      this.product = product;
  });
  }
  updateProduct(): void {
    this.productsService.update(this.product).subscribe(() => {
      this.productsService.showMessege('Produto atualizado com sucesso!');
      this.router.navigate(['/products']);
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

}
