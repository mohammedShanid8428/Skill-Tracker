import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCertification, updateCertification } from "./CertificationSlice";

const CertificationForm = ({ editData, setEditData }) => {
  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setIssuer(editData.issuer);
      setDate(editData.date);
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cert = { name, issuer, date };

    if (editData) {
      dispatch(updateCertification({ ...editData, ...cert }));
      setEditData(null);
    } else {
      dispatch(addCertification(cert));
    }

    setName("");
    setIssuer("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <input
        type="text"
        placeholder="Certification Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2 w-full rounded"
      />
      <input
        type="text"
        placeholder="Issued By"
        value={issuer}
        onChange={(e) => setIssuer(e.target.value)}
        required
        className="border p-2 w-full rounded"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="border p-2 w-full rounded"
      />
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        {editData ? "Update Certification" : "Add Certification"}
      </button>
    </form>
  );
};

export default CertificationForm;
