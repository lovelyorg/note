// console.log(location);
const $ = (selector) => document.querySelectorAll(selector)

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  let result
  switch (request.cmd) {
    case 'eop-download':
      result = eopDownload()
      break
    default:
      break
  }
  console.log(request.cmd, result)
  sendResponse(result)
})

function eopDownload() {
  try {
    let pageCount = Array.from(new Set(Array.from($('.EOPSingleStaveNO')).map((m) => m.textContent))).length
    let name = $('.breadcrumb')[0].children[$('.breadcrumb')[0].children.length - 1].innerText
    console.log('页数:' + pageCount)
    console.log('name:', name)
    let src1 = $('.img-responsive.DownMusicPNG')[0].src
    for (let i = 1; i <= pageCount; i++) {
      let src = src1.replace(/\d+\./, i + '.')
      console.log(src)
      let aa = document.createElement('a')
      aa.href = src
      aa.download = `${name}-${i}`
      aa.click()
    }
    return {}
  } catch (e) {
    console.error(e)
    return { errorMsg: 'error ~' }
  }
}
