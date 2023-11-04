import { useState, useEffect } from "react";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
    };
    contract && memosMessage();
  }, [contract]);

  return (
    <section>
      {memos.map((memo) => {
        return (
          <table key={memo.timestamp}>
            <tbody>
              <tr>
                <td>{memo.name}</td>
                <td>{memo.message}</td>
                <td>{String(memo.timestamp)}</td>
                <td>{memo.from}</td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </section>
  );
};

export default Memos;
