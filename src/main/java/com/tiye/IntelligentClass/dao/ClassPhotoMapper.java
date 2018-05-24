package com.tiye.IntelligentClass.dao;

import com.tiye.IntelligentClass.model.ClassPhoto;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ClassPhotoMapper {


    int getPhotoCount(Map<String,Object> params);
    List<ClassPhoto> getPhotoData(Map<String,Object> params);
    int deleteByPrimaryKey(Long id);
    int insert(ClassPhoto record);
    ClassPhoto selectByPrimaryKey(Long id);
    int updateByPrimaryKeySelective(ClassPhoto record);


}