import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }
  getProducts(){
    this.ExibirProdutos();
    this.productList.next(this.cartItemList);
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product : any){
    let include = true;
    this.cartItemList.forEach(( element: { id: any; quantity: number; total: number; price: number; } ) => {
      if (product.id==element.id){ element.quantity++; element.total= element.quantity * element.price; include=false;}
    });
    if (include==true) { this.cartItemList.push(product); }
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
    localStorage.setItem("BD_carrinho", JSON.stringify(this.cartItemList));
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
  aumentarQuantidadeDoItem(id:number) {
    this.cartItemList.forEach(( element: { id: any; quantity: number; total: number; price: number; } ) => {
      if (id==element.id) { element.quantity++; element.total= element.quantity * element.price; }
    });
    this.productList.next(this.cartItemList);
    localStorage.setItem("BD_carrinho", JSON.stringify(this.cartItemList));
  }
  diminuirQuantidadeDoItem(id:number) {
    this.cartItemList.forEach(( element: { id: any; quantity: number; total: number; price: number; } ) => {
      if (id==element.id) {
        if(element.quantity>1) {
          element.quantity--; element.total= element.quantity * element.price;
        } else { return }
      }
    });
    this.productList.next(this.cartItemList);
    localStorage.setItem("BD_carrinho", JSON.stringify(this.cartItemList));
  }
  atualizarTotalDoItem(id:number, qtd:number) {
    this.cartItemList.forEach(( element: { id: any; quantity: number; total: number; price: number; } ) => {
      if (id==element.id){ element.quantity=qtd; element.total= element.quantity * element.price; }
    });
    localStorage.setItem("BD_carrinho", JSON.stringify(this.cartItemList));
  }
  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
    localStorage.setItem("BD_carrinho", JSON.stringify(this.cartItemList));
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
    localStorage.setItem("BD_carrinho", JSON.stringify(this.cartItemList));
  }
  ExibirProdutos(): void {
    let bd = localStorage.getItem("BD_carrinho");
    if(bd) { this.cartItemList = JSON.parse(bd); } 
    else { this.cartItemList = []; }
  }
}
