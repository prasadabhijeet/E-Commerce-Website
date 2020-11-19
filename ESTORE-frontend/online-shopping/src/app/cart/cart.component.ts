import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Cart} from '../models/models';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart = new Cart();

  constructor(private activatedRoute: ActivatedRoute, public cartService: CartService, private router: Router) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.cartService.addOnCart(id).subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.getCart();
      });
    } else {
      this.getCart();
    }

    this.loadScripts();
  }

  clear() {
    this.cartService.clear().subscribe(res => {
      this.cart = null;
      this.router.navigateByUrl('/cart');

    });
  }

  getCart() {
    this.cartService.getCart().subscribe((res: HttpResponse<Cart>) => {
      console.log(res);
      this.cart = res.body;
    });
  }

  loadScripts() {
    const externalScriptArray = [
      "assets/js/vendor/modernizr-3.5.0.min.js",
      "assets/js/vendor/jquery-1.12.4.min.js",
      "assets/js/popper.min.js",
      "assets/js/bootstrap.min.js",
      "assets/js/jquery.slicknav.min.js",
      "assets/js/owl.carousel.min.js",
      "assets/js/slick.min.js",
      "assets/js/wow.min.js",
      "assets/js/animated.headline.js",
      "assets/js/jquery.magnific-popup.js",
      "assets/js/jquery.scrollUp.min.js",
      "assets/js/jquery.nice-select.min.js",
      "assets/js/jquery.sticky.js",
      "assets/js/contact.js",
      "assets/js/jquery.form.js",
      "assets/js/jquery.validate.min.js",
      "assets/js/mail-script.js",
      "assets/js/jquery.ajaxchimp.min.js",
      "assets/js/plugins.js",
      "assets/js/main.js",
      "assets/js/swiper.min.js",
      "assets/js/mixitup.min.js",
      "assets/js/jquery.counterup.min.js",
      "assets/js/waypoints.min.js"
    ];
    for (let i = 0; i < externalScriptArray.length; i++) {
      const scriptTag = document.createElement('script');
      scriptTag.src = externalScriptArray[i];
      scriptTag.type = 'text/javascript';
      scriptTag.async = false;
      document.getElementsByTagName('body')[0].appendChild(scriptTag);
    }
  }

}
