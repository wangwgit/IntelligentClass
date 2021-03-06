package com.tiye.IntelligentClass.config;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * @Project:IntelligentClass
 * @PackageName:com.tiye.IntelligentClass.config
 * @Auther: 张颖
 * @Date: 2018年05月15日 14:11
 * @Description:
 */
@Configuration
public class WebAppConfig extends WebMvcConfigurerAdapter {
    @Value("${mypros.mappPath}")
    private String mappPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        if(mappPath.equals("") || mappPath.equals("${mypros.mappPath}")){
            String imagesPath = WebAppConfig.class.getClassLoader().getResource("").getPath();
            if(imagesPath.indexOf(".jar")>0){
                imagesPath = imagesPath.substring(0, imagesPath.indexOf(".jar"));
            }else if(imagesPath.indexOf("classes")>0){
                imagesPath = "file:"+imagesPath.substring(0, imagesPath.indexOf("classes"));
            }
            imagesPath = imagesPath.substring(0, imagesPath.lastIndexOf("/"))+"/upload/";
            mappPath = imagesPath;
        }
        LoggerFactory.getLogger(WebAppConfig.class).info("mappPath="+mappPath);
        registry.addResourceHandler("/upload/**").addResourceLocations(mappPath);
        // TODO Auto-generated method stub
        super.addResourceHandlers(registry);
    }
}
