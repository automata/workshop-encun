window.init = ->
        window.contextClass = (window.AudioContext or window.webkitAudioContext or window.mozAudioContext or window.oAudioContext or window.msAudioContext)
        if contextClass
        # Web Audio API is available.
                context = new contextClass();
        else 
        # Web Audio API is not available. Ask the user to use a
        # supported browser.
                alert "BZIU!"
