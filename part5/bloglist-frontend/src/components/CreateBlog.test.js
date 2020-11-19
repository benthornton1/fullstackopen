import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlog from './CreateBlog'

describe('<CreateBlog />', () => {
  let component
  const mockCreateBlogHandler = jest.fn()
  beforeEach(() => {
    component = render(
      <CreateBlog createBlog={mockCreateBlogHandler}/>
    )
  })
  test('calls the event handler when a new blog is submitted', () => {
    const titleInput = component.container.querySelector('#titleInput')
    const authorInput = component.container.querySelector('#authorInput')
    const urlInput = component.container.querySelector('#urlInput')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, {
      target: { value: 'test title' }
    })
    fireEvent.change(authorInput, {
      target: { value: 'Ben' }
    })
    fireEvent.change(urlInput, {
      target: { value: 'google.com' }
    })
    fireEvent.submit(form)

    expect(mockCreateBlogHandler.mock.calls).toHaveLength(1)
    expect(mockCreateBlogHandler.mock.calls[0][0].title).toBe('test title')
    expect(mockCreateBlogHandler.mock.calls[0][0].author).toBe('Ben')
    expect(mockCreateBlogHandler.mock.calls[0][0].url).toBe('google.com')
  })
})