const totalLikes = require("../utils/list_helper").totalLikes;

describe("total likes", () => {
  test("of an empty blog list is zero", () => {
    const emptyList = [];
    expect(totalLikes(emptyList)).toBe(0);
  });

  test("of one blog is the likes of that blog", () => {
    const listWithOneBlog = require("./testLists").listWithOneBlog;
    expect(totalLikes(listWithOneBlog)).toBe(5);
  });

  test("of multiple blogs is the sum of their likes", () => {
    const blogsList = require("./testLists").blogsList;
    expect(totalLikes(blogsList)).toEqual(36);
  });
});

module.exports = totalLikes;
