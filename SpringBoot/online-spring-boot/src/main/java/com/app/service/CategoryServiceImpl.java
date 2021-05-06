package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.CategoryRepository;
import com.app.pojos.Category;

@Service
@Transactional
public class CategoryServiceImpl implements ICategoryService {

	@Autowired
	CategoryRepository categoryRepo;

	@Override
	public List<Category> categoryListAll() {
		return categoryRepo.findAll();
	}

	@Override
	public Category addCategory(Category category) {
		return categoryRepo.save(category);
	}

	@Override
	public String deleteCategory(int cat_id) {
		if (categoryRepo.existsById(cat_id)) {
			categoryRepo.deleteById(cat_id);
			return "category deleted";
		}
		return "category not found";
	}

	@Override
	public Category updateCategory(Category category) {
		Category cat = categoryRepo.findById(category.getCatId()).get();
		cat.setCatTitle(category.getCatTitle());
		cat.setCatDescription(category.getCatDescription());
		
		return categoryRepo.save(cat);
	}

}
