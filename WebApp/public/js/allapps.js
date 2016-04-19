var serverPath = 'http://' + window.location.hostname + ':' + window.location.port;

$(document).ready(function(){

    // Display all applications on the All Applications page
    $.ajax({
        url : serverPath + '/application/all/',
        type: 'GET',
        success : function (applications) {
            var colors = ['teal', 'indigo', 'amber', 'blue'];
            var allAppsDiv = '#allApps';
            var n = applications.length;

            for(var i=0; i<n; ++i) {
                var _id = applications[i]._id;

                var aTag = $('<a />')
                    .addClass("mdl-card__title-text")
                    .attr('id', _id)
                    .attr('href', '/application/' + _id)
                    .text(applications[i].applicationID);

                var appDivTag = $('<div />')
                    .addClass("mdl-card__title mdl-card--expand mdl-color--" + colors[i%4] + "-300 application-list")
                    .append(aTag);

                $(allAppsDiv).append(appDivTag);
            }
        },
        error : function() {
            alert('Error!!');
        },
        failure : function () {
            alert('failure');
        }
    }); 
});
