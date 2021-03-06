import React from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  const [changeAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
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
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
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
