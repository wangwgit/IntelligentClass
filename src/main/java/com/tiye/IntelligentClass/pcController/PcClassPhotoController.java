package com.tiye.IntelligentClass.pcController;

import com.tiye.IntelligentClass.common.APIResult;
import com.tiye.IntelligentClass.controller.BaseController;
import com.tiye.IntelligentClass.service.ClassPhotoService;
import com.tiye.IntelligentClass.service.ScopUtilService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @Project:IntelligentClass
 * @PackageName:com.tiye.IntelligentClass.pcController
 * @Auther: 张颖
 * @Date: 2018年05月23日 11:23
 * @Description:
 */
@RequestMapping("/pc/photo")
@Controller
public class PcClassPhotoController extends BaseController{
    private Logger logger = Logger.getLogger(this.getClass());
    @Autowired
    private ClassPhotoService service;
    @Autowired
    private ScopUtilService scopUtilService;

    /**
     * pc端获取班级相册
     * @return
     */
    @RequestMapping("/getClassPhotos")
    @ResponseBody
    public Object getClassPhotos(){
        logger.info("客户端获取班级相册开始");
        try{
            if(!scopUtilService.checkPCParams(this.getParameterMap())){
                return APIResult.result(2,"参数错误",0,null);
            }
            logger.info("客户端获取班级相册结束");
            return service.getClassPhotos(this.getParameterMap());
        }catch (Exception e){
            logger.info("客户端获取班级相册异常");
            e.getCause();
            return APIResult.resultHtException();
        }
    }
}
