$(document).ready(function () {
  loadInboxData();
});

// load Inbox Data
function loadInboxData() {
  $.ajax({
    type: "GET",
    url: "./InboxData.xml",
    dataType: "xml",
    success: function (xml) {
      var tableData = ReceiveData(xml);
      createTable(tableData);
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
  return data;
}

// create Table
function createTable(data) {
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
        '<button onclick="showMenu(event, this)" class="menu-btn"><i class="fa fa-bars"></i></button>'
      )
    );

    $("#inbox--table tbody").append(tr);
  });
}

// show Menu
function showMenu(event, btn) {
  var $row = $(btn).closest("tr");
  var menu = $('<div class="context-menu">')
    .append(
      '<button onclick="closeElement(this)" class="cancel-btn"><i class="fa fa-close" style="font-size:18px"></i></button>'
    )
    .append('<div class="menu-item show-row" onclick="ShowDetails(this)">مشاهده</div>')
    .append('<div class="menu-item delete-row" onclick="deleteRow(this)">حذف</div>');

  $("body").append(menu);
  menu.css({
    top: event.pageY,
    left: event.pageX,
  });

  $(menu).data("currentRow", $row);
}

// close menu or card
function closeElement(button) {
  $(button).closest(".context-menu, #inbox--details, #selected-details").remove();
}

// Show Details
function ShowDetails(button) {
  closeDetails();

  var $row = $(button).closest(".context-menu").data("currentRow");
  var selectedData =
    "فرستنده: " + $row.find("td:nth-child(3)").text() + "<br>";
  selectedData += "سمت: " + $row.find("td:nth-child(4)").text() + "<br>";
  selectedData += "نوع مدرک: " + $row.find("td:nth-child(5)").text() + "<br>";
  
  var card = $('<div id="inbox--details" class="card">')
    .append(
      '<div class="card-header"><button onclick="closeElement(this)" class="cancel-btn"><i class="fa fa-close" style="font-size:24px"></i></button></div>'
    )
    .append('<div class="card-body">' + selectedData + "</div>");

  $(".context-menu").remove();

  $("body").append(card);
}

// delete Row
function deleteRow(button) {
  var $row = $(button).closest(".context-menu").data("currentRow");
  $row.remove();
  $(".context-menu").remove();
  closeDetails();
  updateIndexes();
}

//  update Indexes
function updateIndexes() {
  $("#inbox--table tbody tr").each(function (index) {
    $(this).find("td:first").text(index + 1);
  });
}

// close Details
function closeDetails() {
  $("#inbox--details").remove();
  $("#selected-details").remove();
}

// react to selected
function updateActionButtonVisibility() {
  if ($(".row-checkbox:checked").length > 0) {
    $(".action-buttons").show();
  } else {
    $(".action-buttons").hide();
  }
}

// Select all
$("#select-all").click(function () {
  $(".row-checkbox").prop("checked", this.checked);
  updateActionButtonVisibility();
});

// change at Chekbox
$(document).on("change", ".row-checkbox", function () {
  updateActionButtonVisibility();
});

// Delete Selected
$("#delete-selected").click(function () {
  $(".row-checkbox:checked").closest("tr").remove();
  updateIndexes();
  updateActionButtonVisibility();
  closeDetails();
});

// view Details
$("#view-details").click(function () {
  showSelectedDetails();
});


function showSelectedDetails() {

  closeDetails();
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
      '<div class="card-header"><button onclick="closeElement(this)" class="cancel-btn"><i class="fa fa-close" style="font-size:24px"></i></button></div>'
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
function ChangeThem(event) {
  $("body").toggleClass("dark-theme light-theme", $(event.target).is(":checked"));
}

