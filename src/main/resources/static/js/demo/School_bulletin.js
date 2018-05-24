$(document).ready(function () {
    $(".i-checks").iCheck({
        checkboxClass:'icheckbox_square-blue',
        radioClass: "iradio_square-blue",
    })
})
var limitcount = 10;
var curnum = 1;
//列表查询方法
function productsearch(start,limitsize,content,noticeType,resultStart,resultEnd,time1,time2) {
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
            , url: 'back/insNotice/getInsNoticeList'
            ,where:{
                content:content,
                noticeType:noticeType,//类型
                resultStart:resultStart,
                resultEnd:resultEnd,
                startTime:time1,
                endTime:time2,
                pageNo:start,
                pageSize: limitsize
            }
            ,cols: [[
                {field:'id',type:'checkbox'},
                {field: 'noticeType', title: '类型', minWidth: '100', sort: true,templet:function (d) {
                    if(d.noticeType=="1"){
                        return '<span class="text">卫生</span>'
                    }else if(d.noticeType=="2"){
                        return '<span class="text">纪律</span>'
                    }else{
                        return '<span class="text">其他</span>'
                    }

                }}
                ,{field: 'content', title: '内容', minWidth: '100', sort: true}
                , {field: 'result', title: '分数', minWidth: '120'}
                , {field: 'nj', title: '班级', minWidth: '160'}
                , {field: 'createTime', title: '创建时间', minWidth: '80'}
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
                            var content=$("#content1").val()
                                ,noticeType=$("#noticeType1 option:selected").val()
                                ,resultStart=$("input[name='resultStart']").val()
                                ,resultEnd=$("input[name='resultEnd']").val()
                                ,time1=$("#dateStart").val()
                                ,time2=$("#dateEnd").val();
                            productsearch(curnum,limitcount,content,noticeType,resultStart,resultEnd,time1,time2);
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
                    var content=$("#content1").val()
                        ,noticeType=$("#noticeType1 option:selected").val()
                        ,resultStart=$("#resultStart").val()
                        ,resultEnd=$("#resultEnd").val()
                        ,time1=$("#dateStart").val()
                        ,time2=$("#dateEnd").val();
                    productsearch(curnum,limitcount,content,noticeType,resultStart,resultEnd,time1,time2);
                })
                $("#reset").click(function () {
                    window.location.reload()
                })
            }
        })
        //表格操作事件监听
        table.on('tool(test)',function(obj){
            var layData=obj.data;
            console.log(layData)
            if(obj.event=='edit'){
                //编辑操作
                $("#message").on('show.bs.modal',function () {
                    $("#noticeType option[value='" + layData.noticeType + "']").attr("selected", "selected");
                    //年级班级数据联动
                    $.get("back/XxNjbJ/getNjByXx", function (res) {
                        var data=res.data
                        $("#sel1").html("")
                        for (var i = 0; i < data.length; i++) {
                            $("#sel1").append('<option value="' + data[i].xxNjxxId + '">' + data[i].njmc + '</option>')
                        }
                        $("#sel1 option[value='"+layData.nj+"']").attr("selected","selected")
                    });
                    $.get("back/XxNjbJ/getBjByNj", {nj: layData.nj}, function (res) {
                        var data = res.data;
                        if (data.length == "0") {
                            layer.alert("数据为空")
                            $("#sel2").html("")
                        } else {
                            $("#sel2").html("")
                            for (var i = 0; i < data.length; i++) {
                                $("#sel2").append('<option value="' + data[i].xxBjxxId + '">' + data[i].bjmc + '</option>')
                            }
                            $("#sel2 option[value='"+layData.bj+"']").attr("selected","selected")
                        }
                    })
                    $("#sel1").change(function () {
                        $.get("back/XxNjbJ/getBjByNj", {nj: $("#sel1 option:selected").val()}, function (res) {
                            var data = res.data;
                            if (data.length == "0") {
                                layer.alert("数据为空")
                                $("#sel2").html("")
                            } else {
                                $("#sel2").html("")
                                for (var i = 0; i < data.length; i++) {
                                    $("#sel2").append('<option value="' + data[i].xxBjxxId + '">' + data[i].bjmc + '</option>')
                                }
                            }
                        })
                    })

                        $("#content").val(layData.content);
                        $("#num").val(layData.result)
                        var arr = layData.nj.split(",");
                        for (var i = 0; i < $("input[name='nj']").length; i++) {
                            $("input[name='nj']").eq(i).iCheck('uncheck')
                            for (var j = 0; j < arr.length; j++) {
                                if ($("input[name='nj']").eq(i).val() == arr[j]) {
                                    $("input[name='nj']").eq(i).iCheck('check')
                                }
                            }
                        }
                        //发布时间初始化
                        laydate.render({
                            elem: "#date2",
                            value: '' + layData.publishTime
                        })

                        $("input[name='lastDay']").val(layData.lastDay)
                        //编辑提交修改
                        $("#test01").click(function () {
                            $.ajax({
                                type: "POST",
                                url: 'back/insNotice/saveOrUpNotice',
                                data:{
                                    noticeType: $("#noticeType option:selected").val(),
                                    content:$("#content").val(),
                                    result:$("input[name='result']").val(),
                                    nj:$("#sel1 option:selected").val(),
                                    bj:$("#sel2 option:selected").val(),
                                    id:layData.id
                                },
                                dataType: 'JSON',
                                success: function (res) {

                                    if (res.code == 0) {
                                        layer.msg("上传成功", {time: 1000}, function () {
                                            window.location.reload()
                                        })
                                    }else{
                                        layer.msg("参数错误,请重新提交",{time:1000},function(){
                                            console.log(res)
                                            $("#message").modal('hide')
                                           // window.location.reload()
                                        });

                                    }
                                }
                            })
                        })
                    })

            } else if(obj.event=='delete'){
                layer.confirm("确定要删除吗?",function(index){
                    //数据操作
                    $.get("back/insNotice/falseDelById",{id:layData.id},function (res) {
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
                        $.get("back/insNotice/falseDelByIds",{ids:arr.join(",")},function (res) {
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
        $("#message").on("hide.bs.modal",function () {
            window.location.reload()
        })
        $("#add").click(function(){
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
            //年级班级数据联动
            $.get("back/XxNjbJ/getNjByXx",function(res){
                var data=res.data;
                $("#sel1").html("")
                for(var i=0;i<data.length;i++){
                    $("#sel1").append('<option value="'+data[i].xxNjxxId+'">'+data[i].njmc+'</option>')
                }
            });
            $("#sel1").change(function () {
                $.get("back/XxNjbJ/getBjByNj",{nj:$("#sel1 option:selected").val()},function (res) {
                    var data=res.data;
                    if(data.length=="0") {
                        layer.alert("数据为空")
                        $("#sel2").html("")
                    }else{
                        $("#sel2").html("")
                        for (var i=0;i<data.length;i++){
                            $("#sel2").append('<option value="'+data[i].xxBjxxId+'">'+data[i].bjmc+'</option>')
                        }
                    }
                })
            })
            //表单提交
            $("#message").modal("show")
            $("#test01").click(function(ev){
                $.ajax({
                    type:"POST",
                    url:'back/insNotice/saveOrUpNotice',
                    data:{
                        noticeType: $("#noticeType option:selected").val(),
                        content:$("#content").val(),
                        result:$("input[name='result']").val(),
                        nj:$("#sel1 option:selected").val(),
                        bj:$("#sel2 option:selected").val()
                    },
                    dataType: 'JSON',
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
        });
    })
}
productsearch(curnum, limitcount);


