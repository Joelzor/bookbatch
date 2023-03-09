const colours = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
];

const generateColour = () => {
  const random = Math.floor(Math.random() * colours.length);
  return colours[random];
};

export default generateColour;
