package com.app.service;

import java.util.List;

import com.app.pojos.Category;

public interface ICategoryService {

	List<Category> categoryListAll();

	Category addCategory(Category category);

	String deleteCategory(int cat_id);

	Category updateCategory(Category category);

}
