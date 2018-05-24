$(document).ready(function () {
    $(".i-checks").iCheck({
        checkboxClass:'icheckbox_square-blue',
        radioClass: "iradio_square-blue",
    })
})
var limitcount = 10;
var curnum = 1;
//列表查询方法
function productsearch(start,limitsize,title,subtitle,statue,time1,time2) {
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
            , url: 'back/notice/getNoticeList'
            ,where:{
                title:title,
                subTitle:subtitle,
                status:statue,
                startTime:time1,
                endTime:time2,
                pubType:2,
                pageNo:start,
                pageSize: limitsize
            }
            ,cols: [[
                {field:'id',type:'checkbox'},
                {field: 'title', title: '标题', minWidth: '100', sort: true}
                ,{field: 'subTitle', title: '标题', minWidth: '100', sort: true}
                , {field: 'content', title: '内容', minWidth: '120'}
                , {field: 'noticeStatus', title: '状态', minWidth: '80', sort: true,templet:function (d) {
                        if(d.noticeStatus=="1"){
                            return '<span class="text-success">已发布</span>'
                        }else if(d.noticeStatus=="2"){
                            return '<span class="text-warning">未发布</span>'
                        }else{
                            return '<span class="text-danger">到期</span>'
                        }

                    }}
                , {field: 'createTime', title: '创建时间', minWidth: '160'}
                , {field: 'publishTime', title: '发布时间', minWidth: '80'}
                , {field: 'lastDay', title: '发布天数', minWidth: '80', sort: true}
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
                                ,subtitle=$("input[name='ssubtitle']").val()
                                ,statue=$("#sstate option:selected").val()
                                ,time1=$("#dateStart").val()
                                ,time2=$("#dateEnd").val();
                            console.log(time1,time2)
                            productsearch(curnum,limitcount,title,subtitle,statue,time1,time2);
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
                        ,subtitle=$("input[name='ssubtitle']").val()
                        ,statue=$("#sstate option:selected").val()
                        ,time1=$("#dateStart").val()
                        ,time2=$("#dateEnd").val();
                    console.log(time1,time2)
                    productsearch(curnum,limitcount,title,subtitle,statue,time1,time2);
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
                $("#message").on('show.bs.modal',function () {
                    $("input[name='title']").val(layData.title)
                    $("input[name='subTitle']").val(layData.subTitle)
                    $("#content").val(layData.content)
                    $("input[name='pubType']").val(layData.pubType)
                    $("#imgView").attr("src",layData.picPath)
                    //发布时间初始化
                    laydate.render({
                        elem:"#date2",
                        value:''+layData.publishTime
                    })

                    $("input[name='lastDay']").val(layData.lastDay)
                    //编辑提交修改
                    $("#test01").click(function () {
                        var arr1=[],obj=document.getElementsByName('nj');
                        for(k in obj){
                            if(obj[k].checked)
                                arr1.push(obj[k].value);
                        }
                        var pic = $('#fileUpload')[0].files[0];
                        var fd = new FormData();
                        fd.append('fontCover', pic);
                        fd.append('title',$("input[name='title']").val());
                        fd.append('subTitle',$("input[name='subTitle']").val());
                        fd.append('content',$("#content").val());
                        fd.append('pubType',$("input[name='pubType']").val());
                       // fd.append('nj',arr1);
                        fd.append('lastDay',$("input[name='lastDay']").val());
                        fd.append('publishTime',$("input[name='publishTime']").val());
                        fd.append('id',layData.id);
                        $.ajax({
                            type:"POST",
                            url:'back/notice/addOrUpdateNotice',
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
                })
            }else if(obj.event=='delete'){
                layer.confirm("确定要删除吗?",function(index){
                    //数据操作
                    $.get("back/notice/delNotice",{noticeId:layData.id},function (res) {
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
                        $.get("back/notice/delNotices",{noticeIds:arr.join(",")},function (res) {
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
        $("#message").on("show.bs.modal",function () {
            //date2日期范围
            var NowDate =new Date(),
                year =NowDate.getFullYear(),
                month= NowDate.getMonth() + 1 < 10 ? "0" + (NowDate.getMonth() + 1): NowDate.getMonth() + 1,
                day=NowDate.getDate();
            laydate.render({
                elem: '#date2',
                format:'yyyy-MM-dd',
                value:year+"-"+month+"-"+day,
                min:""+new Date()
            });
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
            //表单提交
            $("#test01").on("click",function(ev){
                var pic = $('#fileUpload')[0].files[0];
                var fd = new FormData();
                fd.append('fontCover', pic);
                fd.append('title',$("input[name='title']").val());
                fd.append('subTitle',$("input[name='subTitle']").val());
                fd.append('content',$("#content").val());
                fd.append('pubType',$("input[name='pubType']").val());
                fd.append('lastDay',$("input[name='lastDay']").val());
                fd.append('publishTime',$("input[name='publishTime']").val());
                fd.append('id','');
                $.ajax({
                    type:"POST",
                    url:'back/notice/addOrUpdateNotice',
                    data:fd,
                    dataType: 'JSON',
                    cache: false,
                    processData: false,
                    contentType: false,
                    success:function (res) {
                        if(res.code==0){
                            layer.msg("上传成功",{time:1000},function(){
                                window.location.reload()
                            })
                        }else{
                            layer.msg("参数错误,请重新提交",{time:1000},function(){
                                $("#message").modal('hide')
                                window.location.reload()
                            });

                        }
                    }
                })
            })
            $("#message").on("hide.bs.modal",function () {
                window.location.reload()
            })
            //小学初中全选
            $(".studySection").find('.i-checks').on('ifChecked',function(){
                $(this).parents('.studySection').next().find('.i-checks').iCheck('check')
            })
            $(".studySection").find('.i-checks').on('ifUnchecked',function(){
                $(this).parents('.studySection').next().find('.i-checks').iCheck('uncheck')
            })


        });
    })
}
productsearch(curnum, limitcount);


