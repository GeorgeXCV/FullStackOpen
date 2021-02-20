describe('Blog app', function() {

  const user = { 
    username: 'Test',
    name: 'Test User',      
    password: 'test'    
  }    

  beforeEach( function() {    
    cy.request('POST', 'http://localhost:3001/api/testing/reset')    
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')       
  })

  it('Login form displayed', function() {
    cy.contains('Login')
  })

  describe('Login', function() {

    it('Successful Login', function() {
      cy.get('input[name="Username"]').type(user.username)
      cy.get('input[name="Password"]').type(user.password)
      cy.get('.loginButton').click()  
      cy.get('.notification').contains('Successfully logged in!')
    })

    it('Invalid Login', function() {
      cy.get('input[name="Username"]').type(user.username)
      cy.get('input[name="Password"]').type('123')
      cy.get('.loginButton').click()
      cy.get('.error').contains('Wrong Credentials').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('New Blog', function() {
    const testBlog = {
      title: "Charmander Blog",
      author: "Charmander",
      url: "https://www.pokemon.com/uk/pokedex/charmander",
      likes: 10
    }

    beforeEach(function() {      
      cy.get('input[name="Username"]').type(user.username)
      cy.get('input[name="Password"]').type(user.password)
      cy.get('.loginButton').click()  
    })

    it('Create a Blog', function() {
      cy.contains('New Blog').click()
      cy.get('input[name="Title"]').type(testBlog.title)
      cy.get('input[name="Author"]').type(testBlog.author)
      cy.get('input[name="URL"]').type(testBlog.url)
      cy.get('.submitButton').click()
      cy.get('.notification').contains(`A new blog: ${testBlog.title} by ${testBlog.author} added`)
      cy.get('.headline').contains(testBlog.title)
    })
  })

  describe('Existing Blog', function() {
      const testBlog = {
        title: "Charmander Blog",
        author: "Charmander",
        url: "https://www.pokemon.com/uk/pokedex/charmander",
        likes: 19
      }

      const otherTestBlog = {
        title: "Eevee Blog",
        author: "Eevee",
        url: "https://www.pokemon.com/uk/pokedex/eevee",
        likes: 9
      }

      beforeEach(function() {      
        cy.login(user)
        cy.createBlog(testBlog)
        cy.createBlog(otherTestBlog)
      })
    
      it('Like a Blog', function () {
        cy.get('.view').eq(0).click()
        cy.get('.addLike').click()
        cy.get('.likes').contains(testBlog.likes + 1)
      })

      it('Delete a blog', function () {
        cy.get('.view').eq(0).click()
        cy.get('.delete').click()
        cy.contains(`${testBlog.title} ${testBlog.author}`).should('not.exist')
      })
      
      it('Blogs sorted by most likes', function() {
        cy.get('.headline').eq(0).contains(testBlog.title)
      })
  })
})