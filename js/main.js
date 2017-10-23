$(document).ready(function () {
  // Fetch our events
  var url_base = 'https://fpcc-staging.smartchicagoapps.org'
  var data_url = url_base + '/alerts/list.json'
  //url = 'http://localhost:8080/alerts/list.json'
  $.getJSON( data_url, function ( data ) {
    var items = [];
    var listHTML = ''
    var globalAlerts = data['global']
    var locationAlerts = data['locations']
    if (globalAlerts.length > 0) {
      listHTML += "<ul class='alerts' id='global'><h4>General Alerts</h4>"
      $.each(globalAlerts, function(key, alert) {
        if (alert.end_date === null) {
          alert.end_date = '???'
        }
        var classType = "warning"
        var alertTypeName = "ALERT"
        if (alert.alert_type == "closure") {
          classType = "danger"
          alertTypeName = "CLOSURE"
        }
        listHTML += "<li class='alerts bg-" + classType + "'><span class='label label-" + classType + "'>" + alertTypeName + "</span> <strong>" + alert.start_date + " - " + alert.end_date + "</strong>: " + alert.description + "</li>"
      });
      listHTML += "</ul>"
    }
    

    $.each(locationAlerts, function(key, val) {
      console.log('val.map_id = ' + val.map_id)
      var map_id = val.map_id.replace(/[& ]/g, '+')
      listHTML += "<ul class='alerts' id='" + map_id + "'><h4><a href='" + url_base + "/#/?" + val.type + "=" + map_id + "' target='_top'>" + val.name + "</a></h4>"
      $.each(val.alerts, function(key, alert) {
        if (alert.end_date === null) {
          alert.end_date = '???'
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

