describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.createUser({
      name: 'Ben',
      username: 'Ben',
      password: 'Ben'
    })
  })

  it('Login form is shown', function() {
    cy.get('#usernameInput').should('exist')
    cy.get('#passwordInput').should('exist')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#usernameInput').type('Ben')
      cy.get('#passwordInput').type('Ben')
      cy.get('#loginButton').click()

      cy.contains('Ben logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#usernameInput').type('Ben')
      cy.get('#passwordInput').type('wrong')
      cy.get('#loginButton').click()

      cy.contains('Wrong Credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Ben logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Ben', password: 'Ben' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()

      cy.contains('Create New')
      cy.get('#titleInput').type('Blog Test')
      cy.get('#authorInput').type('Ben2')
      cy.get('#urlInput').type('google.com')
      cy.get('#blogSubmit').click()

      cy.contains('a new blog Blog Test by Ben2 added')
      cy.contains('Blog Test Ben2')
      cy.get('.likeButton').should('exist')
      cy.get('.detailsButton').should('exist')
    })
    describe('and there is a blog', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'Blog Test', author:'Ben2', url:'twitch.tv', likes:0 })
      })

      it('it can be liked', function() {
        cy.contains('likes 0')
        cy.get('.likeButton').click()
        cy.contains('likes 1')
      })

      it('user who created it can delete it', function() {
        cy.get('.deleteButton').click()
        cy.get('.blogContent').should('not.exist')
      })
      it('user who did not create cannot delete it', function() {
        cy.get('#logoutButton').click()
        cy.createUser({ username:'Jamie', name:'Jamie', password: 'Jamie' })
        cy.login({ username:'Jamie', password: 'Jamie' })

        cy.get('.deleteButton').should('not.exist')
      })

    })
    describe.only('and there are many blogs', function() {
      const blogs = [
        { title: 'Blog Test', author:'Ben2', url:'twitch.tv', likes:5 },
        { title: 'Hey', author:'Jay', url:'youtube.com', likes:2 },
        { title: 'Nope', author:'Alex', url:'youtube.com', likes:10 },
        { title: 'Yay', author:'Jack', url:'youtube.com', likes:15 }
      ]
      const desiredOrder = [15,10,5,2]
      beforeEach(function() {
        cy.createBlog(blogs[0])
        cy.createBlog(blogs[1])
        cy.createBlog(blogs[2])
        cy.createBlog(blogs[3])
      })

      it('the blogs are ordered according to likes', function() {
        const blogsDOM = []
        cy.get('.blogLikes').each((el, index) => {
          expect(parseInt(el.text())).to.equal(desiredOrder[index])
        })

      })
    })
  })


})