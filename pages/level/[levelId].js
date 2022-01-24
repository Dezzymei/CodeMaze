import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { Container, Modal } from "react-bootstrap";
import Confetti from "react-confetti";

import { WALL, UP, DOWN, LEFT, RIGHT } from "../../gameLogic/types";

import { allLevels } from "../../gameLogic/levelData";

const cellWidth = 50;
const delay = 700;

const sleep = (t) => new Promise((s) => setTimeout(s, t));

export default function Level() {
  const router = useRouter();

  const { levelId } = router.query;
  const [currentPosition, setCurrentPosition] = useState([0, 0]);

  const levelData =
    levelId && allLevels.length >= levelId
      ? allLevels[levelId - 1].maze
      : [[], []];
  const finishPosition =
    levelId && allLevels.length >= levelId
      ? allLevels[levelId - 1].finishPosition
      : [1, 1];

  const [isShowingModal, setIsShowingModal] = useState(false);
  const handleCloseModal = () => setIsShowingModal(false);
  const showModal = () => setIsShowingModal(true);
  const [modalContent, _setModalContent] = useState(null);
  const setModalContent = (modalContent) => {
    _setModalContent(modalContent);
    showModal();
  };
  const [instructions, _setInstructions] = useState([]);
  const instructionsRef = useRef(instructions);
  const setInstructions = (newInstructions) => {
    instructionsRef.current = newInstructions;
    _setInstructions(newInstructions);
  };
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [didWin, setDidWin] = useState(false);
  const [visited, setVisited] = useState([]); // TODO use!

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
        case "Enter":
          playRef.current();
          break;
        default:
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

  useEffect(() => {
    if (didHitWall(currentPosition)) {
      setModalContent("You hit a wall!");
      restart();
    }
    if (isAtFinish(currentPosition)) {
      setDidWin(true);
      setModalContent("You won!");
    }
  }, [currentPosition]);

  const possibleInstructions = [
    { direction: UP, symbol: "⬆️" },
    { direction: DOWN, symbol: "⬇️" },
    { direction: LEFT, symbol: "⬅️" },
    { direction: RIGHT, symbol: "➡️" },
  ];

  const reset = () => {
    setCurrentPosition([0, 0]);
    setInstructions([]);
    setCurrentInstructionIndex(-1);
  };

  const _play = async () => {
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
            setModalContent("Hit the top!");
            isPlaying = restart();
          } else {
            newPosition = [newPosition[0], newPosition[1] - 1];
            setCurrentPosition(newPosition);
          }
          break;
        case DOWN:
          if (newPosition[1] === levelData.length - 1) {
            setModalContent("Hit the bottom!");
            isPlaying = restart();
          } else {
            newPosition = [newPosition[0], newPosition[1] + 1];
            setCurrentPosition(newPosition);
          }
          break;
        case RIGHT:
          if (newPosition[0] === levelData[0].length - 1) {
            setModalContent("Hit the right side!");
            isPlaying = restart();
          } else {
            newPosition = [newPosition[0] + 1, newPosition[1]];
            setCurrentPosition(newPosition);
          }
          break;
        case LEFT:
          if (newPosition[0] === 0) {
            setModalContent("Hit the left side!");
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

  const playRef = useRef();
  playRef.current = _play;

  const didHitWall = (position) => {
    return levelData[position[1]][position[0]] === WALL;
  };

  const isAtFinish = (position) => {
    return (
      position[0] === finishPosition[0] && position[1] === finishPosition[1]
    );
  };

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
                            : xIndex === finishPosition[0] &&
                              yIndex === finishPosition[1]
                            ? "lightgreen"
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
      <Container>
        <Modal show={isShowingModal} onHide={handleCloseModal}>
          <Modal.Body>{modalContent}</Modal.Body>
        </Modal>
        <h1>Level {levelId}</h1>
        <span
          style={{ fontSize: "xx-large" }}
          className={isPlaying ? "disabled" : " link"}
          onClick={() => _play()}
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
            <Confetti />
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
      </Container>
    </>
  );
}
