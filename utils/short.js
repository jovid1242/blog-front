export const short = {
  shortText: (text, limit) => {
    if (typeof text !== "string") {
      return text;
    } else {
      if (String(text).split("").length > limit) {
        return text.substr(0, limit) + " ...";
      }
    }
  },
};
