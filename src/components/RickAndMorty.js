import React, { useState } from 'react'

export const RickAndMorty = () => {
  const [results, setResults] = useState();

  const API = 'https://rickandmortyapi.com/api/'

  const fetchApi = (value) => {
    return fetch(value)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setResults(data)
      })
      .catch((error) => console.error('Error', error))
  }

  const handleClick = (event) => {
    const value = event.target.name
    fetchApi(API + value)
  }

  const handlePage = (event) => {
    const value = event.target.name
    value === 'next' ? fetchApi(results.info.next) : fetchApi(results.info.prev)
  }

  return (
    <div>
      <input type="submit" name="character" value="Character" onClick={handleClick} />
      <input type="submit" name="location" value="Location" onClick={handleClick} />
      <input type="submit" name="episode" value="Episode" onClick={handleClick} />
      <ul>
        {results &&
          results.results.map((result, index) => <li key={index}>{result.name}</li>)
        }
      </ul>
      {
        results.info.next !== null &&
        <input type="submit" name="next" value="Next" onClick={handlePage} />
      }
      {
        results.info.prev !== null &&
        <input type="submit" name="prev" value="Previous" onClick={handlePage} />
      }
    </div>
  )
}
