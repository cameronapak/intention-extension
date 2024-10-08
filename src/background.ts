let timer: number | null = null

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startTimer') {
    if (timer) {
      clearInterval(timer)
    }
    let timeLeft = request.time * 60
    timer = setInterval(() => {
      timeLeft--
      chrome.storage.local.set({ time: Math.ceil(timeLeft / 60) })
      if (timeLeft <= 0) {
        clearInterval(timer!)
        chrome.storage.local.set({ isRunning: false, intention: '', time: 0 })
        chrome.tabs.create({ url: 'break.html' })
      }
    }, 1000) as unknown as number
  }
})

chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.frameId === 0) {
    chrome.tabs.sendMessage(details.tabId, { action: 'showIntention' })
  }
})