import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import pdf1 from './test.pdf'
import { Document, Page, pdfjs } from 'react-pdf'
import pdfjsWoker from 'react-pdf/dist/umd/pdf.worker.entry'
// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWoker
// pdfjs.GlobalWorkerOptions.workerSrc =
//   'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js'

function App() {
  return (
    <>
      <Timer />
      <Pdf />
    </>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))

// ========================================

function Pdf({ onLoadSuccess }) {
  const [numPages, setNumPages] = useState(null)

  // const worker = new pdfjs.PDFWorker()
  // console.log(worker, pdfjs.PDFWorker.getWorkerSrc())

  const [time, timeS] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      if (!numPages) return
      timeS((x) => {
        if (x < numPages) return x + 1
        clearInterval(timer)
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [numPages])
  return (
    <div>
      <Document
        file={pdf1}
        onLoadSuccess={(x) => {
          setNumPages(x.numPages)
          onLoadSuccess && onLoadSuccess(x)
        }}
      >
        {Array(time)
          .fill('')
          .map((x, i) => (
            <Page key={i} pageNumber={i + 1} />
          ))}
      </Document>
      <p>Page of {numPages}</p>
    </div>
  )
}

function Timer() {
  const [time, timeS] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      timeS((x) => x + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  return (
    <div
      onClick={() => (window.location.href = 'https://www.baidu.com')}
      style={{ position: 'fixed', top: '0', zIndex: 9 }}
    >
      --- {time} ---
    </div>
  )
}
