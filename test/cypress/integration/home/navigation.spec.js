import * as ctx from  '../../../../quasar.conf.js'

describe('Navigation', () => {
  beforeEach(() => {
    indexedDB.deleteDatabase('firebaseLocalStorageDb')
    cy.visit('/')
  })

  it('should go between Chat and People view', () => {
    cy.contains('Login').click()
    cy.login('test@email.com', 'pass123')
    cy.contains('Home')
    cy.contains('People').should('exist')

    cy.getLabel('Chat Navigation').click()
    cy.contains('Chats here').should('exist')

    cy.getLabel('People Navigation').click()
    cy.contains('People here').should('exist')

    cy.getLabel('Chat Navigation').click()
    cy.contains('Chats here').should('exist')
  })

})
