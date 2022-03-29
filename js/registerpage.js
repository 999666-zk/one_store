$(function () {
  // 发送验证码
  let timer = null;
  let num = 60;
  var flag = true;
  let timeStart = new Date();
  $(".tableText").on("click", function () {
    let timeEnd = new Date();
    if (flag) {
      flag = false;
      if (timeEnd - timeStart >= 60) {
        timer = setInterval(function () {
          num--;
          $(".tableText").text("(" + num + ")" + "重发");
          $(".tableText").attr("style", "background-color:rgb(162, 161, 168);");
          if (num < 0) {
            clearInterval(timer);
            num = 60;
            $(".tableText").text("重新获取验证码");
            flag = true;
            $(".tableText").removeAttr("style");
            $(".tableText").attr("style", "background-color:rgb(87, 86, 95);");
          }
        }, 1000);
      }
    }
  });

  //正则验证
  // $("input[type='submit']").on("click", function () {
  //   var password = null,
  //     rePassword = null;

  //   $(".phone").focus(function () {
  //     if ($(this).get(0).validity.patternMismatch) {
  //       $(this).get(0).setCustomValidity("请输入合法的手机号！");
  //       return false;
  //     } else if ($(this).get(0).validity.valueMissing) {
  //       $(this).get(0).setCustomValidity("手机号不能为空");
  //       return false;
  //     } else {
  //       $(this).get(0).setCustomValidity("");
  //       $(this).attr("flag", "ok");
  //     }
  //   });

  //   $(".password").focus(function () {
  //     if ($(this).get(0).validity.patternMismatch) {
  //       $(this)
  //         .get(0)
  //         .setCustomValidity(
  //           "请输入合法的密码,[ (6-18)位字母、数字、下划线_ 、@ ] (且必须包含其中两项)"
  //         );
  //       return false;
  //     } else if ($(this).get(0).validity.valueMissing) {
  //       $(this).get(0).setCustomValidity("密码不能为空");
  //       return false;
  //     } else {
  //       $(this).get(0).setCustomValidity("");
  //       $(this).attr("flag", "ok");
  //     }
  //   });
  //   $(".rePassword").focus(function () {
  //     if ($(this).get(0).validity.patternMismatch) {
  //       $(this)
  //         .get(0)
  //         .setCustomValidity(
  //           "请输入合法的密码,[ (6-18)位字母、数字、下划线_ 、@ ] (且必须包含其中两项)"
  //         );
  //       return false;
  //     } else if ($(this).get(0).validity.valueMissing) {
  //       $(this).get(0).setCustomValidity("密码不能为空");
  //       return false;
  //     } else if ($(this).val() != $(".password").val()) {
  //       $(this).get(0).setCustomValidity("两次输入的密码不一致！");
  //       return false;
  //     } else {
  //       $(this).get(0).setCustomValidity("");
  //       $(this).attr("flag", "ok");
  //     }
  //   });
  // });

  // 正则
  $(".phone").blur(function () {
    let reg_phone = /^1[3578]\d{9}$/;
    let phone_value = $(".phone").val();
    if (phone_value.trim() == "") {
      $("#phone").val("!手机号不能为空").css("color", "red");
      return false;
    } else if (!reg_phone.test(phone_value)) {
      $("#phone").val("!请输入合法的手机号").css("color", "orange");
      return false;
    } else {
      $("#phone").val("输入正确 √ ").css("color", "green");
      $(this).attr("flag", "ok");
    }
  });

  $(".password").blur(function () {
    let reg_password = /^(?![a-zA-Z]+$)(?![\d]+$)(?![_@]+$)[\w@]{6,18}$/;
    let password_value = $(".password").val();
    if (password_value.trim() == "") {
      $("#password").val("!密码不能为空").css("color", "red");
      return false;
    } else if (!reg_password.test(password_value)) {
      $("#password")
        .val(
          "请输入合法的密码!(6-18)位字母|数字|下划线_ /@[且必须包含其中两项]"
        )
        .css("color", "orange");
      return false;
    } else {
      $("#password").val("输入正确 √").css("color", "green");
      $(this).attr("flag", "ok");
    }
  });

  $(".rePassword").blur(function () {
    let reg_rePassword = /^(?![a-zA-Z]+$)(?![\d]+$)(?![_@]+$)[\w@]{6,18}$/;
    let rePassword_value = $(".rePassword").val();
    if (rePassword_value.trim() == "") {
      $("#rePassword").val("!密码不能为空").css("color", "red");
      return false;
    } else if (!reg_rePassword.test(rePassword_value)) {
      $("#rePassword")
        .val(
          "请输入合法的密码!(6-18)位字母|数字|下划线_ /@[且必须包含其中两项]"
        )
        .css("color", "orange");
      return false;
    } else if ($(this).val() != $(".password").val()) {
      $("#rePassword").val("!两次输入的密码不一致").css("color", "orange");
      return false;
    } else {
      $("#rePassword").val("输入正确 √").css("color", "green");
      $(this).attr("flag", "ok");
    }
  });

  //   ajax  请求（原生）
  // let phone = document.getElementsByClassName("phone")[0];
  // let password = document.getElementsByClassName("password")[0];
  // let repwd = document.getElementsByClassName("rePassword")[0];
  // let btn = document.getElementsByClassName("tableBtn")[0];

  // btn.addEventListener("click", function () {
  //   if (
  //     phone.getAttribute("flag") == "ok" &&
  //     password.getAttribute("flag") == "ok" &&
  //     repwd.getAttribute("flag") == "ok"
  //   ) {
  //     let myAjax =
  //       new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");
  //     myAjax.open(
  //       "get",
  //       `http://127.0.0.1:8848/registerpage?phone=${phone.value}&password=${password.value}`,
  //       true
  //     );
  //     myAjax.send();
  //     myAjax.onreadystatechange = function () {
  //       if (myAjax.readyState == 4) {
  //         if (myAjax.status == 200) {
  //           console.log(JSON.parse(myAjax.responseText));
  //         }
  //       }
  //     };
  //   }
  // });

  // jquery 请求
  $(".tableBtn").click(function () {
    if (
      $(".phone").attr("flag") == "ok" &&
      $(".password").attr("flag") == "ok" &&
      $(".rePassword").attr("flag") == "ok"
    ) {
      $.ajax({
        async: false,
        type: "get",
        url: "http://127.0.0.1:8848/registerpage",
        data: { phone: $(".phone").val(), password: $(".password").val() },

        // data: {
        //   phone: 15539234100,
        //   password: "23123223e",
        // },
        success: function (msg) {
          // console.log(msg);
          alert(msg);
        },
      });
    }
  });
});
