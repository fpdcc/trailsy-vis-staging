$(document).ready(function () {
  // Fetch our events
  $.getJSON( 'https://fpcc-staging.smartchicagoapps.org/alerts/list.json', function ( data ) {
    var items = [];
    var listHTML = ''
    $.each(data, function(key, val) {
      var map_id = val.map_id.replace(/[& ]/g, '+')
      listHTML += "<li id='" + map_id + "'><strong><a href='https://fpcc-staging.smartchicagoapps.org/#/?" + val.type + "=" + map_id + "'>" + val.name + "</a></strong><ul>"
      $.each(val.alerts, function(key, alert) {
        if (alert.end_date === null) {
          alert.end_date = 'No end date set'
        }
        listHTML += "<li><strong>" + alert.start_date + ' - ' + alert.end_date + "</strong>: " + alert.description + "</li>"
      })
      listHTML += "</ul></li"
    });
   
    $('#alertlist').html(listHTML)
    // $( "<ul/>", {
    //   "class": "my-new-list",
    //   html: items.join( "" )
    // }).appendTo( "body" );
  });
});

