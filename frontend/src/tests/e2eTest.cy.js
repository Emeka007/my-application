describe("CRUD App E2E Test", () => {
    it("Loads the app and adds an item", () => {
      cy.visit("http://localhost:3000"); // Ensure your React app is running
  
      // Type into input fields
      cy.get("input[placeholder='Enter Name']").type("Test Item");
      cy.get("input[placeholder='Enter Description']").type("This is a test");
  
      // Click "Add Item" button
      cy.contains("Add Item").click();
  
      // ✅ Wait for the new item to appear in the list
      cy.contains("Test Item - This is a test", { timeout: 10000 }).should("exist");
    });
  });
  