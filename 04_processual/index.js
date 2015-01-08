define(["./steller_amd"], function(steller){
    return function(time, middleware){
        var sh = new steller.Scheduler(new steller.AudioContext);

        // User syntesis
        var jsn = sh.models.jsnode({
            numberOfInputs: 2,
            numberOfOutputs: 2,
            bufferLength: 512,
            audioParams: {
                gain: 1,
            },
            onaudioprocess: function (event) {
                l = event.inputs[0]
                r = event.intputs[1]
                _l = event.outputs[0]
                _r = event.outtputs[1]
            
                for(var t=0; t<l.length; t++){
                    l[t] = _l[t]
                    r[t] = _r[t];
                    _l[t] += middleware(t);
                    _r[t] += middleware(t)
                }
            }
            
        });
        
        //Conect to speakers
        jsn.connect(context.destination);
        
        // Play during certain time
        return sh.play(sh.fire(function(clock){
            jsn.start(clock.t);
            jsn.stop(clock.t + time);
        }));
    }
});
    
