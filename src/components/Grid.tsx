import GridCell from "./GridCell";

const Grid = () => {
  const numRows = 4;
  const numCols = 4;

  const grid = Array(numRows)
    .fill(null)
    .map(() => Array(numCols).fill(null));

  return (
    <div className="flex flex-wrap">
      {grid.map((row, rowIndex) =>
        row.map((_, colIndex) => (
          <GridCell key={`${rowIndex}-${colIndex}`} x={rowIndex} y={colIndex} />
        ))
      )}
    </div>
  );
};

export default Grid;
