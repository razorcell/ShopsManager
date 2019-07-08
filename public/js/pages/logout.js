$(document).ready(function() {
  $("#logout").click(function(event) {
    event.preventDefault();
    $.ajax({
      url: "/logout",
      type: "GET",
      success: function() {
        window.location.href = "/login";
      }
    });
  });
});
