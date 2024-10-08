let intentionOverlay: HTMLDivElement | null = null

function createOverlay() {
  intentionOverlay = document.createElement('div')
  intentionOverlay.style.position = 'fixed'
  intentionOverlay.style.top = '10px'
  intentionOverlay.style.right = '10px'
  intentionOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
  intentionOverlay.style.color = 'white'
  intentionOverlay.style.padding = '10px'
  intentionOverlay.style.borderRadius = '5px'
  intentionOverlay.style.zIndex = '9999'
  document.body.appendChild(intentionOverlay)
}

function updateOverlay(intention: string, time: number) {
  if (!intentionOverlay) {
    createOverlay()
  }
  if (intentionOverlay) {
    intentionOverlay.textContent = `Intention: ${intention} | Time left: ${time} mins`
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'showIntention') {
    chrome.storage.local.get(['intention', 'time', 'isRunning'], (result) => {
      if (result.isRunning) {
        updateOverlay(result.intention, result.time)
      }
    })
  }
})