import { useState } from "react";
import confetti from "canvas-confetti";

export function App() {
  // LOGICA
  const TURNS = {
    X: "✖️",
    O: "⭕",
  };

  const combinacionesAGanar = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [turno, setTurno] = useState(
    JSON.parse(localStorage.getItem("Data")).UltimoTurno || "X"
  );
  const [board, SetBoard] = useState(
    JSON.parse(localStorage.getItem("Data")).UltimoBoard || Array(9).fill(null)
  );
  // DONDE UNDEFINED ES EMPATE Y NULL ES QUE NO HAY NADIE
  let [ganador, setGanador] = useState(null);

  function Square({ isTurn, children, onClick }) {
    let className = `square ${isTurn ? `isTurn` : ``}`;
    return (
      <div className={className} onClick={onClick}>
        {children}
      </div>
    );
  }

  function WinsModule({ ganador, isActive }) {
    if (isActive === false) {
      return;
    } else {
      return (
        <section className="winModule">
          {ganador === undefined ? (
            <span className="text-anuncement-wins">Nadie gano</span>
          ) : (
            <>
              <span className="text-anuncement-wins">Ganador:</span>
              <Square>{ganador}</Square>
            </>
          )}
          <button className="button-reset-game" onClick={resetGame}>
            Volver a Jugar
          </button>
        </section>
      );
    }
  }

  function checkWinners(boardAct, turnoWins) {
    for (const combinacion of combinacionesAGanar) {
      const [a, b, c] = combinacion;

      if (
        boardAct[a] !== null &&
        boardAct[b] !== null &&
        boardAct[c] !== null
      ) {
        if (
          boardAct[a] === boardAct[b] &&
          boardAct[a] === boardAct[c] &&
          boardAct[b] === boardAct[c]
        ) {
          switch (turnoWins) {
            case "X":
              setGanador("✖️");
              document.querySelector(".GanarAudio").play();
              confetti();
              return;
            case "O":
              setGanador("⭕");
              document.querySelector(".GanarAudio").play();
              confetti();
              return;
          }
        }
      }
    }

    const boardIsFill = boardAct.every((value) => value !== null);

    if (boardIsFill && ganador === null) {
      setGanador(undefined);
      document.querySelector(".EmpateAudio").play();
    }
  }

  function ActualizeBoard(indexClickeado, valorDentroDelCuadrado) {
    const newBoard = [...board];
    if (valorDentroDelCuadrado === null) {
      setTurno((prevTurno) => (prevTurno === "X" ? "O" : "X"));
      newBoard[indexClickeado] = turno === "X" ? TURNS.X : TURNS.O;
      SetBoard(newBoard);
      checkWinners(newBoard, turno);
      document.querySelector(".MarcarAudio").play();
    } else {
      return;
    }

    const LocalSave = {
      UltimoBoard: newBoard,
      UltimoTurno: turno === "X" ? "O" : "X",
    };

    localStorage.setItem("Data", JSON.stringify(LocalSave));
  }

  function resetGame() {
    setTurno("X");
    SetBoard(Array(9).fill(null));
    setGanador(null);
  }

  // LO QUE RETORNA A LA WEB
  return (
    <>
      <main
        className={`game ${
          ganador === "✖️" || ganador === "⭕" || ganador === undefined
            ? `desactive`
            : ``
        }`}
      >
        <h1 className="title">Tic Tac Toe</h1>
        <button className="button-reset-game" onClick={resetGame}>
          Resetear Juego
        </button>
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

      <WinsModule
        ganador={ganador}
        isActive={ganador === "✖️" || ganador === "⭕" || ganador === undefined}
      />
    </>
  );
}
