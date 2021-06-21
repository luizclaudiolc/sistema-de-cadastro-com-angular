import { ProductsService } from './../../components/products/products.service';
import { Products } from './../../components/products/product.model';
import { HeaderService } from './../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService, private productService: ProductsService) {
    headerService.headerData = {
      title: 'Cadastro de produtos',
      icon: 'storefront',
      routeUrl: '/products'
    };
  }

public data = new Date();
dia = `${this.data.toLocaleString('pt-BR', { weekday: 'long'})}`;
diaMes = `${this.data.toLocaleString('pt-BR', { day: '2-digit'})}`;
mes = `${this.data.toLocaleString('pt-BR', { month: '2-digit'})}`;
ano = `${this.data.toLocaleString('pt-BR', { year: '2-digit'})}`;
fileName = `${this.dia}-${this.diaMes}-${this.mes}-${this.ano}.xlsx`;
products: Products[] = [];

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = products;
    });
  }

  navigationProductsCreate(): void {
    this.router.navigate(['/products/create']);
  }

  exportexcel(): void {

  const workSheetColumnName = [
    'ID',
    'Nome',
    'Preço'
  ];

  const data = this.products.map(product => {
    return [product.id, product.name, product.price];
  });

  const workBook = XLSX.utils.book_new();
  const workSheetData = [
    workSheetColumnName,
    ...data
  ];

  const workSheetName = 'Plan1';
  const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
  XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
  XLSX.writeFile(workBook, this.fileName);


    // const element = document.getElementById('excel-table'); 
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // // let acc = 1;
    // // while (ws[`D${acc}`] !== undefined){
    // //   delete (ws[`D${acc++}`]);
    // // }
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Plan1');

    //   /* save to file */
    // XLSX.writeFile(wb, this.fileName);
  }
}
