export const handleLineChange = (e, index, setGlobalSettings) => {
  setGlobalSettings((prev) => ({
    ...prev,
    lines: prev.lines.map((line, i) => {
      if (i === index) {
        return { ...line, name: e.target.value };
      }
      return line;
    }),
  }));
};

export const handleTooltipFormatterChange = (e, setGlobalSettings) => {
  setGlobalSettings((prev) => ({
    ...prev,
    tooltipFormatter: e.target.value,
  }));
};

export const handleLineColorChange = (
  e,
  index,
  globalSettings,
  setGlobalSettings
) => {
  const lineToChange = globalSettings.lines[index];

  setGlobalSettings((prev) => ({
    ...prev,
    lines: prev.lines.map((line, i) =>
      line.id === lineToChange.id ? { ...line, color: e.target.value } : line
    ),
  }));
};

export const handleLineRemove = (
  index,
  globalSettings,
  setData,
  setGlobalSettings
) => {
  const lineToRemove = globalSettings.lines[index];

  setData((prevData) =>
    prevData.map(({ [lineToRemove.id]: removed, ...rest }) => rest)
  );

  setGlobalSettings((prev) => ({
    ...prev,
    lines: prev.lines.map((line) =>
      line.id === lineToRemove.id ? { ...line, name: null } : line
    ),
  }));
};

export const handleLineAdd = (globalSettings, setData, setGlobalSettings) => {
  const hiddenLine = globalSettings.lines.find((line) => line.name === null);
  if (
    !hiddenLine ||
    globalSettings.lines.filter((line) => line.name).length >= 3
  )
    return;

  setData((prevData) =>
    prevData.map((item) => ({
      ...item,
      [hiddenLine.id]: null,
    }))
  );

  setGlobalSettings((prev) => ({
    ...prev,
    lines: prev.lines.map((line) =>
      line.id === hiddenLine.id ? { ...line, name: "New line" } : line
    ),
  }));
};
