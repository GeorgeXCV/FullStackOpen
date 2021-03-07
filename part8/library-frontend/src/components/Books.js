import React , { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState('All Genres')
  const [genres, setGenres] = useState(['All Genres'])
  const [filteredBooks, setFilteredBooks] = useState(['All Genres'])

  useEffect(() => {
    if (result.data) {
      const allBooks = result.data.allBooks
      setBooks(allBooks)
      allBooks.forEach(book => {
         if (book.genres) {
           book.genres.forEach(genre => {
              if (!genres.includes(genre)) {
                  genres.push(genre)
              }
           })
         }
      });
    }
  }, [result])

  useEffect(() => {
    if (genre === 'All Genres') {
      setFilteredBooks(books)
    } else {
      const booksFilter = books.filter((book) => book.genres.includes(genre))
      setFilteredBooks(booksFilter)
    }
  }, [genre, books])

  if (result.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>Books</h2>
      {genres.map(genre =>
            <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
          )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              Author
            </th>
            <th>
              Published
            </th>
          </tr>
          {filteredBooks.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books