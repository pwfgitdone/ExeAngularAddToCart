import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;
  
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    });
    this.cartService.ExibirProdutos();
  }
  aumentarQuantidade(id:number) {
    this.cartService.aumentarQuantidadeDoItem(id);
  }
  diminuirQuantidade(id:number) {
    this.cartService.diminuirQuantidadeDoItem(id);
  }
  atualizarTotal(id:number, qtd: number) {
    this.cartService.atualizarTotalDoItem(id, qtd);
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }

}
