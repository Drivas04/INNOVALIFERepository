package com.innovalife.utils;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface GenericServiceAPI<T, ID> {
	
	T save(T entity);
		
	T get(ID id);
	
	List<T> getAll();

	void delete(ID id);

}
