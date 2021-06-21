import { catchError, map } from 'rxjs/operators';
import { Products } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  urlpadrao = 'http://localhost:3000/produtcs';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessege(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }
// Criação de produtos
  create(product: Products): Observable<Products> {
    return this.http.post<Products>(this.urlpadrao, product).pipe(
      map((obj) => obj),
      catchError(e => this.handlerError(e))
      );
  }
// Lê lista de produtos
  read(): Observable<Products[]> {
    return this.http.get<Products[]>(this.urlpadrao).pipe(
      map((obj) => obj),
      catchError(e => this.handlerError(e))
      );
  }
// Consulta de produto
  readById(id: any): Observable<Products> {
    const url = `${this.urlpadrao}/${id}`;
    return this.http.get<Products>(url).pipe(
      map((obj) => obj),
      catchError(e => this.handlerError(e))
      );
  }
// Atualiza produto
  update(product: Products): Observable<Products> {
    const url = `${this.urlpadrao}/${product.id}`;
    return this.http.put<Products>(url, product).pipe(
      map((obj) => obj),
      catchError(e => this.handlerError(e))
      );
  }
// Deleta produto
  delete(id: any): Observable<Products> {
    const url = `${this.urlpadrao}/${id}`;
    return this.http.delete<Products>(url).pipe(
      map((obj) => obj),
      catchError(e => this.handlerError(e))
      );
  }

  // Tratamento de Erros
  handlerError(e: any): Observable<any> {
    this.showMessege('Ocorreu um erro!', true);
    return EMPTY;
  }
}
