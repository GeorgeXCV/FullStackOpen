import React from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  const [changeAuthor] = useMutation(EDIT_AUTHOR, {
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_AUTHORS })
      const editAuthor = response.data.editAuthor
      store.writeQuery({
        query: ALL_AUTHORS,
        data: {
          allAuthors: dataInStore.allAuthors.map((author) =>
            author.name === editAuthor.name ? editAuthor : author
          ),
        },
      })
    },
  })

  if (result.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const authors = result.data.allAuthors

  const submit = (event) => {
    event.preventDefault()
    const name = event.target.name.value
    const setBornTo = parseInt(event.target.born.value)
    changeAuthor({ variables: { name, setBornTo } })
    event.target.reset()
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              Born
            </th>
            <th>
              Books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h2>Set Birthyear</h2>
          <form onSubmit={submit}> 
            <select name="name">
              {authors.map((author => {
                return ( 
                  <option key={author.name} value={author.name}>
                    {author.name}
                  </option>
                )
              }))}
            </select>
             Born <input type='number' name='born'/>
            <button type="submit">Update Author</button>
          </form>
      </div>
    </div>
  )
}

export default Authors
