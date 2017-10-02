$(document).ready(function () {
  // Fetch our events
  $.getJSON( 'https://fpcc-staging.smartchicagoapps.org/alerts/list.json', function ( data ) {
    var items = [];
    var listHTML = ''
    $.each(data, function(key, val) {
      console.log('val.map_id = ' + val.map_id)
      var map_id = val.map_id.replace(/[& ]/g, '+')
      listHTML += "<ul class='alerts' id='" + map_id + "'><strong><a href='https://fpcc-staging.smartchicagoapps.org/#/?" + val.type + "=" + map_id + "'>" + val.name + "</a></strong>"
      $.each(val.alerts, function(key, alert) {
        if (alert.end_date === null) {
          alert.end_date = 'No end date set'
        }
        var classType = "warning"
        var alertTypeName = "ALERT"
        if (alert.alert_type == "closure") {
          classType = "danger"
          alertTypeName = "CLOSURE"
        }

        listHTML += "<li class='alerts bg-" + classType + "'><span class='label label-" + classType + "'>" + alertTypeName + "</span> <strong>" + alert.start_date + " - " + alert.end_date + "</strong>: " + alert.description + "</li>"
      })
      listHTML += "</ul>"
    });


   
    $('#alertlist').html(listHTML)
    // $( "<ul/>", {
    //   "class": "my-new-list",
    //   html: items.join( "" )
    // }).appendTo( "body" );
  });
});
