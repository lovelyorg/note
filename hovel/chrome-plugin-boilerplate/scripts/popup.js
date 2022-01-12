function sendMessageToContentScript(message, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
      if (callback) callback(response)
    })
  })
}

document.getElementById('eop-download').onclick = () => {
  sendMessageToContentScript({ cmd: 'eop-download', value: '---' }, (response) => {
    console.log('来自content的回复：', response)
    setMsg(response)
  })
}

function setMsg(response) {
  let successMsg = ''
  let errorMsg = ''

  if (response.errorMsg) errorMsg = response.errorMsg
  if (response.msg) successMsg = response.msg

  document.querySelector('.msg.success').innerHTML = successMsg
  document.querySelector('.msg.error').innerHTML = errorMsg
}
