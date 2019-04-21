var icon = await $input.text();

if (icon) {
  let xml =
    "http://wjgou.swlte.com/index.php?g=wap&r=queryquan&key_name=" +
    $text.URLEncode(icon) +
    "&yhq=0";

  var resp = await $http.get({ url: xml });
  var xmlss = resp.data;

  function qupi(a) {
    a = a.replace(/<.+?>/g, "");
    a = a.replace(/\s/g, "");
    return a;
  }

  var spid = xmlss.match(/<a href="\/index.php\?r=view&g=wap&taobao_id=\d*/g);

  var yuanjia = xmlss.match(/<p class="cbp-vm-yuanjia">.*?<\/p>/g);
  var zhehou = xmlss.match(/<span class="price">.*?<\/span>/g);
  var biaoti = xmlss.match(
    /<img src=".*?" alt="">\s*<span class="span_">.*?<\/span>/g
  );

  var tupian = xmlss.match(/img.alicdn.com\/bao\/uploaded\/.*?jpg/g);

  var chuli = [];

  for (i in spid) {
    chuli.push(qupi(biaoti[i]));
  }

  $ui.render({
    views: [
      {
        type: "label",
        props: {
          bgcolor: $color("black")
        },
        layout: function(make, view) {
          make.right.left.inset(19);
          make.bottom.inset(89);
          make.top.inset(29);
        }
      },
      {
        type: "list",
        props: {
          data: chuli,
          id: "fff"
        },
        layout: function(make, view) {
          make.right.left.inset(20);
          make.bottom.inset(90);
          make.top.inset(30);
        },

        events: {
          didSelect: function(sender, indexPath, data) {
            $device.taptic(0);
            $ui.animate({
              duration: 0.4,
              velocity: 0.5,
              animation: () => {
                i = indexPath.row;

                $("texts").text =
                  "原价" +
                  qupi(yuanjia[i]) +
                  "\t\t折后" +
                  qupi(zhehou[i]) +
                  "\n\n\n" +
                  qupi(biaoti[i]);
                $("tupians").src = "http://" + tupian[i];
                $("linjuan").text = i;

                $("texts").alpha = 1;
                $("blurs").alpha = 1;
                $("tupians").alpha = 1;
                $("linjuan").alpha = 1;
              }
            });
          }
        }
      },
      {
        type: "blur",
        props: {
          id: "blurs",
          alpha: 0,
          style: 1 // 0 ~ 5
        },
        layout: function(make, view) {
          make.right.left.inset(20);
          make.bottom.inset(90);
          make.top.inset(30);
        },
        events: {
          tapped: function(sender) {
            $device.taptic(0);
            $ui.animate({
              duration: 0.4,
              velocity: 0.5,
              animation: () => {
                $("texts").alpha = 0;
                $("blurs").alpha = 0;
                $("tupians").alpha = 0;
                $("linjuan").alpha = 0;
              }
            });
          }
        }
      },
      {
        type: "image",
        props: {
          src: "",
          alpha: 0,
          id: "tupians"
        },
        layout: function(make, view) {
          make.bottom.inset(400);
          make.top.inset(50);
          make.right.left.inset(80);
        }
      },
      {
        type: "label",
        props: {
          id: "texts",
          insets: $insets(25, 25, 25, 25),
          font: $font("GillSans-Light", 15),
          alpha: 0,
          lines: 0,
          text: "",
          alwaysBounceVertical: true
        },
        layout: function(make, view) {
          make.right.left.inset(80);
          make.bottom.inset(90);
          make.top.inset(160);
        }
      },
      {
        type: "button",
        props: {
          title: "领卷",
          id: "linjuan",
          alpha: 0,
          text: "",
          bgcolor: $color("#AD002D")
        },
        layout: function(make, view) {
          make.bottom.equalTo($("fff").bottom).offset(-30);
          make.right.inset(43);
          make.size.equalTo($size(50, 30));
        },
        events: {
          tapped: function(sender) {
            $device.taptic(0);
            lingerj();
          }
        }
      }
    ]
  });

  function lingerj() {
    xjfw = spid[$("linjuan").text].replace('<a href="', "");
    $http.get({
      url: "http://wjgou.swlte.com" + xjfw,
      handler: function(resp) {
        var data = resp.data;

        $clipboard.text = qupi(/<textarea[\s\S]*<\/textarea>/.exec(data)[0]);
        $app.openURL("taobao://");
      }
    });
  }
}
