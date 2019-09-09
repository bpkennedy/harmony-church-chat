// let firebase = require('firebase')
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

Cypress.Commands.add('login', (email, pass) => {
  cy.getLabel('Your email *').click().type(email)
  cy.getLabel('Your password *').click().type(pass)
  cy.contains('Submit').click()
})

Cypress.Commands.add('logout', () => {
  cy.contains('Login').should('not.exist')
  cy.getLabel('User Avatar').click()
  cy.contains('Logout').click()
})

Cypress.Commands.add('getLabel', label => {
  cy.get(`*[aria-label="${label}"]`)
})

Cypress.Commands.add('getByPlaceholder', placeholder => {
  cy.get('*[placeholder="' + placeholder + '"]')
})

// Cypress.Commands.add('clearAuth', () => {
//   return new Cypress.Promise(async (resolve) => {
//     const config = {
//       apiKey: Cypress.env('FIREBASE_API_KEY'),
//       authDomain: Cypress.env('FIREBASE_AUTH_DOMAIN'),
//       databaseURL: Cypress.env('FIREBASE_DATABASE_URL'),
//       projectId: Cypress.env('FIREBASE_PROJECT_ID'),
//       storageBucket: Cypress.env('FIREBASE_STORAGE_BUCKET'),
//       messagingSenderId: Cypress.env('FIREBASE_MESSAGING_SENDER_ID')
//     }
//     await firebase.auth().signOut()
//     await firebase.app().delete()
//     firebase.initializeApp(config)
//     resolve()
//   })
// })

// these two commands let you persist local storage between tests
const LOCAL_STORAGE_MEMORY = {}

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key]
  })
})

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key])
  })
})

// CHAINABLE QUASAR INPUT FIELD TYPES
// usage:
//
// cy.get('[data-cy=target-element]').quasar('text', '');
//
// todo: make sure that this is still compliant with 1.0
//
Cypress.Commands.add('testRoute', (route) => {
    cy.location().should((loc) => {
      expect(loc.hash).to.contain(route)
    })
})

Cypress.Commands.add('quasar', { prevSubject: 'element' }, (subject, mode, option) => {
  if (mode === 'select') {
    cy.wrap(subject)
      .invoke('show')
      .click({ force: true })
      .then(() => {
        cy.get('.q-popover')
          .contains(option)
          .click()
      })
  } else if (mode === 'grid') {
    cy.wrap(subject).within(() => {
      cy.get('input').click({ force: true, multiple: true });
    })
  } else if (mode === 'tag-list') {
    Object.keys(option)
    .forEach((x) => {
      cy.wrap(subject)
        .within(() => {
          cy.get('input')
            .first()
            .type(`${option[x]}{enter}`)
      })
    })
  } else {
    cy.wrap(subject)
      .invoke('show')
      .within(($subject) => { // eslint-disable-line
        switch (mode) {
          case 'date':
          case 'text':
          case 'email':
            cy.get('input:first')
              .type(option)
              .should('have.value', option)
            break;
          case 'radio':
          case 'checkbox':
            cy.contains(option)
              .click()
            break
          default:
            break
        }
    })
  }
})

// Cypress.Commands.add('loadStore', () => {});
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
