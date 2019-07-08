$(document).ready(function() {
  $("#login").click(function(event) {
    event.preventDefault();
    var email = $("#email").val();
    var password = $("#password").val();
    var data = new FormData();
    data.append("email", email);
    data.append("password", password);

    var json_data = {
      email: email,
      password: password
    };

    $.ajax({
      url: "/api/auth",
      data: JSON.stringify(json_data),
      cache: false,
      processData: false,
      //   dataType: "json",
      contentType: "application/json; charset=utf-8",
      type: "POST",
      success: function(data) {
        window.location.href = "/";
        // console.log(data.token);
        // window.sessionStorage.accessToken = data.access_token;
      },
      error: function(jqXHR, textStatus, errorThrown) {
        $.notify("Login incorrect", "error");
      }
    });
  });

  $("#registration").click(function(event) {
    event.preventDefault();
    var name = $("#fullname").val();
    var email = $("#email_registration").val();
    var password = $("#password_registration").val();
    // var data = new FormData();
    // data.append("email", email);
    // data.append("password", password);

    var json_data = {
      name: name,
      email: email,
      password: password
    };

    $.ajax({
      url: "/api/users",
      data: JSON.stringify(json_data),
      cache: false,
      processData: false,
      //   dataType: "json",
      contentType: "application/json; charset=utf-8",
      type: "POST",
      success: function(data) {
        window.location.href = "/";
        // console.log(data.token);
        // window.sessionStorage.accessToken = data.access_token;
      },
      error: function(jqXHR, textStatus, errorThrown) {
        $.notify("Please check the fields", "error");
      }
    });
  });
});
