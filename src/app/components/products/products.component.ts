import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { catchError, map, startWith } from 'rxjs/operators';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$:Observable<AppDataState<Product[]>>;
  readonly DataStateEnum=DataStateEnum;
  constructor(private productServices:ProductsService) { }

  ngOnInit() {
  }
  onGetAllProducts()
  {
    this.products$=this.productServices.getAllProducts()
    .pipe(
      map((data)=>{
      return ({dataState:DataStateEnum.LOADED,data:data})}),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError((err)=>of({dataState:DataStateEnum.ERROR,errorMessage:"erreur serveur réessayer !"}))
    );
   
  }
  onGetSelectedProducts(){
    this.products$=this.productServices.getSelectedProducts()
    .pipe(
      map((data)=>
      {
        return ({dataState:DataStateEnum.LOADED,data:data
      })}),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError((err)=>
        of({dataState:DataStateEnum.ERROR,errorMessage:"erreur serveur veuillez réessayer plus tard ! "}))
    );
  }
  onGetAvailabeProducts(){
    this.products$=this.productServices.getValibaleProducts()
    .pipe(
      map((data)=>{
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError((err)=>of({dataState:DataStateEnum.ERROR,errorMessage:"erreur serveur veuillez réessayer plus tard ! "}))
    )
  }
  onSearch(dataForms:any)
  { 
    this.products$=this.productServices.getSearchProducts(dataForms.keyword)
    .pipe(
      map((data)=>{
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError((err)=>of({dataState:DataStateEnum.ERROR,errorMessage:"erreur serveur veuillez réessayer plus tard ! "}))
    )

  }
  onSelect(prod:Product)
  {
    this.productServices.select(prod)
    .subscribe((data)=>{
      prod.selected=data.selected
    })
  }
  onDelete(prod:Product)
  {
    let v=confirm("Etes vous sûre?");
    if(v)
    this.productServices.deleteProduct(prod)
    .subscribe((data)=>{
      this.onGetAllProducts();
      
    })
  }
  
}
