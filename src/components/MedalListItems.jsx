import React from "react";
import Button from "./Button";

const MedalListItems = ({ data, deleteMedalList }) => {
  return (
    <>
      <tr>
        <td>{data.nation}</td>
        <td>{data.goldMedals}</td>
        <td>{data.silverMedals}</td>
        <td>{data.bronzeMedals}</td>
        <td>{data.sumOfMedals}</td>
        <td>
          {" "}
          <Button
            text="삭제"
            type="button"
            className="btn-delete"
            onClick={() => {
              deleteMedalList(data);
            }}
          />
        </td>
      </tr>
    </>
  );
};

export default MedalListItems;
