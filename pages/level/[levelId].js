import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect, useRef } from "react";

import { WALL, UP, DOWN, LEFT, RIGHT } from "../../gameLogic/types";

import { allLevels } from "../../gameLogic/levelData";

const cellWidth = 50;
const delay = 1000;

const sleep = (t) => new Promise((s) => setTimeout(s, t));

export default function Level() {
  const router = useRouter();
  const { levelId } = router.query;

  if (!levelId) {
    return <>Loading...</>;
  }

  if (allLevels.length < levelId) {
    return (
      <>
        No such level. <a href="/">Return Home</a>.
      </>
    );
  }
  const levelData = allLevels[levelId - 1].maze;
  const finishPosition = allLevels[levelId - 1].finishPosition;

  const [instructions, _setInstructions] = useState([]);
  const instructionsRef = useRef(instructions);
  const setInstructions = (newInstructions) => {
    instructionsRef.current = newInstructions;
    _setInstructions(newInstructions);
  };
  const [currentPosition, setCurrentPosition] = useState([0, 0]);
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [didWin, setDidWin] = useState(false);
  const [visited, setVisited] = useState([]); // TODO use!

  const possibleInstructions = [
    { direction: UP, symbol: "⬆️" },
    { direction: DOWN, symbol: "⬇️" },
    { direction: LEFT, symbol: "⬅️" },
    { direction: RIGHT, symbol: "➡️" },
  ];

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      let newInstruction;
      switch (e.key) {
        case "ArrowLeft":
          newInstruction = LEFT;
          break;
        case "ArrowRight":
          newInstruction = RIGHT;
          break;
        case "ArrowUp":
          newInstruction = UP;
          break;
        case "ArrowDown":
          newInstruction = DOWN;
          break;
      }
      const newInstructionItem = possibleInstructions.find(
        (instruction) => instruction.direction === newInstruction
      );
      if (newInstruction && newInstructionItem) {
        setInstructions(instructionsRef.current.concat(newInstructionItem));
      }
    });
  }, []);

  const reset = () => {
    setCurrentPosition([0, 0]);
    setInstructions([]);
    setCurrentInstructionIndex(-1);
  };

  const play = async () => {
    setIsPlaying(true);
    let newPosition = currentPosition;
    let isPlaying = true;
    for (let i = 0; i < instructions.length; i++) {
      if (!isPlaying) {
        return;
      }
      await sleep(delay);
      setCurrentInstructionIndex(i);
      const currentInstruction = instructions[i];
      switch (currentInstruction.direction) {
        case UP:
          if (newPosition[1] === 0) {
            alert("Hit the top!");
            isPlaying = restart();
          } else {
            newPosition = [newPosition[0], newPosition[1] - 1];
            setCurrentPosition(newPosition);
          }
          break;
        case DOWN:
          if (newPosition[1] === levelData[0].length - 1) {
            alert("Hit the bottom!");
            isPlaying = restart();
          } else {
            newPosition = [newPosition[0], newPosition[1] + 1];
            setCurrentPosition(newPosition);
          }
          break;
        case RIGHT:
          if (newPosition[0] === levelData.length - 1) {
            alert("Hit the right side!");
            isPlaying = restart();
          } else {
            newPosition = [newPosition[0] + 1, newPosition[1]];
            setCurrentPosition(newPosition);
          }
          break;
        case LEFT:
          if (newPosition[0] === 0) {
            alert("Hit the left side!");
            isPlaying = restart();
          } else {
            newPosition = [newPosition[0] - 1, newPosition[1]];
            setCurrentPosition(newPosition);
          }
          break;
      }

      if (didHitWall(newPosition) || isAtFinish(newPosition)) {
        isPlaying = false;
      }

      setIsPlaying(isPlaying);
    }
    setIsPlaying(false);
  };

  const didHitWall = (position) => {
    return levelData[position[1]][position[0]] === WALL;
  };

  const isAtFinish = (position) => {
    return (
      position[0] === finishPosition[0] && position[1] === finishPosition[1]
    );
  };

  useEffect(() => {
    if (didHitWall(currentPosition)) {
      alert("You hit a wall!");
      restart();
    }
    if (isAtFinish(currentPosition)) {
      setDidWin(true);
      alert("You won!");
    }
  }, [currentPosition]);

  const restart = () => {
    setCurrentPosition([0, 0]);
    setCurrentInstructionIndex(-1);
    return false;
  };

  const displayPossibleInstructions = (possibleInstructions) => {
    return (
      <div style={{ fontSize: "xx-large" }}>
        {possibleInstructions.map((instruction, instructionIndex) => {
          return (
            <span key={instructionIndex}>
              <span
                onClick={() => {
                  setInstructions(instructions.concat(instruction));
                }}
              >
                {instruction.symbol}
              </span>
              &nbsp;
            </span>
          );
        })}
      </div>
    );
  };

  const displayInstructions = (instructions) => {
    return (
      <div style={{ fontSize: "xx-large" }}>
        {instructions.length === 0 && <span>&nbsp;</span>}
        {instructions.map((instruction, instructionIndex) => {
          return (
            <span
              key={instructionIndex}
              style={{
                backgroundColor:
                  currentInstructionIndex === instructionIndex
                    ? "green"
                    : currentInstructionIndex > instructionIndex
                    ? "black"
                    : "white",
              }}
              onClick={() => {
                setInstructions(
                  instructions
                    .slice(0, instructionIndex)
                    .concat(instructions.slice(instructionIndex + 1))
                );
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
        <tbody>
          {levelData.map((row, yIndex) => {
            return (
              <tr key={yIndex}>
                {row.map((cell, xIndex) => {
                  return (
                    <td
                      key={`${xIndex},${yIndex}`}
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
                        fontSize: "xx-large",
                        textAlign: "center",
                      }}
                    >
                      {xIndex === currentPosition[0] &&
                      yIndex === currentPosition[1]
                        ? "🤖"
                        : " "}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <Head>
        <title>Code Maze | Level {levelId}</title>
      </Head>
      <h1>Level {levelId}</h1>
      <span
        style={{ fontSize: "xx-large" }}
        className={isPlaying ? "disabled" : " link"}
        onClick={() => play()}
      >
        ▶️
      </span>

      <span style={{ fontSize: "xx-large" }} onClick={() => reset()}>
        🔄
      </span>
      {displayInstructions(instructions)}
      <hr />
      {constructLevel(levelData)}
      <hr />
      {displayPossibleInstructions(possibleInstructions)}
      <hr />
      {didWin && (
        <h1 style={{ textAlign: "center" }}>
          <a href={`/level/${parseInt(levelId) + 1}`}>Next Level!</a>
        </h1>
      )}

      <style jsx>{`
        .disabled {
          opacity: 0.4;
          grayscale: true;
        }

        .link {
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
