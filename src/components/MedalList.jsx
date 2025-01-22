import React from "react";
import MedalListItems from "./MedalListItems";

const MedalList = ({ medalList }) => {
  // * Func : 금메달 기준 내림차순 정렬

  const sortedMedalList = () => {
    return [...medalList].sort((a, b) => {
      return b.goldMedals - a.goldMedals;
    });
  };

  return (
    <div className="medal-list-wrapper">
      <table>
        <thead>
          <tr>
            <th>국가명</th>
            <th>금메달</th>
            <th>은메달</th>
            <th>동메달</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {sortedMedalList().map((data) => (
            <MedalListItems data={data} key={data.nation} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedalList;
