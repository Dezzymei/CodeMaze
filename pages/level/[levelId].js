import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";

import { WALL, FREE, UP, DOWN, LEFT, RIGHT } from "../../gameLogic/types";

const cellWidth = 20;

export default function Level() {
  const router = useRouter();
  const { levelId } = router.query;

  const [instructions, setInstructions] = useState([]);

  const levelData = [
    [WALL, FREE],
    [WALL, WALL],
  ];

  const possibleInstructions = [
    { direction: UP, symbol: "⬆️" },
    { direction: DOWN, symbol: "⬇️" },
    { direction: LEFT, symbol: "⬅️" },
    { direction: RIGHT, symbol: "➡️" },
  ];

  const displayPossibleInstructions = (possibleInstructions) => {
    return (
      <div style={{ fontSize: "xx-large" }}>
        {possibleInstructions.map((instruction) => {
          return (
            <>
              <span
                onClick={() => {
                  setInstructions(instructions.concat(instruction));
                }}
              >
                {instruction.symbol}
              </span>
              &nbsp;
            </>
          );
        })}
      </div>
    );
  };

  const displayInstructions = (instructions) => {
    return (
      <div style={{ fontSize: "xx-large" }}>
        {instructions.map((instruction) => {
          return <>{instruction.symbol}</>;
        })}
      </div>
    );
  };

  const constructLevel = (levelData) => {
    const width = levelData.length;
    if (width === 0) {
      return <>No level data</>;
    }
    const height = levelData[0].length;
    if (height === 0) {
      return <>No height on Level Data</>;
    }
    return (
      <table>
        {levelData.map((row) => {
          return (
            <tr>
              {row.map((cell) => {
                return (
                  <td
                    style={{
                      border: "1px solid",
                      background: cell === WALL ? "red" : "white",
                      width: cellWidth,
                      height: cellWidth,
                    }}
                  >
                    &nbsp;
                  </td>
                );
              })}
            </tr>
          );
        })}
      </table>
    );
  };

  return (
    <>
      <Head>
        <title>Code Maze | Level {levelId}</title>
      </Head>
      <h1>Level {levelId}</h1>
      <h2>Instructions</h2>

      {displayInstructions(instructions)}
      <hr />
      {constructLevel(levelData)}
      <hr />
      {displayPossibleInstructions(possibleInstructions)}
    </>
  );
}
