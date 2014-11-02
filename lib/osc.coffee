osc = (type, freq, detune) ->
        oscillator = context.createOscillator()
        oscillator.connect context.destination
   
        # Play a sine type curve at A4 frequency (440hz).
        oscillator.frequency.value = freq
        oscillator.detune.value = detune
        
        # Note: this constant will be replaced with "sine".
        oscillator.type = if type is "sine" or type is "sawtooth" or type is "triangle" or type is "square" then type else alert "Not valid oscillator"
        oscillator.start 0

window.sin = (freq, detune) -> osc "sine", freq, detune
window.saw = (freq, detune) -> osc "sawtooth", freq, detune
window.tri = (freq, detune) -> osc "triangle", freq, detune
window.sqr = (freq, detune) -> osc "square", freq, detune
