$(document).ready(function() {
  $('iframe.if-flexible').iFrameResize({log: true});
})

var iframeLoaded = function(e)
{
  console.log(e);
}