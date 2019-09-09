import * as ctx from  '../../../../quasar.conf.js'

describe('Login', () => {
  beforeEach(() => {
    indexedDB.deleteDatabase('firebaseLocalStorageDb')
    cy.visit('/')
  })

  it('should go to login page', () => {
    cy.get('body').contains('Login').click()
    cy.contains('Your password')
    cy.contains('Your email')
  })

  it('should login as test account', () => {
    cy.get('body').contains('Login').click()
    cy.getLabel('Your email *').click().type('test@email.com')
    cy.getLabel('Your password *').click().type('pass123')
    cy.get('body').contains('Submit').click()
    cy.get('body').contains('Login').should('not.exist')
  })

  it('should display error popover if failed login', () => {
    cy.get('body').contains('Login').click()
    cy.getLabel('Your email *').click().type('badEmail@email.com')
    cy.getLabel('Your password *').click().type('pass123')
    cy.get('body').contains('Submit').click()
    cy.get('body').contains('There is no user record corresponding to this identifier.').should('exist')
  })

  it('should clear form if hit reset', () => {
    cy.get('body').contains('Login').click()
    cy.getLabel('Your email *').click().type('test@email.com')
    cy.getLabel('Your password *').click().type('pass123')
    cy.contains('Reset').click()
    cy.contains('test@email.com').should('not.exist')
    cy.contains('pass123').should('not.exist')
  })

  it('should logout', () => {
    cy.get('body').contains('Login').click()
    cy.getLabel('Your email *').click().type('test@email.com')
    cy.getLabel('Your password *').click().type('pass123')
    cy.get('body').contains('Submit').click()
    cy.get('body').contains('Chats').should('exist')
    cy.get('body').contains('Login').should('not.exist')
  })

})
