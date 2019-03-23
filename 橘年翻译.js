if($app.info.version.substring(2, 4)>=29){ if ($app.env === $env.keyboard) { $keyboard.barHidden=true}}

if ($app.env == $env.safari) {

  $safari.inject("document.body.contentEditable = 'true'; document.designMode='on';")

  $app.close()

}

function viewsAddShadows(view) { //在layout中使用即可 给Views添加阴影
    var layer = view.runtimeValue().invoke("layer");
    layer.invoke("setShadowRadius", 5);
    layer.invoke("setCornerRadius", 5);
    layer.invoke("setShadowOpacity", 0.5);
    layer.invoke("setShadowOffset", $size(3, 3));
    layer.invoke("setShadowColor", $color("gray").runtimeValue().invoke("CGColor"));
}

if ($app.env == $env.keyboard) {

  var timer = $timer.schedule({
    interval: 0.1,
    handler: function() {
      if ($keyboard.selectedText != undefined) {
        $("topText").text = $keyboard.selectedText

      }
    }
  })
  var timer = $timer.schedule({
    interval: 0.8,
    handler: function() {

      if ($keyboard.selectedText != undefined) {
        colorchang()

      }
    }
  })
}
if ($cache.get("samp") === undefined) {
  $cache.set("sample", {
    "a": "caiyun",
    "b": "http://t.cn/RsVXQvH"
  })

  $http.get({
    url: "https://shimo.im/api/file/ID56FUHr4MAchwJh/content",
    handler: function(resp) {
      var final = "";
      var orig = resp.data;
      for (i = 0; i < orig.length; i++) {
        final += orig[i][1];
      }
      $ui.push({
        views: [{
          type: "markdown",
          props: {
            content: final
          },
          layout: $layout.fill
        }]
      })

    }
  })
  $cache.set("samp", "1")
}

console.info($cache.get("sample"))

var alert = true;
$ui.render({
  props: {
    id: "mainView",
    statusBarStyle: 0,
    navBarHidden: true,
    statusBarHidden:true,
    bgcolor: $color("clear")
  },
  views: [{
      type: "text",
      props: {
        id: "topText",
        editable: true,
        font: $font(12),
        text: $clipboard.text,
        bgcolor: $color("clear"),
        align: $align.center,
        insets: $insets(8, 33, 15, 33),
        textColor: $color("black"),
      },
      layout: (make, view) => {
        make.top.inset(0)
        make.left.right.inset(0);
        make.height.equalTo(view.super).dividedBy(2)
      },
      events: {
        didBeginEditing: function(sender) {
          colorchang()
        },
        didChange: function(sender) {
          colorchang()
        },

        didEndEditing: function(sender) {
          if ($app.env != $env.today && $app.env != $env.keyboard) {
            if ($system.brightness <= 0.40) {
              $("zhongText").bgcolor = $color("#1a222c")
            } else {
              $("zhongText").bgcolor = $color("#4472ca")
            }
          } else {
            $("zhongText").bgcolor = $rgba(50, 50, 50, .3)
          }
        }
      }

    },
    {
      type: "text",
      props: {
        id: "bottomText",
        font: $font(12),
        editable: false,
        bgcolor: $color("clear"),
        align: $align.center,
        insets: $insets(18, 33, 8, 33),
        textColor: $color("black"),
      },
      layout: (make, view) => {
        make.bottom.inset(0)
        make.left.right.inset(0);
        make.height.equalTo(view.super).dividedBy(2)
      }

    },
    {
      type: "text",
      props: {
        id: "zhongText",
        editable: false,
        bgcolor: $color("gray")
      },
      layout: (make, view) => {
        make.centerY.inset(0)
        make.height.equalTo(1)
        make.left.right.inset(0);
      }

    }, {
      type: "blur",
      props: {
        id: "meanblur",
        alpha: 0,
        style: 1, // 0 ~ 5
        userInteractionEnabled: 1
      },
      layout: $layout.fill
    }, {
      type: "button",
      props: {
        id: "apiyuan",
        src: $cache.get("sample").b,
        bgcolor: $color("clear"),
      },
      layout: (make, view) => {
        viewsAddShadows(view)
        make.size.equalTo($size(24, 24));

        make.top.equalTo($("zhongText").bottom).offset(15);
        make.left.inset(15)

      },
      events: {

        doubleTapped: function(sender) {
          let ax = whichLan()
          if (ax == "en") {
            speechText($("bottomText").text, "en-US")

          } else if (ax != "en") {
            speechText($("bottomText").text, "zh-CN")

          }

        },
        touchesMoved: function(sender, location) {

        },
        tapped: function(sender) {
          renderOutputFormatMenu(sender)
        }
      }
    },

    {
      type: "button",
      props: {
        circular: 1,
        id: "logo",
        bgcolor: $color("clear"),
        src: "http://t.cn/RDrzwJh"
      },
      layout: (make, view) => {
        make.size.equalTo($size(30, 30));
        make.center.equalTo(view.super);
      },
      events: {
        tapped: function(sender) {
          $device.taptic(1)
          qingqiu($cache.get("sample").a, 0)
        },
        touchesMoved: function(sender, location) {

          fuzhi(location)
        },
        longPressed: function(sender) {
          if ($app.env == $env.action || $app.env == $env.safari) {
            $device.taptic(1)
            $app.close()
          } else if ($app.env == $env.today) {
            $device.taptic(1)
            $photo.fetch({
              count: 1,
              format: "data",
              handler: function(images) {
                img = $text.base64Encode(images[0])
                ocr(img)

              }
            })
          } else if ($app.env == $env.app) {
            alert = false;
            $ui.alert({
              title: "辅助功能",
              actions: [{
                title: "打赏",
                handler: function() {

                  $app.openURL("https://qr.alipay.com/tsx053418hcy1xk9grxdm06")
                  alert = true;
                  $device.taptic(1)
                }
              }, {
                title: "OCR",
                handler: function() {

                  $photo.pick({

                    format: "data",
                    handler: function(resp) {
                      $device.taptic(1)
                      var image = resp.data

                      img = $text.base64Encode(image)
                      ocr(img)

                    }
                  })

                }
              }]
            })

          }
        },
        doubleTapped: function(sender) {
          if (sfgx == 1) {
            apitongbu(sender)
          }
        }

      }
    }
  ],
  events: {
    appeared: function() {
      
      hideBar("mainView");
    }
  }
})



function hideBar(views) {
  if ($app.env === $env.keyboard) {
  
    if (!$device.isIphoneX) {
      $(views).add({
        type: "button",
        props: {
          alpha: .7,
          id: "nextIpnut",
          bgcolor: $color("clear"),
          src: "http://t.cn/RkiP8na"
        },
        layout: (make) => {

          make.size.equalTo($size(30, 30));
          make.left.inset(10);
          make.bottom.inset(10);
        },
        events: {
          ready: sender => {
            if ($app.env == $env.keyboard) {
              var button = sender.runtimeValue();
              var target = $ui.vc.runtimeValue();
              var selector = "handleInputModeListFromView:withEvent:";
              var events = 0x00000FFF;
              button.$addTarget_action_forControlEvents(target, selector, events);
            }
          }
        }
      })
    }
  }
}

if ($app.env != $env.today && $app.env !=$env.keyboard) {
  $("topText").font = $font(15)
  $("bottomText").font = $font(15)
  if ($system.brightness <= 0.40) {

    $("topText").bgcolor = $color("#243040")
    $("bottomText").bgcolor = $color("#243040")
    $("zhongText").bgcolor = $color("#1a222c")
    $("topText").textColor = $color("white")
    $("bottomText").textColor = $color("white")

  } else if ($system.brightness >= 0.40) {

    $("topText").bgcolor = $color("#cfdee7")
    $("bottomText").bgcolor = $color("#cfdee7")
    $("zhongText").bgcolor = $color("#4472ca")
    $("topText").textColor = $color("black")
    $("bottomText").textColor = $color("black")

  }
}else if($app.env==$env.keyboard){
    $("topText").font = $font(15)
  $("bottomText").font = $font(15)
   $("bottomText").bgcolor = $color("#d1d5db")
    $("topText").bgcolor = $color("#d1d5db")  
}

var daxiao = ["24", "4"]

function speechText(love, lang) {
  $device.taptic(2)
  $text.speech({
    text: love,
    rate: 0.5,
    language: lang,

  })
}

function apianimation(s, a, d) {
  $("apiyuan").updateLayout(make => {
    make.size.equalTo($size(s, s));
  });
  $ui.animate({
    duration: 0.4,
    damping: 0.9,
    velocity: 0.6,
    animation: () => {
      if (d == 1) {
        $("logo").src = ""
      } else if (d == 0) {
        $("logo").src = "http://t.cn/RDrzwJh"
      }
      $("meanblur").alpha = a;
      $("apiyuan").relayout();
    }
  })
}

function ocr(base) {
  animation(64, 1, 1)
  $http.post({
    url: "https://ai.baidu.com/weapp/rest/2.0/ocr/v1/accurate",
    header: {
       "Content-Type": "application/x-www-form-urlencoded",
       "Cookie":"BAIDUID=97BC90EC2922CE4E89893D70398C6774:FG=1",
       "sessionKey":"efe9c802-eddd-48e9-afb0-3c59d92a8fdf=ee60b6ad-cbbe-4b1f-afcf-38c7a2378135"
       
    },
    body: {
   "caps_original":"true","detect_direction":"true","image":base
    },
    handler: function(resp) {
      console.info(resp.data)
      var data = resp.data.words_result
      let tr = ""
      data.forEach(e => {

        if ($app.env == $env.app) {
          $("topText").text = tr = tr.concat(e.words + "\n")
        } else if ($app.env == $env.today) {
          $("topText").text = tr = tr.concat(e.words)
        }

      });

      qingqiu($cache.get("sample").a, 0)

    }

  })
}

function whichLan() {
  let englishChar = $("topText").text.match(/[a-zA-Z]/g);
  let englishNumber = !englishChar ? 0 : englishChar.length;
  let chineseChar = $("topText").text.match(/[\u4e00-\u9fff\uf900-\ufaff]/g);
  let chineseNumber = !chineseChar ? 0 : chineseChar.length;

  return (chineseNumber * 2) >= englishNumber && chineseNumber ? "en" : englishNumber >= 8 ? "zh-CN" : "auto";

}

function caiyun() {
  let zx = whichLan()
  if (zx === "en") {
    caiyunurl = {
 "source": $("topText").text.replace(/\n/g,"\t"),
 "request_id": 1783325475,
 "trans_type": "zh2en",
 "media": "text"
}
  } else if (zx != "en") {
    caiyunurl = {
 "source": $("topText").text.replace(/\n/g,"\t"),
 "request_id": 1783325475,
 "trans_type": "en2zh",
 "media": "text"
}}
  return caiyunurl
}

function qingqiu(jiekou, huan) {
  if (sfgx == 1) {
    if (huan == 0) {
      animation(64, 1, 1)
    } else if (huan == 1) {
      apianimation(49, 1, 1)
    }
    var re = /^http[s]?\:\/\/[^\s]*$/i
    var n = re.test();

    if (re.test($("topText").text) === true) {
      if (/^http\:\/\/t.cn\/\w{6,7}$/i.test($("topText").text) === true) {
        var yuan = $("topText").text
        $http.lengthen({
          url: yuan,
          handler: function(url) {
            $("bottomText").text = yuan
            $("topText").text = url
            if (huan == 0) {
              animation(30, 0, 0)
            } else if (huan == 1) {
              apianimation(24, 0, 0)
            }

          }
        })

      } else if (/^http\:\/\/t.cn\/\w{7}$/i.test($("topText").text) === false) {
        var xzc = re.exec($("topText").text);

        $http.get({
          url: "http://api.weibo.com/2/short_url/shorten.json?source=2849184197&url_long=" + $text.URLEncode(xzc),
          handler: function(resp) {
            var data = resp.data
            $("bottomText").text = data.urls[0].url_short
            if (huan == 0) {
              animation(30, 0, 0)
            } else if (huan == 1) {
              apianimation(24, 0, 0)
            }

          }
        })

      }
    } else if (re.test($("topText").text) === false) {


      if (jiekou === 'baidu') {
        $http.post({
          url: "https://fanyi.baidu.com/basetrans",
          header: {
            "cookie": "Hm_lpvt_64ecd82404c51e03dc91cb9e8c025574=1533971954; Hm_lpvt_afd111fa62852d1f37001d1f980b6800=1533971953; Hm_lvt_64ecd82404c51e03dc91cb9e8c025574=1533971954; Hm_lvt_afd111fa62852d1f37001d1f980b6800=1533971953; locale=zh; SE_LAUNCH=5:25565980_0:25565980; BDORZ=AE84CDB3A529C0F8A2B9DCDD1D18B695; BIDUPSID=05BE4AB31EE3F53ABBB5ADAB70B0E392; BAIDUID=05BE4AB31EE3F53ABBB5ADAB70B0E392:FG=1",
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1"
          },
          form: {
            "from": "auto",
            "query": $("topText").text,
            "to": "en"
          },
          handler: function(resp) {
            var data = resp.data

            let tr = ""
            data.trans.forEach(e => {
              $("bottomText").text = tr = tr.concat(e.dst + "\n")
            });

            if (huan == 0) {
              animation(30, 0, 0)
            } else if (huan == 1) {
              apianimation(24, 0, 0)
            }

          }
        })
      } else if (jiekou === 'Google') {
        $http.post({
          url: "http://translate.google.cn/translate_a/single",
          header: {
            "User-Agent": "iOSTranslate",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: { "dt": "t", "q": $("topText").text, "tl": whichLan(), "ie": "UTF-8", "sl": "auto", "client": "ia", "dj": "1" },
          handler: function(resp) {
           
            var data = resp.data
            let tr = ""
            data.sentences.forEach(e => {
              $("bottomText").text = tr = tr.concat(e.trans + "\n")
            });

            if (huan == 0) {
              animation(30, 0, 0)
            } else if (huan == 1) {
              apianimation(24, 0, 0)
            }
          }
        })
      } else if (jiekou === 'caiyun') {
        $http.post({
          url: "https://api.interpreter.caiyunai.com/v1/translator",
          header: {"Accept": "*/*","Accept-Encoding": "br, gzip, deflate","Accept-Language": "zh-cn","Connection": "keep-alive","Content-Length": "85","Content-Type": "application/json","Host": "api.interpreter.caiyunai.com","User-Agent": "caiyunInterpreter/3 CFNetwork/902.2 Darwin/17.7.0","X-Authorization": "token ssdj273ksdiwi923bsd9",},
          body:caiyun(),
          handler: function(resp) {
            var data = resp.data
            $("bottomText").text = data.target
            if (huan == 0) {
              animation(30, 0, 0)
            } else if (huan == 1) {
              apianimation(24, 0, 0)
            }
          }
        })
      } else if (jiekou === 'youdao') {
        $http.get({
          url: "https://api.m.sm.cn/rest?callback=&method=tools.translation&q=" + encodeURI($("topText").text),
          header: { "Cookie": "isg=BNDQjJmzvyB2HWMLbSW6pbbXqxoimbTjHiiIHcqhhCv-BXuvdqlac8Tz2QtGzmy7; sm_sid=c491ba687e57ccb1f4b1455ae49dfcb0; sm_uuid=c0b9754f499f40bc920612e9c891682f%7C%7C%7C1532964646; cna=tAXjE7egWV4CAbfr/zTj5p61; sm_diu=bdc017edf5ee7df054b108351526cb35%7C%7C12ede2ed494e05a1fa%7C1532762035", "Host": "api.m.sm.cn", "Referer": "https://m.sm.cn/s?q=%E6%9C%89%E9%81%93%E8%AF%8D%E5%85%B8%E5%9C%A8%E7%BA%BF%E7%BF%BB%E8%AF%91&by=suggest&snum=6", "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15G77 CriOS/67.0 Mobile/15F79 Safari/604.1", },
          handler: function(resp) {
            var data = resp.data
            $("bottomText").text = data.data.translation[0]
            if (huan == 0) {
              animation(30, 0, 0)
            } else if (huan == 1) {
              apianimation(24, 0, 0)
            }
          }
        })
      }

    }
  } else if (sfgx == 0) {
    $ui.toast("授权验证中...")

  }
}

function fuzhi(l) {
  let flag = l.y >= 50 || l.y <= -50 ? true : false;
  let faks = l.y >= 50 ? $("bottomText").text : $("topText").text;
  switch (flag && alert) {
    case true:
      alert = false;
      $ui.alert({
        title: "翻译内容已复制",
        actions: [{
          title: "好的",
          handler: function() {
            $clipboard.text = faks
            alert = true;
            $device.taptic(1)
          }
        }]
      })

      break;
    case false:

      break;
  }
}

function animation(s, a, d) {
  $("logo").updateLayout(make => {
    make.size.equalTo($size(s, s));
  });
  $ui.animate({
    duration: 1,
    damping: 0.5,
    velocity: 1.0,
    animation: () => {
      if (d == 1) {
        $("apiyuan").src = ""
      } else if (d == 0) {
        $("apiyuan").src = $cache.get("sample").b
      }
      $("meanblur").alpha = a;
      $("logo").relayout();
    }
  })
}

var colors = ["#9E2DA4", "#FE2E01", "#FE8209", "#164781", "#FF9999", "#FF9900", "#FF9D1D", "#0069D2", "#00A81B", "#A80001", "#00888C", "#89A800", "#5700A8", "#004C00", "#38004C", "#5E468C", "#35A8AE", "#E76466"]

function colorchang() {
  const m = colors.length
  const n = Math.floor(Math.random() * (m + 1))
  $("zhongText").bgcolor = $color(colors[n])
}

var zhendema = [{
    "image": {
      "id": "1",
      "text": "baidu",
      "src": "http://t.cn/Rk73AMe"
    }
  },
  {
    "image": {
      "id": "2",
      "text": "youdao",
      "src": "http://t.cn/Rk7FRSi"
    }
  },
  {
    "image": {
      "id": "3",
      "text": "caiyun",
      "src": "http://t.cn/RsVXQvH"
    }
  },
  {
    "image": {
      "id": "4",
      "text": "Google",
      "src": "http://t.cn/Rk7umFv"
    }
  }
]
zhendema.splice(0, 0, zhendema[$cache.get("sample").c])
zhendema.splice(parseInt($cache.get("sample").c) + 1, 1)

function renderOutputFormatMenu(superView) {
  $("mainView").add({
    type: "view",
    props: {
      id: "outputFormatSelectorView",
      alpha: 0
    },
    layout: (make, view) => {
      make.height.width.equalTo(view.super)
      make.center.equalTo(view.super)
    },
    views: [{
      type: "blur",
      props: {
        style: 1,
        alpha: 0.1,
      },
      layout: $layout.fill,
      events: {
        tapped: sender => {
          hideView(sender);
        }
      }
    }, {
      type: "matrix",
      props: {
        id: "outputFormatSelectorItems",
        columns: daxiao[1],
        spacing: 10,
        itemHeight: daxiao[0],
        scrollEnabled: false,
        bgcolor: $color("clear"),
        frame: superView.frame,
        template: [{
          type: "image",
          props: {
            id: "image",
            radius: 0,
            bgcolor: $color("clear"),
            align: $align.center,

          },
          layout: $layout.fill
        }],
        data: zhendema
      },
      events: {
        didSelect: (sender, indexPath, data) => {
          zhendema.splice(0, 0, data)
          zhendema.splice(indexPath.item + 1, 1)
          var data = data.image.text

          if (data === 'baidu') {
            id = "0"
            type = 'baidu'
            yuan = "http://t.cn/Rk73AMe"
          } else if (data === 'Google') {
            id = "3"
            type = 'Google'
            yuan = "http://t.cn/Rk7umFv"
          } else if (data === 'youdao') {
            id = "1"
            type = 'youdao'
            yuan = "http://t.cn/Rk7FRSi"
          } else if (data === 'caiyun') {
            id = "2"
            type = 'caiyun'
            yuan = "http://t.cn/RsVXQvH"
          }
          $cache.set("sample", {
            "a": type,
            "b": yuan,
            "c": id
          })
          hideView(sender)
          $("apiyuan").src = $cache.get("sample").b
          qingqiu($cache.get("sample").a, 1)
        }
      }
    }]
  })

  $("outputFormatSelectorItems").remakeLayout(make => {
    make.top.equalTo($("zhongText").bottom).offset(5);
    make.left.inset(5)
    make.height.equalTo(50)
    make.width.equalTo(146)
  });

  $ui.animate({
    duration: 0.3,
    damping: 0.8,
    velocity: 0.3,
    animation: () => {
      $("outputFormatSelectorView").alpha = 1
      $("outputFormatSelectorItems").relayout();
    }
  })

  function hideView(sender) {
    $ui.animate({
      duration: 0.2,
      velocity: 0.5,
      animation: () => {
        $("outputFormatSelectorView").alpha = 0;
        $("outputFormatSelectorItems").frame = superView.frame;
      },
      completion: () => {
        sender.super.remove();
      }
    });
  }
}

let sfgx = 0

function apitongbu(superView) {
  if ($app.env == $env.today||$app.env == $env.keyboard) {
var mengbi=1
}else{
  var mengbi=0
}
  $("mainView").add({
    type: "view",
    props: {
      id: "apitong",
      alpha: 0,
      bgcolor:$("topText").bgcolor
    },
    layout: (make, view) => {
      make.height.width.equalTo(view.super)
      make.center.equalTo(view.super)
    },
    views: [ {
        type: "blur",
        props: {
          style: 1,
          alpha: mengbi,
        },
        layout: $layout.fill

      },{
        type: "label",
        props: {

          id: "q1",
          text: $("topText").text,
          bgcolor: $color("clear"),
          textColor:    $("topText").textColor,
          align: $align.center,
          lines: 0,
          font: $font(10)

        },
        layout: function(make, view) {
          make.top.left.right.inset(0)
          make.height.equalTo(view.super).dividedBy(5)
        }
      }, {
        type: "label",
        props: {
          bgcolor:$("zhongText").bgcolor ,
          align: $align.center
        },
        layout: function(make, view) {
          make.bottom.equalTo($("q1").bottom).offset(0)
          make.height.equalTo(1)
          make.left.right.inset(0)
        }
      }, {
        type: "button",
        props: {
          circular: 0,
          bgcolor: $color("clear"),
          src: "http://t.cn/Rk73AMe"
        },
        layout: (make, view) => {
          viewsAddShadows(view)
          make.size.equalTo($size(20, 20));
          make.left.inset(10);
          make.top.equalTo($("q1").bottom).offset(10)

        },
        events: {
          tapped: function(sender) {
            $device.taptic(1)
            $clipboard.text = $("q2").text
          },
          doubleTapped: function(sender) {

            let ax = whichLan()
            if (ax == "en") {
              speechText($("q2").text, "en-US")

            } else if (ax != "en") {
              speechText($("q2").text, "zh-CN")
            }
          }
        }
      },
      {
        type: "label",
        props: {
          id: "q2",
          bgcolor: $color("clear"),
          textColor:    $("topText").textColor,
          align: $align.center,
          lines: 0,
          font: $font(10)
        },
        layout: function(make, view) {
          make.top.equalTo($("q1").bottom).offset(0)
          make.left.right.inset(0)
          make.height.equalTo(view.super).dividedBy(5)
        }
      },
      {
        type: "label",
        props: {
          bgcolor:   $("zhongText").bgcolor ,
          align: $align.center
        },
        layout: function(make, view) {
          make.bottom.equalTo($("q2").bottom).offset(0)
          make.height.equalTo(1)
          make.left.right.inset(0)
        }
      },
      {
        type: "button",
        props: {
          circular: 0,
          bgcolor: $color("clear"),
          src: "http://t.cn/Rk7umFv"
        },
        layout: (make, view) => {
          viewsAddShadows(view)
          make.size.equalTo($size(20, 20));
          make.left.inset(10);
          make.top.equalTo($("q2").bottom).offset(10)

        },
        events: {
          tapped: function(sender) {
            $device.taptic(1)
            $clipboard.text = $("q3").text

          },
          doubleTapped: function(sender) {

            let ax = whichLan()
            if (ax == "en") {
              speechText($("q3").text, "en-US")

            } else if (ax != "en") {
              speechText($("q3").text, "zh-CN")
            }
          }
        }
      },
      {
        type: "label",
        props: {

          id: "q3",
          bgcolor: $color("clear"),
          textColor:    $("topText").textColor,
          align: $align.center,
          lines: 0,
          font: $font(10)
        },
        layout: function(make, view) {
          make.top.equalTo($("q2").bottom).offset(0)
          make.left.right.inset(0)
          make.height.equalTo(view.super).dividedBy(5)
        }
      },
      {
        type: "label",
        props: {
          bgcolor:   $("zhongText").bgcolor ,
          align: $align.center
        },
        layout: function(make, view) {
          make.bottom.equalTo($("q3").bottom).offset(0)
          make.height.equalTo(1)
          make.left.right.inset(0)
        }
      },
      {
        type: "button",
        props: {
          circular: 0,
          bgcolor: $color("clear"),
          src: "http://t.cn/RsVXQvH"
        },
        layout: (make, view) => {
          viewsAddShadows(view)
          make.size.equalTo($size(20, 20));
          make.left.inset(10);
          make.top.equalTo($("q3").bottom).offset(10)

        },
        events: {
          tapped: function(sender) {
            $device.taptic(1)
            $clipboard.text = $("q4").text

          },
          doubleTapped: function(sender) {

            let ax = whichLan()
            if (ax == "en") {
              speechText($("q4").text, "en-US")

            } else if (ax != "en") {
              speechText($("q4").text, "zh-CN")
            }
          }
        }
      },
      {
        type: "label",
        props: {

          id: "q4",
          bgcolor: $color("clear"),
          textColor:    $("topText").textColor,
          align: $align.center,
          lines: 0,
          font: $font(10)
        },
        layout: function(make, view) {
          make.top.equalTo($("q3").bottom).offset(0)
          make.left.right.inset(0)
          make.height.equalTo(view.super).dividedBy(5)
        }
      },
      {
        type: "label",
        props: {
          bgcolor:   $("zhongText").bgcolor ,
          align: $align.center
        },
        layout: function(make, view) {
          make.bottom.equalTo($("q4").bottom).offset(0)
          make.height.equalTo(1)
          make.left.right.inset(0)
        }
      },
      {
        type: "button",
        props: {
          circular: 0,
          bgcolor: $color("clear"),
          src: "http://t.cn/Rk7FRSi"
        },
        layout: (make, view) => {
       viewsAddShadows(view)
          make.size.equalTo($size(20, 20));
          make.left.inset(10);
          make.top.equalTo($("q4").bottom).offset(10)

        },
        events: {
          tapped: function(sender) {
            $device.taptic(1)
            $clipboard.text = $("q5").text

          },
          doubleTapped: function(sender) {

            let ax = whichLan()
            if (ax == "en") {
              speechText($("q5").text, "en-US")

            } else if (ax != "en") {
              speechText($("q5").text, "zh-CN")
            }
          }
        }
      },
      {
        type: "label",
        props: {

          id: "q5",
          bgcolor: $color("clear"),
          textColor:    $("topText").textColor,
          align: $align.center,
          lines: 0,
          font: $font(10)
        },
        layout: function(make, view) {
          make.top.equalTo($("q4").bottom).offset(0)
          make.left.right.inset(0)
          make.height.equalTo(view.super).dividedBy(5)
        }
      },
      {
        type: "button",
        props: {
          circular: 0,
          id: "logos",
          bgcolor: $color("clear"),
          src: "http://t.cn/RDrzwJh"
        },
        layout: (make, view) => {
         viewsAddShadows(view)
          make.size.equalTo($size(30, 30));
          make.center.equalTo(view.super)

        },
        events: {
          tapped: function(sender) {
            $device.taptic(2)

            hideView(sender)

          }
        }
      }
    ]
  })

  var txt = $("topText").text.replace("\n", "\t");

  $("q1").text = txt

  $http.post({
    url: "https://fanyi.baidu.com/basetrans",
    header: {
      "cookie": "Hm_lpvt_64ecd82404c51e03dc91cb9e8c025574=1533971954; Hm_lpvt_afd111fa62852d1f37001d1f980b6800=1533971953; Hm_lvt_64ecd82404c51e03dc91cb9e8c025574=1533971954; Hm_lvt_afd111fa62852d1f37001d1f980b6800=1533971953; locale=zh; SE_LAUNCH=5:25565980_0:25565980; BDORZ=AE84CDB3A529C0F8A2B9DCDD1D18B695; BIDUPSID=05BE4AB31EE3F53ABBB5ADAB70B0E392; BAIDUID=05BE4AB31EE3F53ABBB5ADAB70B0E392:FG=1",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1"
    },
    form: {
      "from": "auto",
      "query": $("topText").text,
      "to": "en"
    },
    handler: function(resp) {
      var data = resp.data

      let tr = ""
      data.trans.forEach(e => {
        $("q2").text = tr = tr.concat(e.dst) + "\t"
      });

    }

  })

  $http.post({
    url: "http://translate.google.cn/translate_a/single",
    header: {
      "User-Agent": "iOSTranslate",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: { "dt": "t", "q": $("topText").text, "tl": whichLan(), "ie": "UTF-8", "sl": "auto", "client": "ia", "dj": "1" },
    handler: function(resp) {
      var data = resp.data
      let tr = ""
      data.sentences.forEach(e => {
        texta = tr = tr.concat(e.trans)
      });
      txt = texta.replace("\n", "\t");

      $("q3").text = txt

    }
  })

        $http.post({
          url: "https://api.interpreter.caiyunai.com/v1/translator",
          header: {"Accept": "*/*","Accept-Encoding": "br, gzip, deflate","Accept-Language": "zh-cn","Connection": "keep-alive","Content-Length": "85","Content-Type": "application/json","Host": "api.interpreter.caiyunai.com","User-Agent": "caiyunInterpreter/3 CFNetwork/902.2 Darwin/17.7.0","X-Authorization": "token ssdj273ksdiwi923bsd9",},
          body:caiyun(),
          handler: function(resp) {
            var data = resp.data

      var txt = data.target.replace("\n", "\t");

      $("q4").text = txt

    }
  })

  $http.get({
    url: "https://api.m.sm.cn/rest?callback=&method=tools.translation&q=" + encodeURI($("topText").text),
    header: { "Cookie": "isg=BNDQjJmzvyB2HWMLbSW6pbbXqxoimbTjHiiIHcqhhCv-BXuvdqlac8Tz2QtGzmy7; sm_sid=c491ba687e57ccb1f4b1455ae49dfcb0; sm_uuid=c0b9754f499f40bc920612e9c891682f%7C%7C%7C1532964646; cna=tAXjE7egWV4CAbfr/zTj5p61; sm_diu=bdc017edf5ee7df054b108351526cb35%7C%7C12ede2ed494e05a1fa%7C1532762035", "Host": "api.m.sm.cn", "Referer": "https://m.sm.cn/s?q=%E6%9C%89%E9%81%93%E8%AF%8D%E5%85%B8%E5%9C%A8%E7%BA%BF%E7%BF%BB%E8%AF%91&by=suggest&snum=6", "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15G77 CriOS/67.0 Mobile/15F79 Safari/604.1", },
    handler: function(resp) {
      var data = resp.data

      var txt = data.data.translation[0].replace("\n", "\t");
      $("q5").text = txt

    }
  })
  $("logos").remakeLayout(make => {
    make.top.left.inset(10);
    make.top.inset(10)

    make.size.equalTo($size(20, 20))
  });
  $ui.animate({
    duration: 0.4,
    damping: 0.9,
    velocity: 0.6,
    animation: () => {
      $("apitong").alpha = 1
      $("logos").src = "http://t.cn/RkzoptW"
      $("logos").relayout();

    }
  })

  function hideView(sender) {
    $ui.animate({
      duration: 0.2,
      velocity: 0.5,
      animation: () => {
        $("apitong").alpha = 0;
        $("logos").frame = superView.frame;
        completion: () => {
          sender.super.remove();
        }
      }
    });
  }
}

if ( $app.env == $env.today ||$app.env == $env.keyboard) {
  sfgx = 1
  if ($clipboard.text != undefined) {
    if ($clipboard.text != "") {
      qingqiu($cache.get("sample").a, 0)
    }
  }
} else {

  genxin()
}

function genxin() {
  $http.get({
    url: "https://shimo.im/docs/v2PMHqd0vyM8RcTv/",
    handler: function(resp) {
      var data = resp.data
      sfgx = 1
      var links = $text.URLDecode(data)
      if (data.search($text.base64Encode($addin.current.version)) == "-1") {
        var txt = /http\:\/\/t.cn\/\w{7}/i.exec(data)
        const scriptName = $addin.current.name
        var bbh = $text.base64Decode(/[A-Za-z\d+/]{11}=/.exec(links))
        $http.download({
          url: txt,
          handler: resp => {
            let box = resp.data
            $addin.save({
              name: scriptName,
              data: box,
              version: bbh,
              author: "橘年",
              icon: "icon_057.png",
              handler: (success) => {
                if (success) {
                  $device.taptic(2)
                  $delay(0.2, function() {
                    $device.taptic(2)
                  })
                  $ui.alert({
                    title: "静默更新已完成",
                    actions: [{
                      title: "OK",
                      handler: function() {
                        $app.openExtension($addin.current.name)
                      }
                    }]
                  })
                }
              }
            })
          }
        })

      }
      if ($clipboard.text != undefined) {
        if ($clipboard.text != "") {
          qingqiu($cache.get("sample").a, 0)
        }
      }
    }
  })
}

function setInputTool(actionId, inputView) {
  var variableView = $ui.create({
    type: "matrix",
    props: {
      frame: $rect(0, 0, 0, 335),
      itemHeight: 26,
      spacing: 5,
      scrollEnabled: false,
      template: {
        views: [
          {
            type: "label",
            props: {
              radius: 14,
              font: $font(14),
              titleColor: $color("#333333"),
              bgcolor: $color("#efefef"),
              borderWidth: 0.5,
              borderColor: $color("#dddddd"),
              align: $align.center
            },
            layout: $layout.fill
          }
        ]
      }
    },
    events: {
      didSelect: function(sender, indexPath, data) {
        inputView.runtimeValue().$insertText(data.label.text);
      },
      itemSize: function(sender, indexPath) {
        var data = sender.object(indexPath);
        var size = $text.sizeThatFits({
          text: data.label.text,
          width: 320,
          font: $font(14)
        });
        return $size(size.width + 20, 30);
      }
    }
  });
  var toolView = $ui.create({
    type: "view",
    props: {
      frame: $rect(0, 0, 0, 40),
      bgcolor: $color("#eeeeee"),
      borderWidth: 0.5,
      borderColor: $color("#cccccc")
    },
    views: [
      {
        type: "button",
        props: {
          id: "varibaleButton",
          title: "分词",
          radius: 6,
          font: $font(14),
          titleColor: $color("#333333"),
          bgcolor: $color("#ffffff"),
          borderWidth: 0.5,
          borderColor: $color("#cccccc")
        },
        layout: function(make, view) {
          make.left.inset(10);
          make.size.equalTo($size(80, 30));
          make.centerY.equalTo(view.super);
        },
        events: {
          tapped: function(sender) {
            if (inputView.runtimeValue().$inputView()) {
              inputView.runtimeValue().$setInputView(null);
              toolView.get("varibaleButton").bgcolor = $color("#ffffff");
            } else {
              
              $text.tokenize({
                text: $("topText").text,
                handler: function(results) {
                  
              $("topText").text=""
         var data = results;
              
              variableView.data = data.map(item => {
                return {
                  label: {
                    text: item
                  }
                };
              });
              inputView.runtimeValue().$setInputView(variableView);
              toolView.get("varibaleButton").bgcolor = $color("#cccccc");
               }
                                                  })
            }
            inputView.runtimeValue().$reloadInputViews();
                            
          }

        }
      },
      {
        type: "button",
        props: {
          title: "Done",
          font: $font("bold", 14),
          titleColor: $color("#333333"),
          bgcolor: $color("clear")
        },
        layout: function(make, view) {
          make.top.right.bottom.inset(0);
          make.width.equalTo(80);
        },
        events: {
          tapped: function(sender) {
            inputView.blur();
            inputView.runtimeValue().$setInputView(null);
          }
        }
      }
    ]
  });
    inputView.runtimeValue().$setInputAccessoryView(toolView);
    inputView.runtimeValue().$reloadInputViews();
    }
    


setInputTool("",$("topText"))


