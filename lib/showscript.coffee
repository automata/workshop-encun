window.show = (a) ->
        #alert $("##{a}").html()
        $(document).ready ->
                $("body").append ->
                        $("<pre></pre>").append ->
                                $("<code></code>").html $("##{a}").html()
