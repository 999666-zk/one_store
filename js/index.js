$(function () {
  // 侧边导航栏
  $(".leftNav ul li").hover(
    function (e) {
      // console.log("ok");
      // console.log($(e.target).attr('class'));
      // if ($(e.target.className) == 'zj')
      //     $(this).css("display", "block");
      $(".leftNav .zj").css("display", "block");
      $(this).siblings().children(".zj").css("display", "none");
    },
    function () {
      $(".leftNav .zj").css("display", "none");
    }
  );
  //-----------------------------------------------------------
  // 资讯滚动
  var timer = null;
  // 增量
  var index = 0;
  // 记录位置
  var location = 0;
  $(document).ready(autoM(index));

  function autoM(index) {
    timer = setInterval(function () {
      index++;
      if (index >= $("#express").children().length * 15) {
        index = 0;
      }
      $("#express").scrollTop(index);
      location = index;
    }, 50);
  }

  $("#express").hover(
    function () {
      clearInterval(timer);
    },
    function () {
      autoM(location);
    }
  );
  //---------------------------------------------------------------
  // 客服服务
  $(".ss_list").hover(
    function () {
      $(".ss_list_bg").slideDown("slow");
      return false;
    },
    function () {
      $(".ss_list_bg").slideUp("fast");
      return false;
    }
  );

  //-----------------------------------------------------------
  // 轮播图
  var $scroll_box = $(".slide_box");
  var imgs = $(".slide_box li img");
  var img_height = imgs.height();
  console.log(img_height);

  var $lis = $(".num>li");
  var timer1 = null;
  var timer2 = null;
  var num = 0;
  var step = 0;

  function automoves() {
    if (timer1) {
      clearInterval(timer1);
    }
    timer1 = setInterval(function () {
      num++;
      if (num >= imgs.length) {
        num = 0;
      }
      step += img_height;
      if (step >= img_height * imgs.length) {
        step = 0;
        $scroll_box.scrollTop(0);
      }
      $scroll_box.scrollTop(step);
      $lis.eq(num).addClass("active").siblings().removeClass("active");
    }, 3000);
  }
  automoves();

  // hover 暂停效果
  $(".top_slide_wrap").hover(
    function () {
      clearInterval(timer1);
    },
    function () {
      automoves();
    }
  );

  // 轮播图小标
  $(".num li").hover(
    function () {
      $(".num li").removeClass("active");
      let $biao = $(this).text();
      $scroll_box.scrollTop(($biao - 1) * img_height);
      clearInterval(timer1);
    },
    function () {
      let $biao_li = $(this).text();
      // console.log($biao);
      $(".num li")
        .eq($biao_li - 1)
        .addClass("active");
      automoves();
    }
  );

  //------------------------------------------------------------------------
  // 购物车
  $(".i_car").on("click", function () {
    $(this).children(".last").fadeIn("slow");
    $(this).attr("index", 1);
    return false;
  });
  $(document).on("click", function () {
    $(".i_car").children(".last").fadeOut("fast");
    $(".i_car").attr("index", 0);
  });

  // 创建接受数据的对象
  var shop_box = {};
  shop_box.innerGo = [];

  $(".shop ul li").each(function (index, item) {
    // console.log(index, item);
    var n_ = $(item).find("input").val() - 0;
    var p_ = $(item).find(".J_smallTotalPrice").text().slice(1) - 0;
    // console.log(n_, p_);

    // 给li添加类名，方便后续查找
    $(this).addClass("shop_li");

    shop_box.innerGo.push({
      num: n_,
      price: p_,
      thisAll_price: n_ * p_,
    });
  });
  shop_box.allNum =
    $(".J_totalCount")
      .text()
      .slice(1, $(".J_totalCount").text().length - 1) - 0;
  shop_box.allPrice = $(".J_totalPrice").text().slice(1) - 0;
  console.log(shop_box);

  // ---------------------------逻辑处理--------------------------------
  // 添加商品
  $(".J_btnAddCount").on("click", function () {
    var shop_index = $(this).parents(".shop_li").index();
    // console.log(shop_index);
    var n = ++shop_box.innerGo[shop_index].num;
    // 数据更新方法
    changeD(shop_index, n);
    showView(shop_index);
  });
  // 删除商品
  $(".J_btnDelCount").on("click", function () {
    var shop_index = $(this).parents(".shop_li").index();
    // console.log(shop_index);
    var n = --shop_box.innerGo[shop_index].num;
    if (n <= 0) {
      if (confirm("是否要删除商品？")) {
        // console.log('删除');
        del(shop_index);
      }
      return false;
    }
    // 数据更新方法
    changeD(shop_index, n);
    showView(shop_index);
  });

  // 数据更新方法
  function changeD(index, num) {
    // 修改单个商品的总价
    if (index >= 0) {
      var thisPrice = shop_box.innerGo[index].price;
      shop_box.innerGo[index].thisAll_price = num * thisPrice;
    }

    // 商品总数量和总价格
    shop_box.allNum = 0;
    shop_box.allPrice = 0;
    $.each(shop_box.innerGo, function (index, item) {
      shop_box.allNum += item.num;
      shop_box.allPrice += item.thisAll_price;
    });
    // console.log(shop_box);
  }

  // 数据渲染
  function showView(index) {
    if (index >= 0) {
      let num = shop_box.innerGo[index].num;
      let allPrice = shop_box.innerGo[index].thisAll_price;

      $(".shop ul li").eq(index).find("input").val(num);
      $(".shop ul li")
        .eq(index)
        .find(".J_smallTotalPrice")
        .text("￥" + allPrice);
    }

    $(".J_totalCount").text("(" + shop_box.allNum + ")");
    $(".J_totalPrice").text("￥" + shop_box.allPrice);
  }

  // 删除数据
  $(".J_btnDelete").on("click", function () {
    var shop_index = $(this).parents(".shop_li").index();
    // console.log(shop_index);
    del(shop_index);
  });

  function del(index) {
    // 删除对应数据
    shop_box.innerGo.splice(index, 1);
    changeD(-1);
    showView(-1);
    // 删除页面结构

    $(".shop ul li").eq(index).fadeOut("slow");
    let timer3 = null;
    timer3 = setTimeout(function () {
      $(".shop ul li").eq(index).remove();
      if ($(".shop ul").children("li").length == 0) {
        $(".shop").remove();
        $(".noshop").show();
      }
    }, 600);
  }
});
