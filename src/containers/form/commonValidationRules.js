export const requiredRule = (
  { message } = { message: " " },
  ...additionalRules
) => [
  ...additionalRules,
  {
    required: true,
    message: message,
  },
];
export const numberRule = ({ message } = { message: " " }) => [
  {
    type: "number",
    transform: value => {
      return Number(value) ? Number(value) : 0;
    },
    message,
  },
];
export const dateRule = ({ message } = { message: " " }) => [
  {
    type: "date",
    message,
  },
];
export const urlRule = ({ message } = { message: " " }) => [
  {
    type: "url",
    message,
  },
];
