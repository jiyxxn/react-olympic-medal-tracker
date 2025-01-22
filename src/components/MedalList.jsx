import React, { useState } from "react";
import MedalListItems from "./MedalListItems";

const MedalList = ({ medalList, deleteMedalList }) => {
  // * Func : 메달 리스트 정렬
  const [sortOption, setSortOption] = useState("countOfGoldMedals");

  const sortedMedalList = () => {
    switch (sortOption) {
      case "countOfGoldMedals":
        return [...medalList].sort((a, b) => b.goldMedals - a.goldMedals);

      case "sumOfMedals":
        return [...medalList].sort((a, b) => b.sumOfMedals - a.sumOfMedals);
    }
  };

  // * 선택된 정렬 기준 업데이트
  const sortMedalList = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="medal-list-container">
      <select id="medalSortSelect" onChange={sortMedalList} value={sortOption}>
        <option value="countOfGoldMedals">금메달</option>
        <option value="sumOfMedals">메달 합계</option>
      </select>
      <div className="medal-list-wrapper">
        <table>
          <thead>
            <tr>
              <th>국가명</th>
              <th>금메달</th>
              <th>은메달</th>
              <th>동메달</th>
              <th>합계</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {sortedMedalList().map((data) => (
              <MedalListItems
                data={data}
                key={data.nation}
                deleteMedalList={deleteMedalList}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedalList;
