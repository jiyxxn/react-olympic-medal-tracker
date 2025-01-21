import React from "react";

const ListArea = ({ userInputs }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>국가명</th>
          <th>금메달</th>
          <th>은메달</th>
          <th>동메달</th>
        </tr>
      </thead>
      <tbody>
        {userInputs.map((data, index) => (
          <tr key={index}>
            <td>{data.nation}</td>
            <td>{data.goldMedals}</td>
            <td>{data.silverMedals}</td>
            <td>{data.bronzeMedals}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListArea;
