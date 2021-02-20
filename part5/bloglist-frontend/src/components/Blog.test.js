import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog Component', () => {
    let component
    const handleAddLike = jest.fn()
    const handleDeleteBlog = jest.fn()
    const testBlog = {
        id: "602ab01950a61911c063f974",
        title: "Pikachu Blog",
        author: "Pikachu",
        url: "www.pikachu.com",
        likes: 3,
        user: {
            username: "Temp",
            name: "Test",
            id: "0000000000"
        }
    }

    beforeEach(async () => {
        component = render (
        <Blog
            key={testBlog.id}
            blog={testBlog}
            handleAddLike={handleAddLike}
            handleDeleteBlog={handleDeleteBlog}
        />
        )
      })

    test('Blog Title and Author are only values displayed by default', () => {

        const preview = component.container.querySelector('.headline')
        expect(preview).toHaveTextContent(testBlog.title)
        expect(preview).toHaveTextContent(testBlog.author)
        const url = component.container.querySelector('.url')
        const likes = component.container.querySelector('.likes')
        const user = component.container.querySelector('.username')
        expect(url).not.toBeInTheDocument()
        expect(likes).not.toBeInTheDocument()
        expect(user).not.toBeInTheDocument()
    })

    test('URL and Likes displayed after clicking View button', () => {
        const viewButton = component.container.querySelector('.view')
        fireEvent.click(viewButton)
        const url = component.container.querySelector('.url')
        const likes = component.container.querySelector('.likes')
        expect(url).toHaveTextContent(testBlog.url)
        expect(likes).toHaveTextContent(testBlog.likes)
    })

    test('If Like is clicked twice, event handler is called twice', () => {
        const viewButton = component.container.querySelector('.view')
        fireEvent.click(viewButton)
        const likeButton = component.container.querySelector('.addLike')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)
        expect(handleAddLike.mock.calls.length).toBe(2)
    })
})