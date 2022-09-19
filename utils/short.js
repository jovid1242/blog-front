export const short = {
  shortText: (text, limit) => {
    if (String(text).split("").length > limit)
      return text.substr(0, limit) + " ...";
    return text;
  },
};
