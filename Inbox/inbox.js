$(document).ready(function () {
  LoadInboxData();
});

// Load Inbox Data
function LoadInboxData() {
  $.ajax({
    type: "GET",
    url: "./InboxData.xml",
    dataType: "xml",
    success: function (xml) {
      var tableData = ReceiveData(xml);
      CreateTable(tableData);
    },
    error: function () {
      console.error("اطلاعات یافت نشد");
    },
  });
}

// Receive Data 
function ReceiveData(xml) {
  var data = [];
  $(xml).find("Receive").each(function (index) {
    var row = {
      SenderName: $(this).find("Sender").attr("SenderName"),
      RoleName: $(this).find("Sender").attr("RoleName"),
      EntityTypeName: $(this).find("EntityTypeName").text(),
      Title: $(this).find("Title").text(),
      ActionName: $(this).find("ActionCode").attr("ActionName"),
      EntityNumber: $(this).find("EntityNumber").text(),
      ReceiveDate: $(this).find("ReceiveDate").text(),
      FollowingType: $(this).find("FollowingType").text(),
      ReceiverCode: $(this).find("ReceiverCode").text(),
    };
    data.push(row);
  });

  var d1 = data;
  //d1[0] = null;
  d[0].SenderName = "200000000000"
  alert(data[0]);
  
  return data;
}

// Create Table
function CreateTable(data) {
  data.forEach(function (row, index) {
    var tr = $("<tr>").data("ReceiverCode", row.ReceiverCode);
    tr.append($("<td>").text(index + 1));
    tr.append($("<td>").html('<input type="checkbox" class="row-checkbox">'));
    tr.append($("<td>").text(row.SenderName));
    tr.append($("<td>").text(row.RoleName));
    tr.append($("<td>").text(row.EntityTypeName));
    tr.append($("<td>").text(row.Title));
    tr.append($("<td>").text(row.ActionName));
    tr.append($("<td>").text(row.EntityNumber));
    tr.append($("<td>").text(row.ReceiveDate));
    tr.append($("<td>").text(row.FollowingType));
    tr.append(
      $("<td>").html(
        '<button onclick="ShowMenu(event, this)" class="menu-btn"><i class="fa fa-bars"></i></button>'
      )
    );

    $("#inbox--table tbody").append(tr);
  });
}

// Show Menu
function ShowMenu(event, btn) {

  $(".context-menu").remove();
  var $row = $(btn).closest("tr");
  var menu = $('<div class="context-menu">')
    .append(
      '<button onclick="CloseElement(this)" class="cancel-btn"><i class="fa fa-close" style="font-size:18px"></i></button>'
    )
    .append('<div class="menu-item show-row" onclick="ShowDetails(this)">مشاهده</div>')
    .append('<div class="menu-item delete-row" onclick="DeleteRow(this)">حذف</div>');

  $("body").append(menu);
  menu.css({
    top: event.pageY,
    left: event.pageX,
  });

  $(menu).data("currentRow", $row);
}

// Close menu or card
function CloseElement(button) {
  $(button).closest(".context-menu, #inbox--details, #selected-details").remove();
}

// Show Details
function ShowDetails(button) {
  CloseDetails();

  var $row = $(button).closest(".context-menu").data("currentRow");
  var selectedData =
    "فرستنده: " + $row.find("td:nth-child(3)").text() + "<br>";
  selectedData += "سمت: " + $row.find("td:nth-child(4)").text() + "<br>";
  selectedData += "نوع مدرک: " + $row.find("td:nth-child(5)").text() + "<br>";
  
  var card = $('<div id="inbox--details" class="card">')
    .append(
      '<div class="card-header"><button onclick="CloseElement(this)" class="cancel-btn"><i class="fa fa-close" style="font-size:24px"></i></button></div>'
    )
    .append('<div class="card-body">' + selectedData + "</div>");

  $(".context-menu").remove();

  $("body").append(card);
}

// Delete Row
function DeleteRow(button) {
  var $row = $(button).closest(".context-menu").data("currentRow");
  $row.remove();
  $(".context-menu").remove();
  CloseDetails();
  UpdateIndexes();
}

//  Update Indexes
function UpdateIndexes() {
  $("#inbox--table tbody tr").each(function (index) {
    $(this).find("td:first").text(index + 1);
  });
}

// Close Details
function CloseDetails() {
  $("#inbox--details").remove();
  $("#selected-details").remove();
}

// react to selected
function UpdateActionButtonVisibility() {
  if ($(".row-checkbox:checked").length > 0) {
    $(".action-buttons").show();
  } else {
    $(".action-buttons").hide();
  }
}

// Select all
$("#select-all").click(function () {
  $(".row-checkbox").prop("checked", this.checked);
  UpdateActionButtonVisibility();
});

// change at Chekbox
$(document).on("change", ".row-checkbox", function () {
  UpdateActionButtonVisibility();
});

// Delete Selected
$("#delete-selected").click(function () {
  $(".row-checkbox:checked").closest("tr").remove();
  UpdateIndexes();
  UpdateActionButtonVisibility();
  CloseDetails();
});

// view Details
$("#view-details").click(function () {
  ShowSelectedDetails();
});


function ShowSelectedDetails() {

  CloseDetails();
  var selectedData = "";
  $(".row-checkbox:checked").each(function () {
    var $row = $(this).closest("tr");
    selectedData +=
      "فرستنده: " + $row.find("td:nth-child(3)").text() + "<br>";
    selectedData += "سمت: " + $row.find("td:nth-child(4)").text() + "<br>";
    selectedData += "نوع مدرک: " + $row.find("td:nth-child(5)").text() + "<br>";
    selectedData += "<hr>";
  });

  var detailsCard = $('<div id="selected-details" class="card">')
    .append(
      '<div class="card-header"><button onclick="CloseElement(this)" class="cancel-btn"><i class="fa fa-close" style="font-size:24px"></i></button></div>'
    )
    .append('<div class="card-body">' + selectedData + "</div>");

  $("body").append(detailsCard);
}


 // change direction
 $("#languageSelect").change(function () {
  var selectedValue = $(this).val();
  $("body").toggleClass("rtl", selectedValue === "fa");
  $("body").toggleClass("ltr", selectedValue !== "fa");
});

// ChangeThem
$('body').addClass('light-theme');

function ChangeThem(event) {
  if ($(event.target).is(':checked')) {
      $('body').addClass('dark-theme').removeClass('light-theme');
  } else {
      $('body').addClass('light-theme').removeClass('dark-theme');
  }
}

$('#change-them').on('change', ChangeThem);

