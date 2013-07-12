/**
 * User: jeff.zhang
 * Date: 13-6-13
 * Time: 上午8:48
 */

var w_expend= { //功勋对应猫粮消耗
        '0':100,
        '1':100,
        '2':100,
        '3':140,
        '4':140,
        '5':140,
        '6':190,
        '7':190,
        '8':190,
        '9':190,
        '10':250,
        '11':250,
        '12':250,
        '13':320,
        '14':320,
        '15':320,
        '16':400,
        '17':400,
        '18':400,
        '19':470,
        '20':470,
        '21':470,
        '22':530,
        '23':580,
        '24':580,
        '25':620,
        '26':620
};

$('.J_army').each(function(){       //当前武将猫粮消耗及255功勋武将标红
    //console.log(111);
    var str='';
    var _arr=$(this).text().split(',');
    var feats=0;                          //当前武将消耗
    var expend=0;                         //当前武将们消耗
    _arr.forEach(function(value,index){
        feats=parseFloat(value);
        //为220-225以及255功勋的武将做特殊判断
        if( feats>220&&feats<=225){
            feats=530
        } else{
            if(feats==255){
                feats=620
            }else{
                feats = w_expend[Math.ceil((feats/10))];  //根据w_expend对象计算武将出征消耗
            }
        }
        expend +=feats;  //各武将值消耗值相加
    })

    expend=expend/5; //出征消耗
      _arr.forEach(function(value,index){          //255功勋武将标红
           if(value==='255'){
            str+='<span style="color: #F00">'+value+'</span>';
        }else{
            str+=value;
        }
        str+=',';
    });
    str=str.substr(0, str.length-1);
    str=str+'&nbsp;&nbsp;&nbsp;('+expend+")";
    $(this).html(str);
});

$('.J_build').each(function(){  //设置各个建筑颜色
    var str='';
    var _arr=$(this).text().split(',');
    _arr.forEach(function(value,index){
        var buildType=value.substr(0,value.length-5);
        var buildLV=value.substr(value.length-5,value.length);
        switch (buildType){
            case '水田':
                str+='<b style="color: green">'+buildType+buildLV+'</b>';
                break;
            case '兵粮库':
                str+='<b style="color: #DDAA00">'+buildType+buildLV+'</b>';
                break;
            case '宝物库':
                str+='<b style="color: dodgerblue">'+buildType+buildLV+'</b>';
                break;
            case '公馆':
                str+='<b style="color: #CC0000">'+buildType+buildLV+'</b>';
                break;
            default:
                str+=buildType+buildLV;
                break;
        }
        str+=',';
    });
    str=str.substr(0, str.length-1);
    $(this).html(str);
});

$('.J_resources').each(function(){  //设置各个资源颜色
    var str='';
    var _arr=$(this).text().split(',');
    str+='<b style="color: #CC0000">'+_arr[0]+'</b>,';
    str+='<b style="color: green">'+_arr[1]+'</b>,';
    str+='<b style="color: #DDAA00">'+_arr[2]+'</b>,';
    str+='<b style="color: dodgerblue">'+_arr[3]+'</b>,';
    str+='<b style="color: #696969">'+_arr[3]+'</b>,';
    str=str.substr(0, str.length-1);
    $(this).html(str);
});

(function($){  //计算所有账号总喵喵点
    $(function(){
        var totalMoney=(function(){
            var money=0;
            $('#accountListTb').find('tbody').find('tr').each(function(){
                money+=parseInt($(this).find('td[data-field="money"]').text(),10);
            });
            return money;
        })();

        $('.J-money').each(function(){
            $(this).text(totalMoney);
        });

        $('#accountListTb').find('td[data-field="name"]').each(function(){
        });

        $('#accountListTb').on('click','td[data-field="name"]',function(e){//点击账号 td 改变颜色， 如果原来type是0则变1后改为红色，反之改为黑色，type值改为0
               var reqData={
              id: $(this).parent().data('id'),
              type:  +!parseInt($(this).data('type'),10)  //type值取反并且转成数值
            };
            $(this).data('type',reqData.type);//改变当前td上的type属性
            var $td=$(this);//$td指向当前点击td
            $.post('/update',reqData,function(msg){
                $td.removeClass().addClass('account_type_'+reqData.type);
            });
          });
    });
})(jQuery);