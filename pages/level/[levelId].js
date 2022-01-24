import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";

import { WALL, FREE, UP, DOWN, LEFT, RIGHT } from "../../gameLogic/types";

const cellWidth = 40;

const sleep = (t) => new Promise((s) => setTimeout(s, t));

export default function Level() {
  const router = useRouter();
  const { levelId } = router.query;

  const [instructions, setInstructions] = useState([]);
  const [currentPosition, setCurrentPosition] = useState([0, 0]);
  const [currentInstruction, setCurrentInstruction] = useState();
  const [visited, setVisited] = useState([]);

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

  const play = async () => {
    let newPosition = currentPosition;
    for (let i = 0; i < instructions.length; i++) {
      setCurrentInstruction(i);
      const currentInstruction = instructions[i];
      switch (currentInstruction.direction) {
        case UP:
          if (newPosition[1] === 0) {
            alert("Hit the top!");
          } else {
            newPosition = [newPosition[0], newPosition[1] - 1];
            setCurrentPosition(newPosition);
          }
          break;
        case DOWN:
          if (newPosition[1] === levelData[0].length - 1) {
            alert("Hit the bottom!");
          } else {
            newPosition = [newPosition[0], newPosition[1] + 1];
            setCurrentPosition(newPosition);
          }
          break;
        case RIGHT:
          if (newPosition[0] === levelData.length - 1) {
            alert("Hit the right side!");
          } else {
            newPosition = [newPosition[0] + 1, newPosition[1]];
            setCurrentPosition(newPosition);
          }
          break;
        case LEFT:
          if (newPosition[0] === 0) {
            alert("Hit the left side!");
          } else {
            newPosition = [newPosition[0] - 1, newPosition[1]];
            setCurrentPosition(newPosition);
          }
          break;
      }

      if (levelData[newPosition[1]][newPosition[0]] === WALL) {
        alert("You hit a wall!");
      }
      await sleep(2000);
    }
  };

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
        {instructions.map((instruction, instructionIndex) => {
          return (
            <span
              style={{
                backgroundColor: !currentInstruction
                  ? "white"
                  : currentInstruction === instructionIndex
                  ? "green"
                  : currentInstruction > instructionIndex
                  ? "black"
                  : "white",
              }}
            >
              {instruction.symbol}
            </span>
          );
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
        {levelData.map((row, yIndex) => {
          return (
            <tr>
              {row.map((cell, xIndex) => {
                return (
                  <td
                    style={{
                      border: "1px solid",
                      background:
                        xIndex === currentPosition[0] &&
                        yIndex === currentPosition[1]
                          ? "green"
                          : cell === WALL
                          ? "red"
                          : "white",
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
      <span onClick={() => play()}>Play</span>

      {displayInstructions(instructions)}
      <hr />
      {constructLevel(levelData)}
      <hr />
      {displayPossibleInstructions(possibleInstructions)}
    </>
  );
}
