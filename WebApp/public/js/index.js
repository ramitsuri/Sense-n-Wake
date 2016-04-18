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
});