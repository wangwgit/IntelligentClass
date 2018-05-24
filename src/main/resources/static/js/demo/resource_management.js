$(document).ready(function () {
    $(".i-checks").iCheck({
        checkboxClass:'icheckbox_square-blue',
        radioClass: "iradio_square-blue",
    })
})
var limitcount = 10;
var curnum = 1;
//列表查询方法
function productsearch(start,limitsize,title,vtype,author,iscy) {
    layui.use(['table','laypage','layer','jquery','form','laydate','upload'], function(){
        var table = layui.table,
            laydate=layui.laydate,
            laypage = layui.laypage,
            layer=layui.layer,
            upload=layui.upload,
            form=layui.form,
            $=layui.jquery,
            form=layui.form;
        table.render({
            elem: '#layui_table_id',
            method: 'post'
            , url: 'back/videoShop/select'
            ,where:{
                vtype:vtype,
                title:title,
                author:author,
                iscy:iscy,
                pageNo:start,
                pageSize: limitsize
            }
            ,cols: [[
                {field:'id',type:'checkbox'},
                 {field: 'vtype', title: '视频类型', minWidth: '100', sort: true},
                {field: 'title', title: '标题', minWidth: '100', sort: true}
                ,{field: 'author', title: '作者', minWidth: '100', sort: true}
                ,{field: 'desp', title: '简介', minWidth: '100', sort: true}
                , {field: 'iscy', title: '状态', minWidth: '80', sort: true,templet:function (d) {
                        if(d.iscy=="1"){
                            return '<span class="text-success">常用</span>'
                        }else{
                            return '<span class="text-warning">不常用</span>'
                        }

                    }}
                , {field: 'createTime', title: '创建时间', minWidth: '160'}
                , {field: 'poperation', title: '操作', minWidth: '120', toolbar: '#barDemo'}
            ]]
            , page: false
            , height: 430
            ,id:'idTest'
            ,done: function(res, curr, count){
                laypage.render({
                    elem:'laypage'
                    ,count:count
                    ,curr:curnum
                    ,limit:limitcount
                    ,layout: ['prev', 'page', 'next', 'skip','count','limit']
                    ,jump:function (obj,first) {
                        if(!first){
                            curnum = obj.curr;
                            limitcount = obj.limit;
                            var title=$("input[name='stitle']").val()
                                ,author=$("#author").val()
                                ,vtype=$("#type option:selected").val()
                                ,iscy=$("#iscy option:selected").val()
                            productsearch(curnum,limitcount,title,vtype,author,iscy);
                        }
                    }
                });
                //data1日期范围
                var start=laydate.render({
                    elem:"#dateStart",
                    done:function (value,date) {
                        end.config.min=date
                        end.config.min.month = date.month -1;
                    }
                })
                var end=laydate.render({
                    elem:"#dateEnd",
                    done:function (value,date) {

                    }
                })
                $("#search").click(function () {
                    var title=$("input[name='stitle']").val()
                        ,author=$("#author").val()
                        ,vtype=$("#type option:selected").val()
                        ,iscy=$("#iscy option:selected").val()
                    productsearch(curnum,limitcount,title,vtype,author,iscy);
                })
                $("#reset").click(function () {

                    window.location.reload()
                })
            }
        })
        //表格操作事件监听
        table.on('tool(test)',function(obj){
            var layData=obj.data;
            if(obj.event=='edit'){
                //编辑操作
                console.log(layData)
                 $("#uplaod").modal("show")
                    $("input[name='title']").val(layData.title)
                    $("#vtype option[value='"+layData.vtype+"']").attr("selected","selected")
                    $("input[name='author']").val(layData.author)
                    $("#desp").val(layData.desp)
                    $("#imgView").attr("src",layData.frontCover)
                    console.log(layData);
                    var arr=layData.nj.split(",");
                   var arrUrl=layData.resourceUrl.split(",")
                    for(var i=0;i<$("input[name='nj']").length;i++){
                        $("input[name='nj']").eq(i).iCheck('uncheck')
                        for (var j=0;j<arr.length;j++){
                            if($("input[name='nj']").eq(i).val()==arr[j]){
                                $("input[name='nj']").eq(i).iCheck('check')
                            }
                        }
                    }
                    $("#iscys:checked")?$("#iscys").iCheck('check'):$("#iscys").iCheck('uncheck')


                    $(".firstUrl").val(arrUrl[0])
                    for (var i=1;i<arrUrl.length;i++){
                        var group=$('<div class="input-group" style="margin-top: 15px;"></div>'),
                            iptK=$('<input type="text" class="form-control" name="resourceUrl" autocomplete="false" value="'+arrUrl[i]+'">'),
                            btnG=$('<div class="input-group-addon" style="padding: 0;padding-left: 10px;"></div>')
                            btnDel=$('<button class="btn btn-danger bnt-xs btnDel" type="button"><i class="fa fa-trash-o"></i></button>');
                            var t1=$(btnG).append(btnDel)
                            var t2= $(group).append(iptK).append(t1)
                            $("#addUrl").append(t2);
                            btnDel.bind("click",function () {
                                $(this).parents('.input-group').remove()
                            })
                    }
                //小学初中全选
                $(".studySection").find('.i-checks').on('ifChecked',function(){
                    $(this).parents('.studySection').next().find('.i-checks').iCheck('check')
                })
                $(".studySection").find('.i-checks').on('ifUnchecked',function(){
                    $(this).parents('.studySection').next().find('.i-checks').iCheck('uncheck')
                })
                //地址栏删除添加
                $("#btnAdd").click(function () {
                    var group=$('<div class="input-group" style="margin-top: 15px;"></div>'),
                        iptK=$('<input type="text" class="form-control" name="resourceUrl" autocomplete="false">'),
                        btnG=$('<div class="input-group-addon" style="padding: 0;padding-left: 10px;"></div>')
                    btnDel=$('<button class="btn btn-danger bnt-xs btnDel" type="button"><i class="fa fa-trash-o"></i></button>');
                    var t1=$(btnG).append(btnDel)
                    var t2= $(group).append(iptK).append(t1)
                    $("#addUrl").append(t2);
                    btnDel.bind("click",function () {
                        $(this).parents('.input-group').remove()
                    })
                });
                    //编辑提交修改
                    $("#test01").click(function () {
                        var pic = $('#fileUpload')[0].files[0];
                        var fd = new FormData(),iscyss,arrUrl=[];
                        var arr=[],obj=document.getElementsByName('nj');
                        for(k in obj){
                            if(obj[k].checked)
                                arr.push(obj[k].value);
                        }
                        if($("#iscys:checked")){
                            iscyss=1
                        }else{
                            iscyss=0
                        }
                        for (var i=0;i<$("input[name='resourceUrl']").length;i++){
                            arrUrl.push($("input[name='resourceUrl']").eq(i).val())
                        }

                        console.log(arrUrl.join(","))

                        fd.append('file', pic);
                        fd.append('vtype',$("#vtype option:selected").val());
                        fd.append('title',$("input[name='title']").val());
                        fd.append('author',$("input[name='author']").val());
                        fd.append('desp',$("#desp").val());
                        //资源地址
                        fd.append('resourceUrl',arrUrl.join(","));
                        fd.append('nj',arr.join(","));
                        fd.append('iscy',iscyss);
                        fd.append('id',layData.id);
                        $.ajax({
                            type:"POST",
                            url:'back/videoShop/addOrUpdate',
                            data:fd,
                            dataType: 'JSON',
                            cache: false,
                            processData: false,
                            contentType: false,
                            success:function (res) {
                                console.log(res)
                                if(res.code==0){
                                    layer.msg("上传成功",{time:1000},function(){
                                        window.location.reload()
                                    })
                                }
                            }
                        })
                    })
            }else if(obj.event=='delete'){
                layer.confirm("确定要删除吗?",function(index){
                    //数据操作
                    $.get("back/videoShop/delete",{ids:layData.id},function (res) {
                        obj.del()
                        layer.close(index);
                        window.location.reload()
                    })
                })
            }
        })
        //事件操作
        var active={
            deleteMore:function(){
                var checkStatus=table.checkStatus('idTest');
                var dataStatus=checkStatus.data;
                var arr=[];
                if (dataStatus.length!=0){
                    for (var i=0;i<dataStatus.length;i++){
                        arr.push(dataStatus[i].id)
                    }
                    layer.confirm("确定删除吗?",function(index){
                        $.get("back/videoShop/delete",{ids:arr.join(",")},function (res) {
                            layer.close(index);
                            window.location.reload()
                        })


                    })
                }else{
                    layer.alert("请选择需要删除的内容")
                }
            },
        }
        $('.btnGroup .btn').on('click', function(){
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });

        //新增资源
       $("#add").click(function () {
           $("#uplaod").modal("show")
            function getObjectURL(file) {
                var url = null;
                if (window.createObjectURL != undefined) { // basic
                    url = window.createObjectURL(file);
                } else if (window.URL != undefined) { // mozilla(firefox)
                    url = window.URL.createObjectURL(file);
                } else if (window.webkitURL != undefined) { // webkit or chrome
                    url = window.webkitURL.createObjectURL(file);
                }
                return url;
            }
            $("#fileUpload").change(function () {
                var objUrl = getObjectURL(this.files[0]) ;
                if (objUrl) {
                    $("#imgView").attr("src", objUrl);
                }
            })
            //小学初中全选
            $(".studySection").find('.i-checks').on('ifChecked',function(){
                $(this).parents('.studySection').next().find('.i-checks').iCheck('check')
            })
            $(".studySection").find('.i-checks').on('ifUnchecked',function(){
                $(this).parents('.studySection').next().find('.i-checks').iCheck('uncheck')
            })
           //地址栏删除添加
           $("#btnAdd").click(function () {
               var group=$('<div class="input-group" style="margin-top: 15px;"></div>'),
                   iptK=$('<input type="text" class="form-control" name="resourceUrl" autocomplete="false">'),
                   btnG=$('<div class="input-group-addon" style="padding: 0;padding-left: 10px;"></div>')
               btnDel=$('<button class="btn btn-danger bnt-xs btnDel" type="button"><i class="fa fa-trash-o"></i></button>');
               var t1=$(btnG).append(btnDel)
               var t2= $(group).append(iptK).append(t1)
               $("#addUrl").append(t2);
               btnDel.bind("click",function () {
                   $(this).parents('.input-group').remove()
               })
           });
           //表单提交
           $("#test01").click(function(ev){
               alert("addd")
               var pic = $('#fileUpload')[0].files[0];
               var fd = new FormData(),iscyss,arrUrl=[];
               var arr=[],obj=document.getElementsByName('nj');
               for(k in obj){
                   if(obj[k].checked)
                       arr.push(obj[k].value);
               }
               if($("#iscys:checked")){
                   iscyss=1
               }else{
                   iscyss=0
               }
               console.log($("input[name='resourceUrl']").length)
               for (var i=0;i<$("input[name='resourceUrl']").length;i++){
                   arrUrl.push($("input[name='resourceUrl']").eq(i).val())
               }
               fd.append('file', pic);
               fd.append('vtype',$("#vtype option:selected").val());
               fd.append('title',$("input[name='title']").val());
               fd.append('author',$("input[name='author']").val());
               fd.append('desp',$("#desp").val());
               //资源地址
               fd.append('resourceUrl',arrUrl.join(","));
               fd.append('nj',arr.join(","));
               fd.append('iscy',iscyss);
               fd.append('id','');
               $.ajax({
                   type:"POST",
                   url:'back/videoShop/addOrUpdate',
                   data:fd,
                   dataType: 'JSON',
                   cache: false,
                   processData: false,
                   contentType: false,
                   success:function (res) {
                       console.log(res)
                       if(res.code==0){
                           layer.msg("上传成功",{time:1000},function(){
                               window.location.reload()
                           })
                       }else{
                           layer.msg("参数错误,请重新提交",{time:1000},function(){
                               $("#uplaod").modal('hide')
                               window.location.reload()
                           });

                       }
                   }
               })
           })

        });
    })
    $("#uplaod").on("hide.bs.modal",function(){
        window.location.reload()
    })
}
productsearch(curnum, limitcount);


