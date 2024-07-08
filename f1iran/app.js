
let navBarList = document.getElementById("nav-list");
  function showNavbar() {

    if (navBarList.className == "navbar-list") {
      navBarList.className += "open-nav";
    } else {
      navBarList.className = "navbar-list";
    }
  }