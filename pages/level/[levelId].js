import { useRouter } from "next/router";
import Head from "next/head";

import { WALL, FREE } from "../../gameLogic/types";

export default function Level() {
  const router = useRouter();
  const { levelId } = router.query;

  const levelData = [
    [WALL, FREE],
    [WALL, WALL],
  ];

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
                return <td>{cell}</td>;
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
      {constructLevel(levelData)}
    </>
  );
}
