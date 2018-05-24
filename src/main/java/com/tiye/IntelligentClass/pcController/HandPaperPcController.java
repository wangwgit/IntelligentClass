package com.tiye.IntelligentClass.pcController;

import com.tiye.IntelligentClass.common.APIResult;
import com.tiye.IntelligentClass.controller.BaseController;
import com.tiye.IntelligentClass.service.HandPaperService;
import com.tiye.IntelligentClass.service.ScopUtilService;
import com.tiye.IntelligentClass.util.ParameterMap;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @Project:IntelligentClass
 * @PackageName:com.tiye.IntelligentClass.pcController
 * @Auther: 张颖
 * @Date: 2018年05月21日 14:14
 * @Description:
 */
@RequestMapping("/pc/handPaper")
@Controller
public class HandPaperPcController extends BaseController{
    private Logger logger = Logger.getLogger(this.getClass());
    @Autowired
    private HandPaperService service;
    @Autowired
    private ScopUtilService scopUtilService;

    /**
     * PC端获取手抄报
     * @return
     */
    @RequestMapping(value = "/getHandPapersPc",method = RequestMethod.GET)
    @ResponseBody
    public Object getHandPapersPc(){
        logger.info("客户端获取手抄报开始");
        try{
            ParameterMap params=this.getParameterMap();//参数
            if(!scopUtilService.checkPCParams(params)){
                return APIResult.result(2,"参数错误",0,null);
            }
            logger.info("客户端获取手抄报结束");
            return service.getHandPapersPc(params);
        }catch(Exception e){
            logger.info("客户端获取手抄报异常："+e.getCause());
            e.getCause();
            return APIResult.result(1,"后台异常",0,null);
        }
    }
}
