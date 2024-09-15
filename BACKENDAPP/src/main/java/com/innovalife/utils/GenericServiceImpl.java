package com.innovalife.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public abstract class GenericServiceImpl<T, ID> implements GenericServiceAPI<T, ID>{

	@Override
	public T save(T entity) {
		return getDao().save(entity);
	}

	@Override
	public void delete(ID id) {
		getDao().deleteById(id);
	}

	@Override
	public T get(ID id) {
		Optional<T> obj = getDao().findById(id);
		if (obj.isPresent()) {
			return obj.get();
		}
		return null;
	}

	@Override
	public List<T> getAll() {
		List<T> resultList = new ArrayList<>();
		getDao().findAll().forEach(obj -> resultList.add(obj));
		return resultList;
	}

	public abstract CrudRepository<T, ID> getDao();
}
