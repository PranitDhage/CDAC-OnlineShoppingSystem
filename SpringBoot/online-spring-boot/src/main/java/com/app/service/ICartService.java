package com.app.service;

import java.util.List;

import com.app.pojos.Address;
import com.app.pojos.Cart;

public interface ICartService {

	Cart addToCart(Cart cart, String username);

	List<Cart> getCartItems(String username);

	String deleteCart(int cart_id);

	Cart updateCart(Cart cart);

	List<Cart> cartCheckout(Address address);

}
