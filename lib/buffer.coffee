window.carrega = (url, processa) ->
  request = new XMLHttpRequest()
  request.open 'GET', "../assets/#{url}", true
  request.responseType = 'arraybuffer';

  # Decode asynchronously
  request.onload = ->
    window.context.decodeAudioData request.response, (theBuffer) ->
      alert "Carregado #{url}"
      source = window.context.createBufferSource()
      source.buffer = theBuffer
      source.connect window.context.destination
      processa source
    
  request.send()
