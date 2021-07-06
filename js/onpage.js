jQuery(function ($) {
    var url_base = 'https://map.fpdcc.com'
    url_base = 'https://map-staging.fpdcc.net'
    
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
            html += "<li class='alerts bg_" + classType + "'><span class='label_" + classType + "'>" + alertTypeName + "</span> <strong>" + alert.start_date + " - " + alert.end_date + "</strong>: " + alert.description
            if (alert.link) {
                html += ' <a href="' + alert.link + '">More information ></a>'
            }
            html += "</li>"
        })
        return html
    }

    var fullDate = new Date()
    var twoDigitMonth = ((fullDate.getMonth()+1).length === 1)? ('0' + fullDate.getMonth()+1) : (fullDate.getMonth()+1)
    var currentDate = twoDigitMonth + "/" + fullDate.getDate() + "/" +  fullDate.getFullYear()

    var alertlistdivs = Array.from( document.getElementsByClassName('alertlist'))

    $.getJSON( data_url, function ( data ) {
      var items = [];
      var listHTML = ''
      var globalAlerts = data['global']
      var locationAlerts = data['locations']
      // Iterate through all alertlist divs
      alertlistdivs.forEach(function(alertdiv) {
        var divLocId = alertdiv.parentElement.dataset.id
        var divLocType = alertdiv.parentElement.dataset.loctype
        listHTML = ''

        if (divLocType == 'global') {
            if (globalAlerts.length > 0) {
                listHTML += "<ul class='alerts' id='global'><h2>General Alerts</h2>"
                listHTML += drawAlerts(globalAlerts)
                listHTML += "</ul>"
            } else {
                listHTML = ""
            }
        } else {
            var combinedAlerts = globalAlerts.concat
            $.each(locationAlerts, function(key, val) {
                if (val.type == divLocType) {
                    if (divLocId == 'all') {
                        var map_id = val.map_id.replace(/[& ]/g, '+')
                        listHTML += "<ul class='alerts' id='" + map_id + "'><h3><a href='" + val.web_link + "' target='_top'>" + val.name + "</a></h3>"
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
            if (divLocId != 'all' && globalAlerts.length > 0) {
                listHTML = listHTML + "<ul class='alerts'>" + drawAlerts(globalAlerts) + "</ul>"
            }
            listHTML = listHTML ? listHTML : '<ul class="alerts"><li class="bg_open"><span class="label_open">NO ISSUES</span> <strong>' + currentDate + '</strong>: Open during normal hours.</li></ul>'
        }
        alertdiv.innerHTML = listHTML
      }) 
    })
})
