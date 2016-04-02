$(document).ready(function(){
  $(".button-collapse").sideNav();
  $('.button-collapse').sideNav({
       menuWidth: 300, // Default is 240
       edge: 'right', // Choose the horizontal origin
       closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
     }
   );
  $(".button-collapse").click(){
    $('.button-collapse').sideNav('show');
  }
})
