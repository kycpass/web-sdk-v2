const SDKFrameUrl = (token) => (
  process.env.NODE_ENV == 'development' ?
  `${FRAME_URL}/?token=${token}`
  :
  getSDKFrameProdURL(token)
)

const getSDKFrameProdURL = (token) => {
  const [ majorVersion ] = ENFY_VERISON.split('.');
  const folder = `v${majorVersion}`
  return `${FRAME_URL}/${folder}/?token=${token}`
}

module.exports = SDKFrameUrl
