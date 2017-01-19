$(document).ready(function() {
  $('iframe.if-flexible').iFrameResize({log: true, interval: 32, resizeFrom: 'parent', checkOrigin: false});
})

var iframeLoaded = function(e)
{
  console.log(e);
}