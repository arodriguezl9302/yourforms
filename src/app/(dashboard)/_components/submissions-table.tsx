import React from "react";

interface Props {
  id: string;
}
const SubmissionsTable: React.FC<Props> = ({ id }) => {
  return (
    <>
      <h1 className="text-2xl font-bold py-4">Datos recopilados</h1>
    </>
  );
};

export default SubmissionsTable;
