var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

$('document').ready(function(){
    $('form input').change(function () {
      $('form p').text(this.files.length + " file(s) selected");
      console.log(this.files)
    });
  });

// window.onload = function () { 
//   document.querySelector('form input').onchange = function(){
//     console.log(this)
//     document.querySelector('form p').innerHTML = 'dfsd'
//   }
// }