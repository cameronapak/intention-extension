import React, { useState, useEffect } from 'react'
import { Clock, CheckCircle } from 'lucide-react'

function App() {
  const [intention, setIntention] = useState('')
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    chrome.storage.local.get(['intention', 'time', 'isRunning'], (result) => {
      if (result.intention) setIntention(result.intention)
      if (result.time) setTime(result.time)
      if (result.isRunning) setIsRunning(result.isRunning)
    })
  }, [])

  const handleSetIntention = () => {
    chrome.storage.local.set({ intention, time, isRunning: true })
    setIsRunning(true)
    chrome.runtime.sendMessage({ action: 'startTimer', time })
  }

  const handleTimeChange = (newTime: number) => {
    setTime(newTime)
  }

  return (
    <div className="w-80 p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Intention Setter</h1>
      {!isRunning ? (
        <>
          <input
            type="text"
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            placeholder="Set your intention"
            className="w-full p-2 mb-4 border rounded"
          />
          <div className="mb-4">
            <p className="mb-2">Select time:</p>
            {[2, 5, 15, 25].map((mins) => (
              <button
                key={mins}
                onClick={() => handleTimeChange(mins)}
                className={`mr-2 px-3 py-1 rounded ${
                  time === mins ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {mins} mins
              </button>
            ))}
          </div>
          <button
            onClick={handleSetIntention}
            className="w-full bg-green-500 text-white p-2 rounded flex items-center justify-center"
            disabled={!intention || !time}
          >
            <CheckCircle className="mr-2" />
            Set Intention
          </button>
        </>
      ) : (
        <div className="text-center">
          <p className="mb-4">Current Intention: {intention}</p>
          <div className="flex items-center justify-center text-3xl">
            <Clock className="mr-2" />
            <span>{time} mins remaining</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default App