import React, { useState } from 'react';

interface AreaChartProps {
  data: { label: string; value: number }[];
  height?: number;
}

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  height = 200,
}) => {
  const [activePoint, setActivePoint] = useState<number | null>(null);

  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const chartHeight = height - 40;
  const paddingLeft = 30;
  const paddingRight = 20;
  const chartWidth = 500;
  const plotWidth = chartWidth - paddingLeft - paddingRight;

  const pointsCount = data.length;
  const stepX = pointsCount > 1 ? plotWidth / (pointsCount - 1) : plotWidth;

  const coordinates = data.map((item, index) => {
    const x = paddingLeft + index * stepX;
    const y = chartHeight - (item.value / maxVal) * chartHeight + 10;
    return { x, y, label: item.label, value: item.value };
  });

  // Construct path string (Area fill)
  const linePath = coordinates.reduce((path, p, idx) => {
    return path + `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
  }, '');

  const areaPath = linePath
    ? `${linePath} L ${coordinates[coordinates.length - 1].x} ${chartHeight + 10} L ${coordinates[0].x} ${chartHeight + 10} Z`
    : '';

  // Grid steps (4 horizontal grid lines)
  const gridSteps = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="relative w-full" style={{ height }}>
        <svg viewBox={`0 0 ${chartWidth} ${height}`} width="100%" height="100%" className="overflow-visible">
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>

          {/* Gridlines */}
          {gridSteps.map((step, idx) => {
            const y = chartHeight - step * chartHeight + 10;
            const gridVal = Math.round(step * maxVal);

            return (
              <g key={idx} className="opacity-30 dark:opacity-20">
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={chartWidth - paddingRight}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
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

          {/* Area Fill */}
          {areaPath && (
            <path
              d={areaPath}
              fill="url(#areaGradient)"
              className="transition-all duration-300"
            />
          )}

          {/* Area Line */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          )}

          {/* Point Anchors */}
          {coordinates.map((p, index) => {
            const isActive = activePoint === index;
            return (
              <g key={index}>
                {/* Invisible larger hover circle */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="12"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setActivePoint(index)}
                  onMouseLeave={() => setActivePoint(null)}
                />
                {/* Visible dot circle */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isActive ? '6' : '4'}
                  fill={isActive ? '#3b82f6' : '#ffffff'}
                  stroke="#3b82f6"
                  strokeWidth="2"
                  className="transition-all duration-150 pointer-events-none"
                />
                {/* Active Tooltip */}
                {isActive && (
                  <g>
                    <rect
                      x={p.x - 30}
                      y={p.y - 28}
                      width="60"
                      height="20"
                      rx="3"
                      fill="#1e293b"
                      className="opacity-95 shadow-md"
                    />
                    <text
                      x={p.x}
                      y={p.y - 15}
                      textAnchor="middle"
                      className="fill-white text-[9px] font-bold"
                    >
                      {p.value} updates
                    </text>
                  </g>
                )}
                {/* Date label */}
                {index % Math.max(Math.round(pointsCount / 5), 1) === 0 && (
                  <text
                    x={p.x}
                    y={chartHeight + 25}
                    textAnchor="middle"
                    className="fill-gray-500 dark:fill-gray-400 text-[10px] font-medium"
                  >
                    {p.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Baseline */}
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

export default AreaChart;
