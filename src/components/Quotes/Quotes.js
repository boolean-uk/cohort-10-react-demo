import './Quotes.css'
import { useState, useEffect } from 'react'

function Quotes () {

  const [quotes, setQuotes] = useState([])

  // should only happen once!!
  // const getQuotes = (e) => {
  useEffect(() => {
    fetch("https://api.breakingbadquotes.xyz/v1/quotes/5")
    .then(res => res.json())
    .then(data => setQuotes(data))
  }, [])
  // }

  return (
    <>
      {
        quotes.map((quote => (
          <div>
            <span>
              {quote.quote} ~ {quote.author}
            </span>
          </div>
        )))
      }
    </>
  )
}

export default Quotes
