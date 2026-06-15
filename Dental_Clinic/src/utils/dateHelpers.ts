export const formatLocalDate = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

export const getToday = (): string => {
  return formatLocalDate(new Date());
};

export const getTomorrow = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return formatLocalDate(tomorrow);
};

export const getDateOnly = (date: string): string => {
  return date.split("T")[0];
};

export const getMonthOnly = (date: string): string => {
  return getDateOnly(date).slice(0, 7);
};

export const getCurrentMonth = (): string => {
  return getToday().slice(0, 7);
};
