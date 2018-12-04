$(document).ready(function () {
    // Fetch our events
    var url_base = 'https://map.fpdcc.com'
    var data_url = url_base + '/alerts/list.json'

    // var urlParams = new URLSearchParams(window.location.search);
    // var myParam = urlParams.get('id');
    var alertlistdivs = Array.from( document.getElementsByClassName('alertlist'))

    console.log(alertlistdivs)
    //$('#alertlist').html("Open")
    $.getJSON( data_url, function ( data ) {
      var items = [];
      var listHTML = ''
      var globalAlerts = data['global']
      var locationAlerts = data['locations']
      alertlistdivs.forEach(function(alertdiv) {
        console.log(alertdiv.parentElement.dataset.id);
        var divLocId = alertdiv.parentElement.dataset.id
        var divLocType = alertdiv.parentElement.dataset.loctype
        listHTML = 'Open'
      
        $.each(locationAlerts, function(key, val) {
            console.log('val.map_id = ' + val.map_id)
            if (val.id == divLocId) {
                var map_id = val.map_id.replace(/[& ]/g, '+')
                listHTML = "<ul class='alerts' id='" + map_id + "'>"
                $.each(val.alerts, function(key, alert) {
                    if (alert.end_date === null) {
                        alert.end_date = '?'
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
                console.log(listHTML)
               
            }
        })
        alertdiv.innerHTML = listHTML
      })
        
  
     
      // $( "<ul/>", {
      //   "class": "my-new-list",
      //   html: items.join( "" )
      // }).appendTo( "body" );
    });
});
  
  