var serverPath = 'http://localhost:1399';

$(document).ready(function(){
    
   $.ajax({
      url: serverPath + '/log/all',
      type: 'GET',
      success : function(logs) {
          var logsDiv = "#logsDiv ul";
          $('<ul />')
              .addClass("collection with-header")
              .appendTo('#logsDiv');
          
          $.each(logs, function(i) {

              var a = $('<p />')
                  .addClass("secondary-content")
                  .text(logs[i].activity.time);

              var div = $('<div />')
                  .text(logs[i].activity.text)
                  .append(a);

              var li = $('<li/>')
                  .addClass("collection-item")
                  .append(div)
                  .appendTo(logsDiv);
          });
      },
      failure : function() {
         console.log("Failure!");
      },
      error : function() {
         console.log('Error!');
      }
   });

    // Display up to 4 applications on the main page
    $.ajax({
        url : serverPath + '/application/all',
        type: 'GET',
        success : function (applications) {
            var colors = ['teal', 'indigo', 'amber', 'blue'];
            var appsDiv = '#3appsDiv';
            var n = applications.length > 3 ? 3 : applications.length;

            for(var i=0; i<n; ++i) {
                var _id = applications[i]._id;

                var aTag = $('<a />')
                    .addClass("mdl-card__title-text")
                    .attr('id', _id)
                    .attr('href', '/application/' + _id)
                    .text(applications[i].applicationID);
                
               var divTag = $('<div />')
                    .addClass("mdl-card__title mdl-card--expand mdl-color--" + colors[i%4] + "-300 application-list")
                    .append(aTag);
                
                $(appsDiv).append(divTag);

                /*// Register on click handler
                $('#' + _id).on('click', function(e) {
                    e.preventDefault();
                    
                })*/

                
            }

          /*  $('<div class="mdl-card__actions mdl-card--border">' +
                '<a href="#" class="mdl-button mdl-js-button mdl-js-ripple-effect" data-upgraded=",MaterialButton,MaterialRipple">View More Applications' +
                     '<span class="mdl-button__ripple-container">' +
                          '<span class="mdl-ripple"></span>' +
                     '</span>' +
                '</a>' +
            '</div>').appendTo(appsDiv);*/
        }
    });
	
	    // Display all applications on the All Applications page
    $.ajax({
        url : serverPath + '/all/',
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

                /*// Register on click handler
                $('#' + _id).on('click', function(e) {
                    e.preventDefault();
                    
                })*/

                
            }
        }
    });


});