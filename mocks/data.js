import { formatDate } from "../lib/formatDate";

export const moneyChartData = () => {
  const data = [];
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setFullYear(endDate.getFullYear() + 1);

  let currentDate = new Date(startDate);

  // Reduced base parameters for smoother changes
  const lines = {
    line1: {
      value: 4000 + Math.random() * 1500,
      trend: Math.random() > 0.5 ? 40 : -40,
      volatility: 0.4 + Math.random() * 0.3,
      seasonalFactor: Math.random() * 0.2,
    },
    line2: {
      value: 5000 + Math.random() * 1500,
      trend: Math.random() > 0.5 ? 50 : -50,
      volatility: 0.5 + Math.random() * 0.3,
      seasonalFactor: Math.random() * 0.25,
    },
    line3: {
      value: 3500 + Math.random() * 1500,
      trend: Math.random() > 0.5 ? 30 : -30,
      volatility: 0.3 + Math.random() * 0.3,
      seasonalFactor: Math.random() * 0.15,
    },
  };

  // Fewer spike points for smoother transitions
  const spikes = {
    line1: new Set(
      Array.from({ length: 3 }, () => Math.floor(Math.random() * 365)),
    ),
    line2: new Set(
      Array.from({ length: 3 }, () => Math.floor(Math.random() * 365)),
    ),
    line3: new Set(
      Array.from({ length: 3 }, () => Math.floor(Math.random() * 365)),
    ),
  };

  let dayCounter = 0;

  while (currentDate <= endDate) {
    Object.keys(lines).forEach((key) => {
      const line = lines[key];

      // Smoother seasonal effect
      const seasonalEffect =
        Math.sin((dayCounter / 365) * Math.PI * 2) * 500 * line.seasonalFactor;

      // Softer spikes
      if (spikes[key].has(dayCounter)) {
        line.value *= Math.random() > 0.5 ? 1.15 : 0.85; // Reduced multipliers
        line.trend *= -0.8; // Smoother trend change
        line.volatility = 0.4 + Math.random() * 0.3;
      }

      // Reduced random noise
      const noise = (Math.random() - 0.5) * 400 * line.volatility;

      // Smoother trend application
      line.value += line.trend * (0.3 + Math.random() * 0.4);

      // Apply changes and limit values
      line.value = Math.max(
        2500,
        Math.min(7500, line.value + noise + seasonalEffect),
      );

      // Less frequent and smoother trend changes
      if (Math.random() > 0.99) {
        line.trend *= -0.7;
        line.trend += (Math.random() - 0.5) * 20; // Reduced trend variation
      }
    });

    // Fewer skips for smoother line
    if (Math.random() > 0.1) {
      // 10% chance to skip a point
      data.push({
        name: currentDate.toLocaleString("en-US", { month: "short" }),
        fullDate: formatDate(currentDate),
        dateValue: currentDate.getTime(),
        1: Math.round(lines.line1.value),
        2: Math.round(lines.line2.value),
        3: Math.round(lines.line3.value),
      });
    }

    // Smaller step between points for better smoothness
    const step = 1 + Math.floor(Math.random() * 2); // 1-2 days
    currentDate.setDate(currentDate.getDate() + step);
    dayCounter += step;

    // Smoother volatility changes
    Object.values(lines).forEach((line) => {
      if (Math.random() > 0.97) {
        line.volatility = 0.3 + Math.random() * 0.4;
      }
    });
  }

  return data;
};
