export const formatToHourMinute = (dateInput: Date | string) => {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};
