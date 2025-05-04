export const getDayStampFromDate = (datelike: Date | string) => {
  const date = new Date(datelike);

  const year = date.getFullYear();
  // DD.MM.YYYY (month is counted from 0)
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const stampDateWithoutYear = `${`${day}`.padStart(
    2,
    "0"
  )}.${`${month}`.padStart(2, "0")}`;
  const stamp = `${stampDateWithoutYear}.${year}`;

  return {
    stamp,
    stampDateWithoutYear,
  };
};
