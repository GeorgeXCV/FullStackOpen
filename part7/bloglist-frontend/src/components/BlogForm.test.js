import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('BlogForm Component', () => {
    let component
    const handleBlogChange = jest.fn()

    const testBlog = {
        title: 'Test Title',
        author: 'Test Author',
        url: 'www.test.com'
    }

    beforeEach(async () => {
        component = render (
        <BlogForm handleBlogChange={handleBlogChange}/>
        )
      })

    test('Form calls event handler with right details when blog is created', () => {

        const submitButton = component.container.querySelector('.submitButton')

        const title = component.container.querySelector('input[name="Title"]')
        fireEvent.change(title, { target: { value: testBlog.title }, })

        const author = component.container.querySelector('input[name="Author"]')
        fireEvent.change(author, { target: { value: testBlog.author },})

        const url = component.container.querySelector('input[name="URL"]')
        fireEvent.change(url, { target: { value: testBlog.url },})

        fireEvent.click(submitButton)
    
        expect(handleBlogChange.mock.calls.length).toBe(1)
        expect(handleBlogChange).toHaveBeenCalledWith(testBlog.title, testBlog.author, testBlog.url)
    })
})