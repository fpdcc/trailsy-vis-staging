jQuery(function ($) {
    // Fetch our events
    var url_base = 'https://map.fpdcc.com'
    var data_url = url_base + '/alerts/list.json'

    var drawAlerts = function (alerts) {
        var html = ''
        $.each(alerts, function(key, alert) {
            if (alert.end_date === null) {
                alert.end_date = '?'
            }
            var classType = "warning"
            var alertTypeName = "ALERT"
            if (alert.alert_type == "closure") {
                classType = "danger"
                alertTypeName = "CLOSURE"
            }
            html += "<li class='alerts bg_" + classType + "'><span class='label_" + classType + "'>" + alertTypeName + "</span> <strong>" + alert.start_date + " - " + alert.end_date + "</strong>: " + alert.description + "</li>"
        })
        return html
    }

    var alertlistdivs = Array.from( document.getElementsByClassName('alertlist'))

    console.log(alertlistdivs)
    $.getJSON( data_url, function ( data ) {
      var items = [];
      var listHTML = ''
      var globalAlerts = data['global']
      var locationAlerts = data['locations']
      // Iterate through all alertlist divs
      alertlistdivs.forEach(function(alertdiv) {
        console.log(alertdiv.parentElement.dataset.id);
        var divLocId = alertdiv.parentElement.dataset.id
        var divLocType = alertdiv.parentElement.dataset.loctype
        listHTML = ''

        $.each(locationAlerts, function(key, val) {
            if (val.type == divLocType) {
                if (divLocId == 'all') {
                    var map_id = val.map_id.replace(/[& ]/g, '+')
                    listHTML += "<ul class='alerts' id='" + map_id + "'><h4><a href='" + url_base + "/#/?" + val.type + "=" + map_id + "' target='_top'>" + val.name + "</a></h4>"
                    listHTML += drawAlerts(val.alerts)
                    listHTML += "</ul>"
                } else if (val.id == divLocId) {
                    listHTML = drawAlerts(val.alerts)
                    if (listHTML != '') {
                        listHTML = "<ul class='alerts' id='" + divLocId + '-' + divLocType + "'>" + listHTML + '</ul>'
                    }
                    return false
                }
            }
        })

        listHTML = listHTML ? listHTML : '<ul class="alerts"><li class="bg_open"><span class="label_open">NO ISSUES</span> Open during normal hours.</li></ul>'

        alertdiv.innerHTML = listHTML
      })
        
    })
})
