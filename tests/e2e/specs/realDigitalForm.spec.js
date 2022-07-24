// https://docs.cypress.io/api/table-of-contents
const formSelector = "#real-digital-form";
const nameField = "input[name='name']";
const phoneField = "input[name='phone']";
const subjectField = "input[name='subject']";
const sendButton = "button[type='submit']";
const errorMessage = "p.form-textfield-message.error";

describe("Digital Form", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("when we go to the page with form", () => {
    it("the page should be initialized", () => {
      cy.contains("h3", "Some Vue form");
    });

    it("the form should be initialized", () => {
      cy.get(formSelector).find("input").should("have.length", 3);
    });
  });

  describe("when we send the form with invalid fields", () => {
    it("the error should be thrown if name field is invalid", () => {
      cy.get(nameField).type("123");
      cy.get(sendButton).click();
      cy.get(nameField).siblings(errorMessage).should("has.text", "Validation error");
    });

    it("the error should be thrown if phone field is invalid", () => {
      cy.get(phoneField).type("abc");
      cy.get(sendButton).click();
      cy.get(phoneField).siblings(errorMessage).should("has.text", "Validation error");
    });

    it("the error should be thrown if name and phone fields are invalid simultaneously", () => {
      cy.get(nameField).type("123");
      cy.get(phoneField).type("abc");
      cy.get(sendButton).click();
      cy.get(nameField).siblings(errorMessage).should("has.text", "Validation error");
      cy.get(phoneField).siblings(errorMessage).should("has.text", "Validation error");
    });
  });

  describe("when we send the form with valid fields", () => {
    it("the form should be submitted", () => {
      cy.get(nameField).type("John");
      cy.get(phoneField).type("18001231231");
      cy.get(subjectField).type("test");
      cy.get(sendButton).click();

      cy.intercept("POST", "http://httpbin.org/post").as("sendFormRequest");

      cy.wait("@sendFormRequest");

      cy.get(".form-response").should("be.visible");
    });
  });
});
