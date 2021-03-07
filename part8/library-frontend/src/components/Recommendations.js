import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommendations = (props) => {
  const loggedInUser = useQuery(ME)
  const [getBooks, {data}] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (loggedInUser.data) {
        setUser(loggedInUser.data.me)
        getBooks({variables: {genre: loggedInUser.data.me.favoriteGenre } })
    }
  },  [loggedInUser])

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks)
    }
  }, [data])

  
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre <b>{user.favoriteGenre}</b></p>
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
          {books.map(book =>
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

export default Recommendations