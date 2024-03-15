export const insurancePrompts = [
    {
      promptText: "Risk Scoring",
      insQuestion: "Get me risk profile of ",
      insResponse: "Here is your desired data",
    },
    {
      promptText: "Signals",
      insQuestion: "Get me signals of ",
      insResponse: "Here is your desired data",
    },
    {
      promptText: "Firmographic",
      insQuestion: "Get me firmographic info of ",
      insResponse: "Here is your desired data",
    },
  
];

export const insightsPrompts = [
    {
      promptText: "Create claim Analysis Report for last quarter",
      insQuestion: "Create claim Analysis Report for last quarter",
      insResponse: "Below is the claim Analysis Report for last quarter",
    },
    {
      promptText: "Create Customer Segmentation Reports",
      insQuestion: "Create Customer Segmentation Reports",
      insResponse: "Below is the Customer Segmentation Report",
    },
    {
      promptText: "Create Fraud Analysis Reports",
      insQuestion: "Create Fraud Analysis Reports",
      insResponse: "Below is the Fraud Analysis Report",
    },
];

export const signalColumn = [
  {
    title: "Signal Type",
    dataIndex: "signalType",
    key: "signalType",
    onCell: (record, index) => {
      const rowSpan = index === 0 ? 4 : index === 4 ? 7 : 0;
      return {
        rowSpan,
      };
    },
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Indicator",
    dataIndex: "indicator",
    key: "indicator",
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
  },
];

export const tableTypeWritingFeature = (tableData, setVisibleRows) => {
  const timeoutIds = [];

  tableData.forEach((data, rowIndex) => {
    const visibleRow = { ...data };
    Object.keys(data).forEach((key) => {
      const cellContent = data[key];
      const visibleCellContent = Array.from(cellContent).fill("");
      timeoutIds.push(
        ...visibleCellContent.map((_, charIndex) =>
          setTimeout(() => {
            visibleRow[key] = cellContent.slice(0, charIndex + 1);
            setVisibleRows((prevRows) => [
              ...prevRows.slice(0, rowIndex),
              { ...prevRows[rowIndex], ...visibleRow },
              ...prevRows.slice(rowIndex + 1),
            ]);
          }, rowIndex * 1000 + charIndex * 50)
        )
      );
    });
  });

  return () => {
    timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
  };
};