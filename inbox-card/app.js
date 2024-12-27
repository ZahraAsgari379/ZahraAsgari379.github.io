$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "./InboxData.xml",
    dataType: "xml",
    success: function (xml) {
      $(xml)
        .find("Receive")
        .each(function (index) {
          var SenderName = $(this).find("Sender").attr("SenderName");
          var RoleName = $(this).find("Sender").attr("RoleName");
          var EntityTypeName = $(this).find("EntityTypeName").text();
          var Title = $(this).find("Title").text();
          var ActionName = $(this).find("ActionCode").attr("ActionName");
          var EntityNumber = $(this).find("EntityNumber").text();
          var ReceiveDate = $(this).find("ReceiveDate").text();
          var FollowingType = $(this).find("FollowingType").text();
          var ReceiverCode = $(this).find("ReceiverCode").text();

          var card = $('<div class="card mb-4">').data(
            "ReceiverCode",
            ReceiverCode
          );
          card.append(
            '<div class="card-header"> شماره کارت: ' + (index + 1) + "</div>"
          );
          card.append('<div class="card-body">');
          card.append('<h5 class="card-title">' + SenderName + "</h5>");
          card.append('<p class="card-text">سمت: ' + RoleName + "</p>");
          card.append(
            '<p class="card-text">نوع مدرک: ' + EntityTypeName + "</p>"
          );
          card.append('<p class="card-text">نوع ارجاع: ' + ActionName + "</p>");
          card.append(
            '<p class="card-text">شماره مدرک: ' + EntityNumber + "</p>"
          );
          card.append(
            '<p class="card-text">تاریخ دریافت: ' + ReceiveDate + "</p>"
          );
          card.append(
            '<p class="card-text">فوریت ارجاع: ' + FollowingType + "</p>"
          );
          card.append("</div>");
          card.append(
            '<div class="card-footer"><input type="checkbox" class="row-checkbox"> <button class="btn remove-btn"><i class="fa fa-trash"></i></button></div>'
          );

          var col = $('<div class="cards col-lg-4 col-md-6 col-sm-12">').append(card);
          $("#inbox--cards .row").append(col);
        });
    },
    error: function () {
      console.error("اطلاعات یافت نشد");
    },
  });

  // select all
  $("#select-all").click(function () {
    $(".row-checkbox").prop("checked", this.checked);
    updateDeleteButtonVisibility();
  });

  // delete card
  $(document).on("click", ".remove-btn", function () {
    $(this).closest(".cards").remove();
    updateIndexes();
    updateDeleteButtonVisibility();
  });

  // delete-selected
  $("#delete-selected").click(function () {
    $(".row-checkbox:checked").closest(".cards").remove();
    updateIndexes();
    updateDeleteButtonVisibility();
  });

  $(document).on("change", ".row-checkbox", function () {
    updateDeleteButtonVisibility();
  });

  // show delete-selected btn
  function updateDeleteButtonVisibility() {
    if ($(".row-checkbox:checked").length > 0) {
      $("#delete-selected").show();
    } else {
      $("#delete-selected").hide();
    }
  }
  //updateIndexes
  function updateIndexes() {
    $(".card").each(function (index) {
      $(this)
        .find(".card-header")
        .text(" شماره کارت: " + (index + 1));
    });
  }

});

// dark // light them
$("#change-them").on("change", function () {
  $("body").toggleClass("dark-theme light-theme", $(this).is(":checked"));
});

// language
$("#languageSelect").change(function () {
  var selectedValue = $(this).val();
  if (selectedValue === "fa") {
    $("body").removeClass("ltr").addClass("rtl");
  } else {
    $("body").removeClass("rtl").addClass("ltr");
  }
});
