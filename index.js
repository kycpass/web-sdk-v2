import SDKFrameUrl from './frameUrl';
let iFrame;

//fallback handlers
const eventHandlers = {
  onSuccess: () => console.log('No success handler found!'),
  onError: (err) => console.error('ERROR', err)
}

const mount = (params) => {
  const {
    containerId,
    onLoad,
    onSuccess,
    onError,
    height = 400,
    token
  } = params;

  if(onSuccess) {
    eventHandlers.onSuccess = onSuccess
  }

  if(onError) {
    eventHandlers.onError = onError
  }

  const iFrameContainer = document.getElementById(containerId);

  if(!iFrameContainer) {
    throw new Error(`No container found - ${containerId}`)
  }

  const iFrameId = `${containerId}--sdk-iframe`;

  iFrameContainer.innerHTML = `<iframe
      id="${iFrameId}"
      width="100%"
      height="${height}"
      src=${SDKFrameUrl(token)}
      style="border: 0px;">
  </iframe>`

  iFrame = document.getElementById(iFrameId);
  iFrame.onload = () => {
    onLoad && onLoad();
  }

  setupListeners(eventHandlers);
}

//helper funcrions

const sendToIframe = ({ eventType, data, targetOrigin = '*' }) =>{
  if(!iFrame) {
    throw new Error(`Your frame is not loaded yet. Call mount first!`)
  }

  iFrame.contentWindow.postMessage({
      eventType,
      data
  }, targetOrigin)
}

const setupListeners = (eventHandlers) => {
  window.addEventListener('message', ({data: { eventType, data }}) => {
    // NOTE: check if it's a setheight event
    if(eventType == 'setHeight') {
      setHeight(data.height);
    }
    // expecting an eventType < onSuccess|onError > from sdk frame
    const handler = eventHandlers[eventType];
    handler && handler(data);
  })
}

const setHeight = (height) =>{
  iFrame.style.height = height
}


console.log(`Entify SDK version: ${ENFY_VERISON}`);

export default {
  mount,
  setHeight
};
