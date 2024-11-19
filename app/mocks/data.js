export const moneyChartData = () => {
  // Helper function to format date to string
  const formatDate = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  };

  const data = [];
  const startDate = new Date(); // Start from today
  startDate.setHours(0, 0, 0, 0); // Set to beginning of day

  // End date is one year from today minus one day
  const endDate = new Date(startDate);
  endDate.setFullYear(startDate.getFullYear() + 1);
  endDate.setDate(endDate.getDate() - 1);

  let currentDate = new Date(startDate);

  // Base values for smoother transitions
  let baseActual = 5000;
  let baseMax = 5500;

  while (currentDate <= endDate) {
    // Generate random variations within a smaller range (-200 to +200)
    const actualVariation = Math.random() * 400 - 200;
    const maxVariation = Math.random() * 400 - 200;

    // Update base values with small variations
    baseActual += actualVariation;
    baseMax += maxVariation;

    // Keep values within desired range (e.g., 4000-6000)
    baseActual = Math.max(4000, Math.min(6000, baseActual));
    baseMax = Math.max(4500, Math.min(6500, baseMax));

    const monthName = currentDate.toLocaleString("en-US", { month: "long" });
    data.push({
      name: monthName,
      fullDate: formatDate(currentDate),
      dateValue: currentDate.getTime(),
      actual: Math.round(baseActual),
      max: Math.round(baseMax),
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};
