const nameInput = () => cy.get('#name')
const emailInput = () => cy.get('#email')
const passInput = () => cy.get('#pass')
const termsInput = () => cy.get('#terms')

describe('Form Tests', () => {
  it('Get the `Name` input and type a name in it.', () => {
    const baseUrl = 'http://localhost:3000/'
    cy.visit(baseUrl)
    const nameEg = 'Diego Fischer'
    nameInput()
      .should('have.value', '')
      .type(nameEg)
      .should('have.value', nameEg)
  })

  // Use an assertion to check if the text inputted contains the name you provided (Hint: use the .should assertion)
  // Get the `Email` input and type an email address in it
  // Get the `password` input and type a password in it
  // Set up a test that will check to see if a user can check the terms of service box
  // Check to see if a user can submit the form data
  // Check for form validation if an input is left empty
})
