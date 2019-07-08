$(document).ready(function() {
  $(".status_button").click(function(event) {
    event.preventDefault();
    var parent_card = $(this)
      .closest("div.shopcard")
      .first();
    var shop_name = $(this).attr("shop_name");
    var distance = $(this).attr("distance");
    var status = $(this).attr("status");
    var json_data = {
      name: shop_name,
      distance: distance,
      status: status
    };
    $.ajax({
      url: "/api/shop",
      data: JSON.stringify(json_data),
      cache: false,
      processData: false,
      // dataType: "json",
      contentType: "application/json; charset=utf-8",
      type: "PUT",
      success: function(data) {
        $.notify(shop_name + " added as " + status, "info");
        parent_card.animate(
          { height: 0, opacity: 0, margin: 0, padding: 0 },
          "slow",
          function() {
            $(this).hide();
          }
        );
      },
      error: function(jqXHR, textStatus, errorThrown) {
        $.notify(
          shop_name + " could not be updated. Possibly Session timed-out",
          "error"
        );
      }
    });
  });
});
