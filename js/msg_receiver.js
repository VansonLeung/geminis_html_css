function receiver(message) {
    // var trusteddomain = "http://fiddle.jshell.net";
    // if (message.origin == trusteddomain) 
    {
    	var msg = JSON.parse(message.data);


        /**
         * function: change a particular iframe's URL inside the page
         * action: iframe_change_url
         * target: iframe ID
         * url: URL of the iframe to change to
         */
    	if (msg.action === "iframe_change_url")
    	{
		    var y = document.body.scrollTop; // save parent y to undo jump to top of IFRAME

		    var iframe = document.getElementById(msg.target).contentWindow;
		    iframe.location.href = msg.url;

		    document.body.scrollTop = y; // reset y

    	}


        /**
         * function: refresh a particular iframe inside the page
         * action: iframe_refresh
         * target: iframe ID
         */
    	else if (msg.action === "iframe_refresh")
    	{
    		document.getElementById(msg.target).contentWindow.location.reload(true);
    	}


        /**
         * function: scroll page to element by element ID
         * action: jump_to_element
         * target: element ID
         */
        else if (msg.action === "jump_to_element")
        {
            var e = document.getElementById(msg.target);
            if (!!e && e.scrollIntoView) 
            {
                e.scrollIntoView();
            }
        }


        /**
         * function: scroll page to element by height pixel
         * action: jump_by_px
         * target: height in integer (or a number / string without suffix "px")
         */
        else if (msg.action === "jump_by_px")
        {
            var y = document.body.scrollTop;
            var px = Number(msg.target);
            y += px;
            document.body.scrollTop = y;
        }


        /**
         * function: trigger Geminis to pop-up an iframe with URL
         * action: popup_url
         * target: iframe popup height in string format with "px" suffix e.g.: "500px"
         * url: pop-up URL
         */
        else if (msg.action === "popup_url")
        {
            window.popupIframe(msg.url, msg.target);
        }



        /**
         * function: trigger Geminis to pop-up an iframe with URL
         * action: popup_url
         * target: iframe popup height in string format with "px" suffix e.g.: "500px"
         * url: pop-up URL
         */
        else if (msg.action === "popup_url_fullscreen")
        {
            window.popupIframe(msg.url, msg.target, true, true);
        }



        /**
         * function: trigger Geminis to pop-up an iframe with URL
         * action: close_popup
         * target: iframe popup height in string format with "px" suffix e.g.: "500px"
         * url: pop-up URL
         */
        else if (msg.action === "close_popup")
        {
            window.closePopupIframe();
        }




        /**
         * function: trigger Geminis page to run keep-alive
         * action: keep_alive_gem
         */
        else if (msg.action === "keep_alive_gem")
        {
            $.post("/api/session/api_sso_keepalive");
        }

        /**
         * function: trigger Geminis page to run keep-alive
         * action: keep_alive_gem
         */
        else if (msg.action === "heart_beat_gem")
        {
            $.post("/api/session/api_sso_heartbeat");
        }


        /**
         * function: redirect the page to another url
         * action: redirect_to_url
         * url: URL of the page to be redirected to
         */
    	else if (msg.action === "redirect_to_url")
    	{
    		window.location.href = msg.url;
    	}


        /**
         * function: refresh the whole page
         * action: refresh
         */
    	else if (msg.action === "refresh")
    	{
    		window.location.reload(true);
    	}
    }
}

window.addEventListener('message', receiver, false);
