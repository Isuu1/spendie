interface ChartLabelProps {
  cx: number; // Center x coordinate
  cy: number; // Center y coordinate
  midAngle: number; // Mid angle of the pie slice
  innerRadius: number; // Inner radius of the pie slice
  outerRadius: number; // Outer radius of the pie slice
  percent: number; // Percentage of the pie slice
  index: number; // Index of the pie slice
  name: string; // Name of the pie slice
  value: number; // Value of the pie slice
}

const ChartLabel: React.FC<ChartLabelProps> = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name,
  value,
}) => {
  console.log("ChartLabel", {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
    value,
  });
  const RADIAN = Math.PI / 180;
  const labelRadius = outerRadius + 25;
  const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
  const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);
  const textAnchor = x > cx ? "start" : "end";
  const percentageValue = `${(percent * 100).toFixed(1)}%`;

  // --- Style Definitions ---
  const textFill = "#fff"; //Default text color
  let backgroundFill = "#333"; //Default background color
  if (index === 0) {
    //Income label background
    backgroundFill = "#41b300";
  } else if (index === 1) {
    //Expense label background
    backgroundFill = "#ff0000";
  }

  // --- Background Rectangle Calculation (Approximate) ---
  const padding = 4;
  const textWidthEstimate = percentageValue.length * 7;
  const textHeightEstimate = 14;

  const rectX =
    textAnchor === "start"
      ? x //Start rect at text anchor
      : x - textWidthEstimate - 2 * padding; //Shift rect left for end anchor
  const rectY = y - textHeightEstimate / 2 - padding;
  const rectWidth = textWidthEstimate + 2 * padding;
  const rectHeight = textHeightEstimate + 2 * padding;

  // --- Return SVG Group with Rect and Text ---
  return (
    <g>
      <rect
        x={rectX}
        y={rectY}
        width={rectWidth}
        height={rectHeight}
        fill={backgroundFill}
        rx={5} //Rounded corners for the background
        opacity={0.8}
      />
      <text
        x={textAnchor === "start" ? x + padding : x - padding}
        y={y} //Keep vertical alignment
        fill={textFill}
        fontSize={12}
        fontWeight="bold"
        textAnchor={textAnchor}
        dominantBaseline="central"
      >
        {percentageValue}
      </text>
    </g>
  );
};

export default ChartLabel;
