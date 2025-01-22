import React from "react";
import Button from "./Button";

const MedalListItems = ({ data }) => {
  return (
    <>
      <tr>
        <td>{data.nation}</td>
        <td>{data.goldMedals}</td>
        <td>{data.silverMedals}</td>
        <td>{data.bronzeMedals}</td>
        <td>
          <Button text="삭제" type="button" className="btn-delete" />
        </td>
      </tr>
    </>
  );
};

export default MedalListItems;
