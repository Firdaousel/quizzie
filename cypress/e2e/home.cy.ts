describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the home page successfully', () => {
    cy.url().should('include', '/');
  });

  it('should display the main content', () => {
    cy.get('body').should('be.visible');
  });

  it('should have proper page title', () => {
    cy.title().should('not.be.empty');
  });
});
