package com.tiye.IntelligentClass.controller;

import com.tiye.IntelligentClass.common.APIResult;
import com.tiye.IntelligentClass.common.Const;
import com.tiye.IntelligentClass.model.ClassPhoto;
import com.tiye.IntelligentClass.model.SysAccount;
import com.tiye.IntelligentClass.service.ClassPhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * @Project:IntelligentClass
 * @PackageName:com.tiye.IntelligentClass.controller
 * @Auther: 张颖
 * @Date: 2018年05月22日 10:15
 * @Description:班级相册
 */
@RequestMapping("/back/photo")
@Controller
public class ClassPhotoController extends BaseController{
    @Autowired
    private ClassPhotoService service;
    @Autowired
    private Environment env;


    /**
     * 获取班级相册的分页数据
     * @return
     */
    @RequestMapping("/getPhotoList")
    @ResponseBody
    public Object getPhotoList(){
        try{
            HttpSession session=this.getSession();
            SysAccount account=(SysAccount)session.getAttribute(Const.SESSION_USER);
            return service.getPhotoList(this.getParameterMap(),account);
        }catch (Exception e){
            e.getCause();
            return APIResult.resultHtException();
        }
    }

    /**
     * 根据相册ID获取照片列表
     * @param photoId
     * @return
     */
    @RequestMapping("/getPhotoPics")
    @ResponseBody
    public Object getPhotoPics(Long photoId){
        try{
            return service.getPhotoPics(photoId);
        }catch(Exception e){
            e.getCause();
            return APIResult.resultHtException();
        }
    }

    /**
     * 单独维护相册里的图片
     * @param pic
     * @param photoId
     * @return
     */
    @RequestMapping("/saveOrUpPhotoPics")
    @ResponseBody
    public Object saveOrUpPhotoPics(@RequestParam(value = "pic", required = false)MultipartFile[] pic,
                                    Long photoId){
        try{
            String filePath = env.getProperty("mypros.uploadPath"); // 文件上传后的路径
            String filePrefix=env.getProperty("mypros.filePrefix");//文件存数据库里的前缀
            if(photoId==null){
               return APIResult.result(2,"photoId为空",0,null);
            }
            service.saveOrUpPhotoPics(filePath,filePrefix,pic,photoId);
            return APIResult.result(0,"保存图片成功",0,null);
        }catch (Exception e){
            e.getCause();
            return APIResult.resultHtException();
        }
    }
    /**
     * 新增或修改班级相册
     * @param pic
     * @param photo
     * @return
     */
    @RequestMapping("/saveOrUpdatePhoto")
    @ResponseBody
    public Object saveOrUpdatePhoto(@RequestParam(value = "pic", required = false)MultipartFile[] pic,
                                    ClassPhoto photo){
        try{
            String filePath = env.getProperty("mypros.uploadPath"); // 文件上传后的路径
            String filePrefix=env.getProperty("mypros.filePrefix");//文件存数据库里的前缀
            return service.saveOrUpPhoto(filePath, filePrefix, pic,photo, this.getSession());
        }catch(Exception e){
            e.getCause();
            return APIResult.resultHtException();
        }
    }

    /**
     * 删除班级相册
     * @param id
     * @return
     */
    @RequestMapping("/delPhoto")
    @ResponseBody
    public Object delPhoto(Long id){
        try{
            String filePath = env.getProperty("mypros.uploadPath"); // 文件上传后的路径
            return service.delphoto(filePath,id);
        }catch (Exception e){
            e.getCause();
            return APIResult.resultHtException();
        }
    }

    /**
     * 批量删除数据
     * @param ids
     * @return
     */
    @RequestMapping("/delPhotoMore")
    @ResponseBody
    public Object delPhotoMore(String ids){
        try{
            String filePath = env.getProperty("mypros.uploadPath"); // 文件上传后的路径
            return service.delPhotoMore(filePath,ids);
        }catch (Exception e){
            e.getCause();
            return APIResult.resultHtException();
        }
    }

    /**
     * 获取班级相册详情
     * @param id
     * @return
     */
    @RequestMapping("/getPhotoDetail")
    @ResponseBody
    public Object getPhotoDetail(Long id){
        try{
            return service.getPhotoDetail(id);
        }catch (Exception e){
            e.getCause();
            return APIResult.resultHtException();
        }
    }








}
