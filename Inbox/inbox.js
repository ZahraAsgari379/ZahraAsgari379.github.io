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

          var row = $("<tr>").data("ReceiverCode", ReceiverCode);
          row.append($("<td>").text(index + 1));
          row.append(
            $("<td>").html('<input type="checkbox" class="row-checkbox">')
          );
          row.append($("<td>").text(SenderName));
          row.append($("<td>").text(RoleName));
          row.append($("<td>").text(EntityTypeName));
          row.append($("<td>").text(Title));
          row.append($("<td>").text(ActionName));
          row.append($("<td>").text(EntityNumber));
          row.append($("<td>").text(ReceiveDate));
          row.append($("<td>").text(FollowingType));
          row.append(
            $("<td>").html(
              '<button class="menu-btn"><i class="fa fa-bars"></i></button>'
            )
          );

          $("#inbox--table tbody").append(row);
        });
    },

    error: function () {
      console.error("اطلاعات یافت نشد");
    },
  });

  $(document).on("click", ".menu-btn", function () {
    var $row = $(this).closest("tr");
    var menu = $('<div class="context-menu">')
      .append(
        '<button class="cancel-btn"><i class="fa fa-close" style="font-size:18px"></i></button>'
      )
      .append('<div class="menu-item show-row">مشاهده</div>')
      .append('<div class="menu-item delete-row">حذف</div>');

    $("body").append(menu);
    menu.css({
      top: $(this).offset().top + $(this).height(),
      left: $(this).offset().left,
    });

    $(".fa-close").click(function () {
      menu.remove();
    });

    $(".show-row").on("click", function () {
      var selectedData =
        "فرستنده: " + $row.find("td:nth-child(2)").text() + "<br>";
      selectedData += "سمت: " + $row.find("td:nth-child(3)").text() + "<br>";
      selectedData +=
        "نوع مدرک: " + $row.find("td:nth-child(4)").text() + "<br>";
      var detailsCard = $('<div id="inbox--details" class="card">')
        .append(
          '<div class="card-header"><button class="cancel-btn"><i class="fa fa-close" style="font-size:24px"></i></button></div>'
        )
        .append('<div class="card-body">' + selectedData + "</div>");
      menu.remove();

      $("body").append(detailsCard);

      $(".fa-close").click(function () {
        detailsCard.remove();
      });
    });

    $(".delete-row").click(function () {
      $row.remove();
      menu.remove();
      updateIndexes();
      closeDetails();
    });
  });

  function updateIndexes() {
    $("#inbox--table tbody tr").each(function (index) {
      $(this)
        .find("td:first")
        .text(index + 1);
    });
  }

  function closeDetails() {
    $("#inbox--details").remove();
    $("#selected-details").remove();
  }

  $("#select-all").click(function () {
    $(".row-checkbox").prop("checked", this.checked);
    updateActionButtonVisibility();
  });

  $(document).on("change", ".row-checkbox", function () {
    updateActionButtonVisibility();
  });

  $("#delete-selected").click(function () {
    $(".row-checkbox:checked").closest("tr").remove();
    updateIndexes();
    updateActionButtonVisibility();
    closeDetails();
  });

  $("#view-details").click(function () {
    var selectedData = "";
    $(".row-checkbox:checked").each(function () {
      var $row = $(this).closest("tr");
      selectedData +=
        "فرستنده: " + $row.find("td:nth-child(2)").text() + "<br>";
      selectedData += "سمت: " + $row.find("td:nth-child(3)").text() + "<br>";
      selectedData +=
        "نوع مدرک: " + $row.find("td:nth-child(4)").text() + "<br>";
      selectedData += "<hr>";
    });

    var detailsCard = $('<div id="selected-details" class="card">')
      .append(
        '<div class="card-header"><button class="cancel-btn"><i class="fa fa-close" style="font-size:24px"></i></button></div>'
      )
      .append('<div class="card-body">' + selectedData + "</div>");
    $("body").append(detailsCard);

    $(".fa-close").click(function () {
      detailsCard.remove();
    });
  });

  function updateActionButtonVisibility() {
    if ($(".row-checkbox:checked").length > 0) {
      $(".action-buttons").show();
    } else {
      $(".action-buttons").hide();
    }
  }
});

$("#change-them").on("change", function () {
  $("body").toggleClass("dark-theme light-theme", $(this).is(":checked"));
});

$("#languageSelect").change(function () {
  var selectedValue = $(this).val();
  if (selectedValue === "fa") {
    $("body").removeClass("ltr").addClass("rtl");
  } else {
    $("body").removeClass("rtl").addClass("ltr");
  }
});
