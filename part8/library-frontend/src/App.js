import React, { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('books')
  const client = useApolloClient()

  const updateCacheWith = (bookAdded) => {
    const includedIn = (set, object) => set.map((book) => book.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, bookAdded)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(bookAdded) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const bookAdded = subscriptionData.data.bookAdded
      window.alert(`Added Book: ${bookAdded.title}`)
      updateCacheWith(bookAdded)
    },
  })

  useEffect(() => {  
    const validToken = localStorage.getItem('library-user-token')  
    if (validToken) {         
        setToken(validToken)      
      }  
  }, []) 
  
  const logout = () => {    
    setToken(null)    
    localStorage.clear()    
    client.resetStore()  
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        {token && (
          <>
          <button onClick={() => setPage('add')}>Add Book</button>
          <button onClick={() => setPage('recommendations')}>Recommended</button>
          <button onClick={() => logout()}>Logout</button>
          </>
        )} 
        {!token && (
          <button onClick={() => setPage('login')}>Login</button>
        )}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      {page === 'add' &&
       <NewBook
         setPage={setPage}
       />
      }
     

      <Recommendations
        show={page === 'recommendations'}
      />

      {page === 'login' && 
       <LoginForm  
        setPage={setPage}
        setToken={setToken} 
        setError={Notify} 
       />
      }
     
    </div>
  )
}

export default App