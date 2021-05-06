package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ResponseDTO;
import com.app.pojos.Address;
import com.app.pojos.Cart;
import com.app.service.ICartService;

@RestController
@CrossOrigin
@RequestMapping("/cart")
public class CartController {
	@Autowired
	ICartService cartService;
	
	@PostMapping("/addtocart")
	public ResponseDTO<?> addToCart(@RequestBody Cart cart ){
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		System.out.println("in add to cart :" + cart + " " + username);
		return new ResponseDTO<>(HttpStatus.OK, "added to cart", cartService.addToCart(cart, username));
	}
	
	@GetMapping("/items")
	public ResponseDTO<?> getCartItems(){
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		System.out.println("in get cart items: ");
		return new ResponseDTO<>(HttpStatus.OK, "cart found found", cartService.getCartItems(username));
	}

	@DeleteMapping("/{cart_id}")
	public ResponseDTO<?> deleteCart( @PathVariable int cart_id ){
		System.out.println("in delete cart: " + cart_id);
		return new ResponseDTO<>(HttpStatus.OK, "cart deleted", cartService.deleteCart(cart_id));
	}

	@PutMapping("/")
	public ResponseDTO<?> updateCart( @RequestBody Cart cart ){
		System.out.println("in update cart: " + cart.getCartId()+ cart.getCartQuantity());
		return new ResponseDTO<>(HttpStatus.OK, "cart deleted", cartService.updateCart(cart));
	}

	@PostMapping("/checkout")
	public ResponseDTO<?> cartCheckout(@RequestBody Address a){
		System.out.println("in cart checkout: " + a.getAddId());
		return new ResponseDTO<>(HttpStatus.OK, "cart checkout success", cartService.cartCheckout(a));
	}
	
}
