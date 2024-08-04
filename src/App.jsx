import { useState } from "react";

export function App() {
  // LOGICA
  const [board, SetBoard] = useState(Array(9).fill(null));
  const TURNS = {
    X: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="red"
        className="size-6 X"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    ),
    O: (
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="O"
      >
        <path
          d="M50,10 A40,40 0 1,0 50,90 A40,40 0 1,0 50,10"
          fill="none"
          stroke="skyblue"
          strokeWidth="5"
        />
      </svg>
    ),
  };
  const [turno, setTurno] = useState("X");

  function Square({ isTurn, children, onClick }) {
    let className = `square ${isTurn ? `isTurn` : ``}`;
    return (
      <div className={className} onClick={onClick}>
        {children}
      </div>
    );
  }

  function ActualizeBoard(indexClickeado, valorDentroDelCuadrado) {
    if (valorDentroDelCuadrado === null) {
      setTurno((prevTurno) => (prevTurno === "X" ? "O" : "X"));
      const newBoard = [...board];
      newBoard[indexClickeado] = turno === "X" ? TURNS.X : TURNS.O;
      SetBoard(newBoard);
    }
  }

  // LO QUE RETORNA A LA WEB
  return (
    <main className="game">
      <h1 className="title">Tic Tac Toe</h1>

      <section className="board">
        {board.map((cuadradoVal, index) => {
          return (
            <Square
              key={index}
              onClick={() => {
                ActualizeBoard(index, cuadradoVal);
              }}
            >
              {cuadradoVal}
            </Square>
          );
        })}
      </section>

      <section className="turns">
        <Square isTurn={turno === "X"}>{TURNS.X}</Square>
        <Square isTurn={turno === "O"}>{TURNS.O}</Square>
      </section>
    </main>
  );
}
