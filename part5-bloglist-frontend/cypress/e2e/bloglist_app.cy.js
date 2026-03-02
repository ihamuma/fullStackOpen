describe("Bloglist app", () => {
  beforeEach(function () {
    cy.resetTestDb();
    cy.createUser({
      name: "Testy Tester",
      username: "tester",
      password: "sekret",
    });
    cy.visit("");
  });

  it("front page can be opened", function () {
    cy.contains("Blogs");
  });

  it("login form is shown", function () {
    cy.contains("Log in to application");
    cy.get("#loginForm")
      .should("contain", "Log in to application")
      .and("contain", "Username")
      .and("contain", "Password")
      .and("contain", "Log in");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("tester");
      cy.get("#password").type("sekret");
      cy.get("#login-button").click();

      cy.contains("Testy Tester logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("tester");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "Wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Testy Tester logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "tester", password: "sekret" });
    });

    it("a new blog can be created", function () {
      cy.contains("Create new").click();
      cy.get("#newBlogTitle").type("Cypress created this");
      cy.get("#newBlogAuthor").type("Cypress");
      cy.get("#newBlogUrl").type("cypress-blog.com");
      cy.get("#createBlog-button").click();

      cy.get("#blogList")
        .should("contain", "Cypress created this")
        .and("contain", "Cypress")
        .and("contain", "cypress-blog.com");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Cypress created this too",
          author: "Cypress as well",
          url: "cypress-blog-2.com",
        });
      });

      it("it can be viewed", function () {
        cy.get("#blog-div").as("newBlog");
        cy.get("@newBlog").contains("View").click();
        cy.get("@newBlog").contains("cypress-blog-2.com");
      });

      it("it can be liked", function () {
        cy.get("#blog-div").as("newBlog");
        cy.get("@newBlog").contains("View").click();
        cy.get("@newBlog").get("#likes-p").contains(0);

        cy.get("@newBlog").contains("Like").click();
        cy.get("@newBlog").get("#likes-p").contains(1);
      });

      it("it can be deleted", function () {
        cy.get("#blog-div").as("newBlog");
        cy.get("@newBlog").contains("View").click();
        cy.get("@newBlog").contains("Delete").click();

        cy.get("#blogList")
          .should("not.contain", "Cypress created this too")
          .and("not.contain", "Cypress as well")
          .and("not.contain", "cypress-blog-2.com");

        cy.get(".message")
          .should("contain", "deleted successfully")
          .and("have.css", "border-style", "solid");
      });

      it("it cannot be deleted by another user", function () {
        cy.createUser({
          name: "Evil Tester",
          username: "evil",
          password: "evil-sekret",
        });
        cy.login({ username: "evil", password: "evil-sekret" });

        cy.get("#blog-div").as("newBlog");
        cy.get("@newBlog").contains("View").click();
        cy.get("@newBlog").should("not.contain", "Delete");
        cy.get("#delete-button").should("not.exist");
      });
    });

    describe("and many blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Blog 1",
          author: "John Doe",
          url: "https://blog1.com",
          likes: 3,
        });
        cy.createBlog({
          title: "Blog 2",
          author: "John Doe",
          url: "https://blog2.com",
          likes: 1,
        });
        cy.createBlog({
          title: "Blog 3",
          author: "John Doe",
          url: "https://blog3.com",
          likes: 2,
        });
        cy.createBlog({
          title: "Blog 4",
          author: "John Doe",
          url: "https://blog4.com",
          likes: 5,
        });
        cy.createBlog({
          title: "Blog 5",
          author: "John Doe",
          url: "https://blog5.com",
          likes: 4,
        });
      });

      it("blogs are ordered by likes", () => {
        cy.get("#blog-div").then((blogs) => {
          let prevLikes = Number.MAX_SAFE_INTEGER;
          for (let i = 0; i < blogs.length; i++) {
            const likeArray = blogs[i].querySelector("#likes-p").textContent.split(" ");
            const blogLikes = parseInt(likeArray[2]);
            expect(blogLikes).to.be.lte(prevLikes);
            prevLikes = blogLikes;
          }
        });
      });
    });
  });
});
