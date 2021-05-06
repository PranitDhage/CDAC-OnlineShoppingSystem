package com.app.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.app.dao.AddressRepository;
import com.app.dao.CartRepository;
import com.app.dao.MyorderRepository;
import com.app.dao.OrderDetailsRepository;
import com.app.dao.ProductsRepository;
import com.app.dao.UsersRepository;
import com.app.pojos.Address;
import com.app.pojos.Cart;
import com.app.pojos.Myorder;
import com.app.pojos.Orderdetails;
import com.app.pojos.Products;
import com.app.pojos.Users;

@Service
@Transactional
public class CartServiceImpl implements ICartService {
	@Autowired
	CartRepository cartRepo;

	@Autowired
	UsersRepository userRepo;

	@Autowired
	ProductsRepository productRepo;

	@Autowired
	MyorderRepository myorderRepo;

	@Autowired
	OrderDetailsRepository orderdetailsRepo;

	@Autowired
	AddressRepository addressRepo;

	@Override
	public Cart addToCart(Cart cart, String username) {
		Users u = userRepo.findByUserEmail(username);
		cart.setUser(u);
		return cartRepo.save(cart);
	}

	@Override
	public List<Cart> getCartItems(String username) {
		Users u = userRepo.findByUserEmail(username);
		List<Cart> c = cartRepo.findByUser(u);
		System.out.println(c);
		return c;
	}

	@Override
	public String deleteCart(int cart_id) {
		cartRepo.deleteById(cart_id);
		return "cart deleted";
	}

	@Override
	public Cart updateCart(Cart cart) {
		// fetch cart info
		Cart oldCart = cartRepo.findById(cart.getCartId()).get();

		// update the fetched cart
		oldCart.setCartQuantity(cart.getCartQuantity());
		// then save
		return cartRepo.save(oldCart);
	}

	@Override
	public List<Cart> cartCheckout(Address a) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();

		List<Cart> carts = getCartItems(username);
		List<Cart> addedCarts = new ArrayList<Cart>();

		float total = 0;
		for (Cart cart : carts) {
			total = 0;

			// product details
			Products p = cart.getProduct();
			// user details
			Users u = cart.getUser();

			a = addressRepo.findById(a.getAddId()).get();

			// STEP 1: CHECK FOR STOCK AVALIABLITY
			// if the cart quantity is less than or equal to available product stock then
			// only checkout
			if (cart.getCartQuantity() <= p.getProdQty()) {

				// System.out.println(total +"+" + cart.getCartQuantity()
				// +"*"+cart.getProduct().getProdPrice() );

				// STEP 2: CALCUALTE THE TOTAL CART PRICE & FETCH USER DETAILS
				// calculate the total price of cart
				total = total + (cart.getCartQuantity() * p.getProdPrice());
				System.out.println("cart total: " + total);

				// STEP 3: INSERT RECORD INTO MYORDER
				Myorder m = new Myorder();
				m.setOrderDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss")));
				m.setTotalPrice(total);
				m.setUser(u);
				m.setAddress(a);

				System.out.println(m.toString());

				myorderRepo.save(m);

				// STEP 4: INSERT RECORD IN ORDERDETAILS
				// then get the myorderid and insert all details of that myorder into
				// orderdetails table
				Orderdetails od = new Orderdetails();
				od.setMyorder(m);
				od.setPrice(p.getProdPrice());
				od.setProduct(p);
				od.setQuantity(cart.getCartQuantity());

				System.out.println(od);

				orderdetailsRepo.save(od);

				// STEP 5: REDUCE THE PRODUCT STOCK FROM PRODUCT TABLE
				p.setProdQty(p.getProdQty() - cart.getCartQuantity());
				productRepo.save(p);

				// STEP 6: EMPTY THE CART
				cartRepo.deleteById(cart.getCartId());
				
				addedCarts.add(cart);
			}

		}

		return addedCarts;
	}

}
