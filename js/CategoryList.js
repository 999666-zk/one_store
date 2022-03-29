$(function () {
  // var translate = {};

  $("#sortPrice .fl").on("click", function () {
    var arr = [];
    var price = 0;
    var whichIndex = 0;
    if ($(this).attr("flag") != 1) {
      $(".cate_list li").each(function (index, item) {
        // console.log(index, item);
        arr.push($(item));
        // price = $(item).children('.price').children().text().slice(1) - 0;
      });
      List(arr, whichIndex);

      $(this).attr("flag", "1");
    } else {
      whichIndex = $(this).attr("flag");
      $(".cate_list li").each(function (index, item) {
        // console.log(index, item);
        arr.push($(item));
        // price = $(item).children('.price').children().text().slice(1) - 0;
      });
      List(arr, whichIndex);
      $(this).attr("flag", "0");
    }
  });

  function List(arr, whichIndex) {
    if (whichIndex == 0) {
      arr.sort(function (a, b) {
        return (
          a.children(".price").children().text().slice(1) -
          0 -
          (b.children(".price").children().text().slice(1) - 0)
        );
      });
    } else {
      arr.sort(function (a, b) {
        return (
          b.children(".price").children().text().slice(1) -
          0 -
          (a.children(".price").children().text().slice(1) - 0)
        );
      });
    }
    // $('.cate_list').children('li').fadeOut('slow');
    $(".cate_list").children("li").remove();
    $.each(arr, function (index, item) {
      $(".cate_list").append($(item));
    });
  }
});
