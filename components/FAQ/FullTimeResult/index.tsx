export default function FAQFullTimeResult() {
  return (
    <>
      {" "}
      <p className="text-default-600 text-md font-medium mb-4">How to play</p>
      <div className="border border-default-300 rounded p-4">
        <ol className="list-decimal list-inside text-sm">
          <li className="mb-2">
            Lets get this party started,{" "}
            <span className="font-semibold">bois!</span>
          </li>
          <li className="mb-2">Select your outcomes of the games below.</li>
          <li className="mb-2">
            Each correct prediction will be worth{" "}
            <span className="font-semibold">3 points</span>.
          </li>
          <li className="mb-2">
            Check your score by clicking the{" "}
            <span className="font-semibold">leaderboard</span> tab.
          </li>
          <li className="mb-2">
            The winner will take home the{" "}
            <span className="font-semibold">pot</span>.
          </li>
          <li className="mb-2">
            Enjoy the <span className="font-semibold">jubbly</span> experience!
          </li>
        </ol>
      </div>
    </>
  );
}
