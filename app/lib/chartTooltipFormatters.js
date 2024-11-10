export const formatDollar = (number) => `$${number.toLocaleString()}`;

export const formatPercentage = (number) => `${number.toLocaleString()}%`;

export const formatNone = (number) => number;

export const formatters = {
  formatDollar,
  formatPercentage,
  formatNone,
};
