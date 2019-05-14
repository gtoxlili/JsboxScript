var hgybd = "";//这里填code后面的东西

//---------------------------

var resp = await $http.get(
  "https://wx.online-cmcc.cn/wmhnewcenter/alipay-applet/login?code=" + hgybd
);

try{

var datasjcn = JSON.parse(resp.data.bean);

$cache.set("cookie", datasjcn)

}
catch(err){
  var datasjcn=$cache.get("cookie")
    //在此处理错误
}





var syth = 0;
var syll = 0;
var sydx = 0;

$ui.render({
  props: {
    id: "label",
    title: "移动",
    navBarHidden: true
  },
  views: [
    {
      type: "label",
      props: {
        bgcolor: $color("clear"),
        id: "flags"
      },
      layout: function(make, view) {
        make.centerY.inset(0);
        make.height.equalTo(2);
        make.left.right.inset(0);
      }
    },
    {
      type: "label",
      props: {
        id: "tq2",
        text: "通話時長",
        font: $font("HiraMinProN-W3", 20),
        align: $align.center
      },
      layout: function(make, view) {
        make.bottom.equalTo($("flags").bottom).offset(-18);
        make.centerX.inset(0);
      }
    },
    {
      type: "label",
      props: {
        id: "tq1",
        text: "話費剩餘",
        font: $font("HiraMinProN-W3", 20),
        align: $align.center
      },
      layout: function(make, view) {
        make.bottom.equalTo($("flags").bottom).offset(-18);
        make.right.equalTo($("tq2").left).offset(-34);
      }
    },
    {
      type: "label",
      props: {
        id: "tq3",
        text: "流量剩餘",
        font: $font("HiraMinProN-W3", 20),
        align: $align.center
      },
      layout: function(make, view) {
        make.bottom.equalTo($("flags").bottom).offset(-18);
        make.left.equalTo($("tq2").right).offset(34);
      }
    },
    {
      type: "label",
      props: {
        id: "tq4",
        text: $cache.get("huaf") ? $cache.get("huaf") : "",
        font: $font("AppleSDGothicNeo-UltraLight", 18),
        align: $align.center
      },
      layout: function(make, view) {
        make.top.equalTo($("flags").bottom).offset(10);
        make.left.equalTo($("tq1").left).offset(20);
      }
    },
    {
      type: "label",
      props: {
        id: "tq5",
        text: $cache.get("thsc") ? $cache.get("thsc") : "",
        font: $font("AppleSDGothicNeo-UltraLight", 18),
        align: $align.center
      },
      layout: function(make, view) {
        make.top.equalTo($("flags").bottom).offset(10);
        make.centerX.equalTo(-12);
      }
    },
    {
      type: "label",
      props: {
        id: "tq6",
        text: $cache.get("syllg") ? $cache.get("syllg") : "",
        font: $font("AppleSDGothicNeo-UltraLight", 18),
        align: $align.center
      },
      layout: function(make, view) {
        make.top.equalTo($("flags").bottom).offset(10);
        make.right.equalTo($("tq3").right).offset(-5);
      }
    },{
      type: "label",
      props: {
        bgcolor: $rgba(100, 100, 100, 0.4)
      },
      layout: function(make, view) {
        make.left.equalTo($("tq2").right).offset(15);
        make.centerY.inset(0);
        make.width.equalTo(1);
        make.top.equalTo($("tq2").bottom).offset(0);
        make.bottom.equalTo($("tq4").top).offset(0);
      }
    },
    {
      type: "label",
      props: {
        bgcolor: $rgba(100, 100, 100, 0.4)
      },
      layout: function(make, view) {
        make.right.equalTo($("tq2").left).offset(-15);
        make.centerY.inset(0);
        make.width.equalTo(1);
        make.top.equalTo($("tq2").bottom).offset(0);
        make.bottom.equalTo($("tq4").top).offset(0);
      }
    },
    {
      type: "label",
      props: {
        text: "M",
        font: $font("AppleSDGothicNeo-UltraLight", 13),
        align: $align.center
      },
      layout: function(make, view) {
        make.left.equalTo($("tq6").right).offset(2);
        make.top.equalTo($("flags").bottom).offset(16);
      }
    },
    {
      type: "label",
      props: {
        text: "元",
        font: $font("HiraMinProN-W3", 11),
        align: $align.center
      },
      layout: function(make, view) {
        make.left.equalTo($("tq4").right).offset(2);
        make.top.equalTo($("flags").bottom).offset(16);
      }
    },
    {
      type: "label",
      props: {
        text: "分鐘",
        font: $font("HiraMinProN-W3", 11),
        align: $align.center
      },
      layout: function(make, view) {
        make.left.equalTo($("tq5").right).offset(2);
        make.top.equalTo($("flags").bottom).offset(16);
      }
    },
    {
      type: "label",
      props: {
        id: "tq7",
        text: "",
        textColor: $color("red"),
        font: $font("AppleSDGothicNeo-UltraLight", 13),
        align: $align.center
      },
      layout: function(make, view) {
        make.bottom.equalTo($("flags").bottom).offset(13);
        make.left.inset(60);
      }
    },
    {
      type: "label",
      props: {
        id: "tq8",
        text: "",
        textColor: $color("red"),
        font: $font("AppleSDGothicNeo-UltraLight", 13),
        align: $align.center
      },
      layout: function(make, view) {
        make.bottom.equalTo($("flags").bottom).offset(13);
        make.centerX.equalTo(-2);
      }
    },
    {
      type: "label",
      props: {
        id: "tq9",
        text: "",
        textColor: $color("red"),
        font: $font("AppleSDGothicNeo-UltraLight", 13),
        align: $align.center
      },
      layout: function(make, view) {
        make.bottom.equalTo($("flags").bottom).offset(13);
        make.right.inset(60);
      }
    },{
      type: "label",
      props: {
        bgcolor: $color("clear"),
      },
      layout: function(make, view) {
        make.left.equalTo($("tq2").right).offset(15);
        make.centerY.inset(0);
        make.right.inset(0);
        make.top.equalTo($("tq2").top).offset(0);
        make.bottom.equalTo($("tq4").bottom).offset(0);
      },
      events: {
              tapped: function(sender) {
$device.taptic(0)
if($("tq3").text=="流量剩餘"){
  $("tq3").text="定向流量"
  $("tq6").text = $cache.get("sydxg")
}else{
  $("tq3").text="流量剩餘"
   $("tq6").text=$cache.get("syllg")
}



              }}
    }
  ]
});

$http.get({
  url:
    "https://wx.online-cmcc.cn/wmhnewcenter/alipay-applet/direct/business/fareBalance",
  header: {
    "X-ALIPAY-APPLET-JWT": datasjcn.sessionId
  },
  handler: function(resp) {
    var data = resp.data;
    console.info(data)
    $("tq4").text = data.data.realFeeQryRsp.curFee;
    if ($cache.get("huaf") && $("tq4").text != $cache.get("huaf")) {
      $("tq7").text = "-" + $cache.get("huaf") - $("tq4").text;
    }
    $cache.set("huaf", data.data.realFeeQryRsp.curFee);
  }
});

$http.get({
  url:
    "https://wx.online-cmcc.cn/wmhnewcenter/alipay-applet/direct/business/planRemainClassification",
  header: { "X-ALIPAY-APPLET-JWT": datasjcn.sessionId },
  handler: function(resp) {
    var liuliang = resp.data.data.planRemain;
   console.info(liuliang)
    for (var i = 0; i < liuliang.length; i++) {
      var jsbc = liuliang[i].resourcesInfo;

      for (var b = 0; b < jsbc.length; b++) {
        var jsbcss = jsbc[b].resourcesCode;
        if (jsbcss == "01") {
          syth +=
            jsbc[b].secResourcesInfo[0].resourcesLeftInfo[0].remainRes / 1;
        } else if (jsbcss == "04") {
          var losj=jsbc[b].secResourcesInfo
          for (var c = 0; c < losj.length; c++)
          
          if(losj[c].cardName!="定向"){
          syll +=
            losj[c].resourcesLeftInfo[0].remainRes / 1024;
            
            
            }else{
                        sydx +=
            losj[c].resourcesLeftInfo[0].remainRes / 1024;
            }
        }
      }
    }

    $("tq5").text = syth.toFixed(1);
    $("tq6").text = syll.toFixed(2);
    console.info(syll.toFixed(2))

    if ($cache.get("thsc") && $("tq5").text != $cache.get("thsc")) {
      $("tq8").text = "-" + ($cache.get("thsc") - $("tq5").text).toFixed(1);
    }

    if ($cache.get("syllg") && $("tq6").text != $cache.get("syllg")) {
      $("tq9").text = "-" + ($cache.get("syllg") - $("tq6").text).toFixed(2);
    }
    $cache.set("sydxg", sydx.toFixed(2));
    $cache.set("thsc", syth.toFixed(1));
    $cache.set("syllg", syll.toFixed(2));
  }
});
