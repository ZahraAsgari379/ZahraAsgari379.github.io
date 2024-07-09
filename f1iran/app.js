let navbarList = document.getElementById("nav-list");
function showNavbar() {
  if (navbarList.className == "navbar-list") {
    navbarList.className += "show-navbar-list";
  } else {
    navbarList.className = "navbar-list";
  }
}
