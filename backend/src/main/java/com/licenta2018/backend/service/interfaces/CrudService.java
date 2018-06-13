package com.licenta2018.backend.service.interfaces;

import java.util.List;

public interface CrudService<T>{
    void save(T entity);

    List<T>getAll();

    List<T> getAll(int pageSize,int pageNumber);

    T getById(Long id);

    void delete(Long id);

    void deleteAll();
}