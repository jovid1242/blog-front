export const getAuthors = {
  getAuthor: (users, author) => {
    const username = users.filter((elm) => elm.id === author);
    if (username.length > 0) {
      return username[0];
    }
    return "Ofolio";
  },

  getAuthorName: (users, author) => {
    const username = users.filter((elm) => elm.id === author);
    if (username.length > 0) {
      return username[0].name;
    }
    return "Ofolio";
  },
};
