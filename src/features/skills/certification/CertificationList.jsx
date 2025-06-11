import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCertification } from "./CertificationSlice";
import CertificationForm from "./CertificationForm";

const CertificationList = () => {
  const certifications = useSelector((state) => state.certifications);
  const dispatch = useDispatch();
  const [editData, setEditData] = useState(null);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Certifications</h2>
      <CertificationForm editData={editData} setEditData={setEditData} />

      <div className="space-y-4">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="bg-white shadow p-4 rounded border border-gray-200"
          >
            <h3 className="text-lg font-semibold">{cert.name}</h3>
            <p className="text-sm text-gray-700 mb-1">Issued by: {cert.issuer}</p>
            <p className="text-xs text-gray-500 mb-2">Date: {cert.date}</p>
            <div className="space-x-2">
              <button
                onClick={() => setEditData(cert)}
                className="bg-yellow-500 text-white px-3 py-1 text-sm rounded"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteCertification(cert.id))}
                className="bg-red-500 text-white px-3 py-1 text-sm rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationList;
