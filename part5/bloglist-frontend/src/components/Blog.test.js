import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const user = {
    username: 'Ben'
  }
  const blog = {
    title: 'Test Blog',
    author: 'Ben',
    likes: 100,
    user: user
  }
  const mockLikeHandler = jest.fn()
  const mockRemoveHandler = jest.fn()
  beforeEach(() => {
    component = render(
      <Blog blog={blog} like={mockLikeHandler} remove={mockRemoveHandler} user={user} />
    )
  })

  test('renders blog title and author and doesnt render url or number of likes by default', () => {
    const div = component.container.querySelector('.blogContent')
    expect(div).toHaveTextContent(`${blog.title} ${blog.author}`)

    const divDetail = component.container.querySelector('.blogDetailContent')
    expect(divDetail).toHaveStyle('display: none')
  })

  test('renders blog likes and url when show is pressed', () => {
    const button = component.container.querySelector('.detailsButton')
    fireEvent.click(button)

    const divDetail = component.container.querySelector('.blogDetailContent')
    expect(divDetail).not.toHaveStyle('display: none')
  })

  test('when the like button is pressed twice, the event handler is called twice', () => {
    const button = component.container.querySelector('.likeButton')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})