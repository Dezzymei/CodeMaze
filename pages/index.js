import Head from "next/head";
import { Button, Container } from "react-bootstrap";

export default function Home() {
  return (
    <Container
      style={{ minHeight: "100vh", height: "100%" }}
      className="d-flex align-items-center"
    >
      <Head>
        <title>Code Maze</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="m-auto" style={{ height: "100%" }}>
        <h1 className="title p-5">Welcome to Code Maze</h1>

        <p className="description">
          <Button>
            <a href="/level/1">Play</a>
          </Button>
        </p>
      </div>

      <footer>&copy; Robert Desmond {new Date().getFullYear()}</footer>

      <style jsx>{`
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          position: absolute;
          bottom: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: auto;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          height: 100%;
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </Container>
  );
}
