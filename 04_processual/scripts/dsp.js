define(["steller"], function(steller){
    return function(time, middleware){
        var context = new steller.AudioContext()
        var sh = new steller.Scheduler(context);
            
        // User syntesis
        var jsn = sh.models.JSNode({
            numberOfInputs: 0,
            numberOfOutputs: 1,
            bufferLength: 512,
            onaudioprocess: function (event) {
                l = event.outputs[0];

                
                for(var t=0; t<l.length-1; ++t){
                    l[t] += middleware(t);
                }

                return 
                
            }
        });

        //Conect to speakers
        jsn.connect(context.destination);
        
        // Play during certain time
        return sh.play(sh.fire(function(clock){
            jsn.start(clock.t);
            jsn.stop(clock.t + time);
        }));
    };
})
