import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "../model/product.model";

@Injectable({providedIn:"root"})
export class ProductsService{
    constructor(private http:HttpClient){

    }
    getAllProducts():Observable<Product[]>
    {
        let host=environment.host_serve;
        return this.http.get<Product[]>(host+"/products"); 
    }
    getSelectedProducts():Observable<Product[]>
    {
        let host=environment.host_serve;
        return this.http.get<Product[]>(host+"/products?selected=true");   
    }
    getValibaleProducts():Observable<Product[]>
    {
        let host=environment.host_serve;
        return this.http.get<Product[]>(host+"/products?valibale=true");   
    }
    getSearchProducts(keyword:string):Observable<Product[]>
    {
        let host=environment.host_serve;
        return this.http.get<Product[]>(host+"/products?name_like="+keyword);   
    }
    select(product:Product):Observable<Product>
    {
        let host=environment.host_serve;
        product.selected=!product.selected;
        return this.http.put<Product>(host+"/products/"+product.id,product);   
    }
    deleteProduct(product:Product):Observable<void>
    {
        let host=environment.host_serve;
        
        return this.http.delete<void>(host+"/products/"+product.id);   
    }
}