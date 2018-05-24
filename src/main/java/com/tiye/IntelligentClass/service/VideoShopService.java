package com.tiye.IntelligentClass.service;

import com.tiye.IntelligentClass.common.APIResult;
import com.tiye.IntelligentClass.dao.VideoShopMapper;
import com.tiye.IntelligentClass.model.VideoShop;
import com.tiye.IntelligentClass.util.PageUtil;
import com.tiye.IntelligentClass.util.ParameterMap;
import org.springframework.stereotype.Service;


import javax.annotation.Resource;
import java.util.List;

@Service
public class VideoShopService {
    @Resource
    VideoShopMapper videoShopMapper;

    public void add(VideoShop videoShop) {
        videoShopMapper.insert(videoShop);
    }

    public void update(VideoShop videoShop) {
        videoShopMapper.update(videoShop);
    }

    public void delete(String ids) {
        videoShopMapper.updateDelFlg(ids, 1);
    }

    public VideoShop get(long id) {
        return videoShopMapper.get(id);
    }

    public long selectCount(ParameterMap params) {
        return videoShopMapper.selectCount(params);
    }

    public List<VideoShop> select(ParameterMap params) {
        params.setPageParams();
        return videoShopMapper.select(params);
    }

    public List<VideoShop> getCy(int pageSize,int curPage,String njDm)
    {
        return  videoShopMapper.getCy(PageUtil.getCurIndex(pageSize,curPage),pageSize,njDm);
    }
    public long getCyCount(String njDm)
    {
        return  videoShopMapper.getCyCount(njDm);
    }
    public long getTypeCount(String njDm,String vtype)
    {
        return videoShopMapper.getTypeCount(njDm,vtype);
    }
    public  List<VideoShop> getByType(int pageSize,int curPage,String njDm,String vtype)
    {
        return  videoShopMapper.getByType(PageUtil.getCurIndex(pageSize,curPage),pageSize,njDm,vtype);
    }
}
