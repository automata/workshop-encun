window.show = (a, b) ->
        alert $("##{a}").html()
        $(document).ready ->
                $("body").append ->
                        $("<pre></pre>").append ->
                                $("<code></code>").html $("##{a}").html()

