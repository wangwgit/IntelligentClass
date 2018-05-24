package com.tiye.IntelligentClass.pcController;


import com.alibaba.fastjson.JSONObject;
import com.tiye.IntelligentClass.common.APIResult;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.Assert.*;
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AssetsConfigControllerTest {

    protected MockMvc mvc;
    @Autowired
    protected WebApplicationContext webApplicationConnect;

    @Before
    public void setUp() throws Exception {
        mvc =MockMvcBuilders.webAppContextSetup(webApplicationConnect).build();
    }

    public MockHttpServletRequestBuilder post(String uri){
        return MockMvcRequestBuilders.post(uri)
                .accept(MediaType.APPLICATION_JSON);
    }

    public MockHttpServletRequestBuilder get(String uri){
        return MockMvcRequestBuilders.get(uri)
                .accept(MediaType.APPLICATION_JSON);
    }

    @Test
    public void bind() throws  Exception{
//        RequestBuilder requestBuilder=get("/pc/assetsConfig/bind")
//                .param("assetsId","111");
//        MvcResult mvcResult = mvc.perform(requestBuilder).andReturn();
//        int status = mvcResult.getResponse().getStatus();
//
//        assertTrue("状态不是200",status==200);
//        String resout= mvcResult.getResponse().getContentAsString();
//        APIResult apiResult=JSONObject.parseObject(resout,APIResult.class);
//        assertTrue(apiResult.getCode()==0);
    }

    @Test
    public void getXNB() throws  Exception
    {
        RequestBuilder requestBuilder=get("/pc/assetsConfig/getXNB")
                .param("assetsId","111");
        MvcResult mvcResult = mvc.perform(requestBuilder).andReturn();
        int status = mvcResult.getResponse().getStatus();
        assertTrue("状态不是200",status==200);

        System.out.println(mvcResult.getResponse().getContentAsString());
        String resout= mvcResult.getResponse().getContentAsString();
        APIResult apiResult=JSONObject.parseObject(resout,APIResult.class);
        assertTrue(apiResult.getCode()==0);
    }
}