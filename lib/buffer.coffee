window.carrega = (url, processa) ->
  request = new XMLHttpRequest()
  request.open 'GET', "../assets/#{url}", true
  request.responseType = 'arraybuffer';

  # Decode asynchronously
  request.onload = ->
    context.decodeAudioData request.response, (theBuffer) ->
      alert "Carregado #{buffer}"
      source = context.createBufferSource()
      source.buffer = theBuffer
      source.connect context.destination
      processa source
    
  request.send()
