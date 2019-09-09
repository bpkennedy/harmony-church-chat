import * as ctx from  '../../../../quasar.conf.js'

describe('Login', () => {
  beforeEach(() => {
    indexedDB.deleteDatabase('firebaseLocalStorageDb')
    cy.visit('/')
  })

  it('should go to login page', () => {
    cy.contains('Login').click()
    cy.contains('Your password')
    cy.contains('Your email')
  })

  it('should login as test account', () => {
    cy.contains('Login').click()
    cy.login('test@email.com', 'pass123')
    cy.contains('Login').should('not.exist')
  })

  it('should display error popover if failed login', () => {
    cy.contains('Login').click()
    cy.login('badEmail@email.com', 'pass123')
    cy.contains('Login').should('exist')
    cy.contains('There is no user record corresponding to this identifier.').should('exist')
  })

  it('should clear form if hit reset', () => {
    cy.contains('Login').click()
    cy.getLabel('Your email *').click().type('test@email.com')
    cy.getLabel('Your password *').click().type('pass123')
    cy.contains('Reset').click()
    cy.contains('test@email.com').should('not.exist')
    cy.contains('pass123').should('not.exist')
  })

  it('should logout', () => {
    cy.contains('Login').click()

    cy.login('test@email.com', 'pass123')
    cy.contains('Chats').should('exist')
    cy.contains('Login').should('not.exist')

    cy.logout()
    cy.contains('Chats').should('not.exist')
    cy.contains('Login').should('exist')
  })

})
