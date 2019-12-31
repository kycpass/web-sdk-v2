const SDKFrameUrl = (token) => {
  if(process.env.NODE_ENV == 'development') {
    return `${FRAME_URL}/?token=${token}`
  }else {
    return getSDKFrameProdURL(token)
  }
}

const getSDKFrameProdURL = (token) => {
  const majorVersion = ENFY_VERISON.split('.')[0];
  const folder = `v${majorVersion}`
  return `${FRAME_URL}/${folder}/?token=${token}`
}

module.exports = SDKFrameUrl
