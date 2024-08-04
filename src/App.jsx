export function App() {
  const board = Array(9).fill(null);
  const TURNS = {
    X: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="red"
        className="size-6"
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
  return (
    <main className="game">
      <h1 className="title">Tic Tac Toe</h1>

      <section className="board">
        {board.map((cuadradoVal, index) => {
          return (
            <div className="square" key={index}>
              {cuadradoVal}
            </div>
          );
        })}
      </section>

      <section className="turns">
        <div className="square square-turnX isTurn">{TURNS.X}</div>
        <div className="square square-turnO">{TURNS.O}</div>
      </section>
    </main>
  );
}
