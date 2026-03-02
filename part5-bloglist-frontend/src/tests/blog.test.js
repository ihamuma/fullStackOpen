import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

describe("Blog component", () => {
  let component;
  const blog = {
    title: "Test Blog Title",
    author: "Test Blog Author",
    url: "https://testblogurl.com/",
    likes: 5,
    user: {
      id: "testuserid",
      name: "Test User",
    },
  };
  const user = {
    id: "testuserid",
    name: "Test User",
  };
  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} handleLike={mockHandler} handleDelete={mockHandler} />,
    );
  });

  test("renders blog title and author", () => {
    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);
  });

  test("does not render blog url and likes by default", () => {
    const div = component.container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });

  test("renders blog url and likes when view button is clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("View");
    await user.click(button);

    const div = component.container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
    expect(div).toHaveTextContent(blog.url);
    expect(div).toHaveTextContent(`Likes: ${blog.likes}`);
  });

  test("clicking the like button twice calls the event handler twice", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("View");
    await user.click(button);

    const likeButton = screen.getByText("Like");

    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
