const light = {
  background: "#FAFAFA",
  white: "#FFFFFF",
  greyBorder: "#979797",
  placeholder: "#9495A5",
  gray: "#9495A5",
  checkedText: "#D1D2DA",
  text: "#494C6B",
  blue: "#3A7CFD",
  divider: "#E3E4F1",
};

const dark = {
  background: "#171823",
  white: "#25273D",
  greyBorder: "#393A4B",
  placeholder: "#767992",
  gray: "#5B5E7E",
  checkedText: "#4D5067",
  text: "#C8CBE7",
  blue: "#3A7CFD",
  divider: "#393A4B",
};

export const getColors = (theme: "light" | "dark") =>
  theme === "dark" ? dark : light;
