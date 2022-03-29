$(function () {
  // 加入购物车功能
  $("#choice1 ul li").on("click", function () {
    $(this).siblings("li").removeClass("checked");
    $(this).addClass("checked");
  });
  $("#choice2 ul li").on("click", function () {
    $(this).siblings("li").removeClass("checked");
    $(this).addClass("checked");
  });

  var thisProduct = {};
  // console.log($('.des_price b').text().slice(1));
  thisProduct.onePrice = $(".des_price b").text().slice(1);
  thisProduct.num = $(".n_ipt").val() - 0;
  thisProduct.allPrice = $(".des_price b").text().slice(1);

  $(".n_btn_1").on("click", function () {
    var n = ++thisProduct.num;
    addNum(n);
    showMsg();
  });
  $(".n_btn_2").on("click", function () {
    var n = --thisProduct.num;
    if (n < 1) {
      thisProduct.num = 1;
      return false;
    }
    delNum(n);
    showMsg();
  });
  // 添加数量

  function addNum(num) {
    thisProduct.allPrice = 0;
    thisProduct.allPrice += num * thisProduct.onePrice;
    // console.log(thisProduct);
  }

  function delNum(num) {
    thisProduct.allPrice = 0;
    thisProduct.allPrice += num * thisProduct.onePrice;
    // console.log(thisProduct);
  }

  function showMsg() {
    $(".n_ipt").val(thisProduct.num);
    $(".des_price b").text("￥" + thisProduct.allPrice);
  }
  // ---------------------------------------------------------------------------
  // 组合购买
  var pro = {};
  pro.arrPro = [];
  pro.inputNum = $(".sum_ipt").val() - 0;
  // 首先进行遍历哪些被选中了
  function findWitch() {
    // pro.arrPro = [];
    let check = $(".price .checkbox").find("input");
    check.each(function (index, item) {
      console.log(index, item);
      if ($(item).attr("checked") == "checked") {
        let price =
          $(item).parents(".price").children("span").text().slice(1) - 0;
        pro.arrPro.push(price);
      }
    });
  }
  findWitch();
  pro.golbalPrice = moneyAll(pro.arrPro, pro.inputNum);
  showDate();

  console.log(pro);

  // 失去焦点拿值
  $(".sum_ipt").on("blur", function () {
    let value = $.trim($(".sum_ipt").val());
    if (!isNaN(value - 0) && value != "") {
      pro.inputNum = Math.abs($(".sum_ipt").val()) - 0;
      pro.golbalPrice = moneyAll(pro.arrPro, pro.inputNum);
      showDate();
      console.log(pro);
    } else {
      if (confirm("必须输入数字！！！\n是否要购买一件？")) {
        $(".sum_ipt").val("1");
      } else {
        $(".sum_ipt").val("0");
      }
      $(".sum_ipt").focus();
      return false;
    }
  });

  // 判断那些值被选中了
  // $("input[type='checkbox']").is(':checked')==true

  $(".price .checkbox")
    .find("input")
    .on("click", function () {
      if (!$(this).attr("checked")) {
        $(this).attr("checked", true);
        var inputhere =
          $(this).parents(".price").children("span").text().slice(1) - 0;
        // console.log(inputhere);
        pushWitch(inputhere);
        pro.golbalPrice = moneyAll(pro.arrPro, pro.inputNum);
        showDate();
      } else {
        var inputhere =
          $(this).parents(".price").children("span").text().slice(1) - 0;
        $(this).attr("checked", false);
        popWitch(inputhere);
        pro.golbalPrice = moneyAll(pro.arrPro, pro.inputNum);
        showDate();
      }
      console.log(pro);
    });

  // 添加元素
  function pushWitch(inputhere) {
    pro.arrPro.push(inputhere);
  }
  // 删除元素
  function popWitch(inputhere) {
    $.each(pro.arrPro, function (index, item) {
      console.log(index, item);
      if (item == inputhere) {
        pro.arrPro.splice(index, 1);
      }
    });
  }
  // 计算价钱
  function moneyAll(arr, num) {
    let sumPrice = 0;
    $.each(arr, function (index, item) {
      sumPrice += item;
    });
    let endMoney = sumPrice * num;
    // console.log(endMoney);
    return endMoney;
  }

  // 渲染数据
  function showDate() {
    $(".team_sum span").text("￥" + pro.golbalPrice);
  }
});
