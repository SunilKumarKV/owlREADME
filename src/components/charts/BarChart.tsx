import React, { useState } from 'react';

interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  height?: number;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 200,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const chartHeight = height - 40; // reserve space for bottom labels
  const paddingLeft = 30; // reserve space for left values axis
  const paddingRight = 10;
  const chartWidth = 500; // base svg coordinate system width
  const plotWidth = chartWidth - paddingLeft - paddingRight;

  // Grid steps (4 horizontal grid lines)
  const gridSteps = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* SVG Plot */}
      <div className="relative w-full" style={{ height }}>
        <svg viewBox={`0 0 ${chartWidth} ${height}`} width="100%" height="100%" className="overflow-visible">
          {/* Gradients */}
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="barGradientHover" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>

          {/* Gridlines & Axis labels */}
          {gridSteps.map((step, idx) => {
            const y = chartHeight - step * chartHeight + 10;
            const gridVal = Math.round(step * maxVal);

            return (
              <g key={idx} className="opacity-30 dark:opacity-20">
                {/* Horizontal line */}
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={chartWidth - paddingRight}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                {/* Value text label */}
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-black dark:fill-white text-[10px] font-semibold"
                >
                  {gridVal}
                </text>
              </g>
            );
          })}

          {/* Columns */}
          {data.map((item, index) => {
            const barCount = data.length;
            const colWidth = plotWidth / barCount;
            const barWidth = Math.max(colWidth * 0.6, 12);
            const x = paddingLeft + index * colWidth + (colWidth - barWidth) / 2;
            
            const barHeight = (item.value / maxVal) * chartHeight;
            const y = chartHeight - barHeight + 10;

            const isHovered = hoveredIdx === index;
            const fillColor = item.color || (isHovered ? 'url(#barGradientHover)' : 'url(#barGradient)');

            return (
              <g key={item.label}>
                {/* Column Rectangle */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx="4"
                  fill={fillColor}
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />

                {/* Hover value indicator */}
                {isHovered && (
                  <g>
                    <rect
                      x={x + barWidth / 2 - 20}
                      y={y - 25}
                      width="40"
                      height="18"
                      rx="3"
                      fill="#1e293b"
                      className="opacity-90 shadow-md"
                    />
                    <text
                      x={x + barWidth / 2}
                      y={y - 13}
                      textAnchor="middle"
                      className="fill-white text-[10px] font-bold"
                    >
                      {item.value}
                    </text>
                  </g>
                )}

                {/* Label tick */}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 25}
                  textAnchor="middle"
                  className="fill-gray-500 dark:fill-gray-400 text-[10px] font-medium max-w-[50px] truncate"
                >
                  {item.label}
                </text>
              </g>
            );
          })}

          {/* Bottom baseline */}
          <line
            x1={paddingLeft}
            y1={chartHeight + 10}
            x2={chartWidth - paddingRight}
            y2={chartHeight + 10}
            stroke="currentColor"
            strokeWidth="1.5"
            className="opacity-30 dark:opacity-20"
          />
        </svg>
      </div>
    </div>
  );
};

export default BarChart;
