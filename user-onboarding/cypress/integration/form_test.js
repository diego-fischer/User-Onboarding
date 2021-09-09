const nameEg = 'Diego Fischer'
const emailEg = 'diego@carupi.com'
const passEg = '123@change!'

const nameInput = () => cy.get('#name')
const emailInput = () => cy.get('#email')
const passInput = () => cy.get('#pass')
const termsInput = () => cy.get('#terms')
const submitBtn = () => cy.get('#submitBtn')

describe('Form Tests', () => {
  it('Get the `Name` input and type a name in it.', () => {
    const baseUrl = 'http://localhost:3000/'
    cy.visit(baseUrl)

    nameInput().should('have.value', '').type(nameEg)
    // .should('have.value', nameEg)
  })

  it('Use an assertion to check if the text inputted contains the name you provided', () => {
    nameInput().should('have.value', nameEg)
  })

  it('Get the `Email` input and type an email address in it', () => {
    emailInput()
      .should('have.value', '')
      .type(emailEg)
      .should('have.value', emailEg)
  })

  it('Get the `password` input and type a password in it', () => {
    passInput()
      .should('have.value', '')
      .type(passEg)
      .should('have.value', passEg)
  })

  it('Check to see if a user can check the terms of service box', () => {
    termsInput().click().trigger('click')
  })

  it('Check to see if a user can submit the form data', () => {
    submitBtn().click().trigger('submit')
  })

  it('Check for form validation if an input is left empty', () => {
    nameInput().should('have.value', '')
    emailInput().should('have.value', '')
    passInput().should('have.value', '')
    // termsInput().should('be.unchecked')
    termsInput().should('have.value', false)
  })
})
