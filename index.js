import SDKFrameUrl from './frameUrl';
let iFrame;

//fallback handlers
const eventHandlers = {
  onSuccess: () => console.log('No success handler found!'),
  onError: (err) => console.error('ERROR', err),
  setHeight: (data) => setHeight(data.height)
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
  iFrame = getiFrame({iFrameId, height, token, onLoad});
  iFrameContainer.appendChild(iFrame);

  setupListeners(eventHandlers);
}

//helper function

const getiFrame = ({iFrameId, height, token, onLoad}) => {
    const ifrm = document.createElement('iframe');
    ifrm.setAttribute('id', iFrameId);
    ifrm.setAttribute('src', SDKFrameUrl(token));
    ifrm.style.width = '100%';
    ifrm.style.height = `${height}px`;
    ifrm.style.border = '0px';
    ifrm.onload = onLoad && onLoad();
    return ifrm
}

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
