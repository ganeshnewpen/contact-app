import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getStringAvatar } from "../utils/helpers";

function EmployeeCard({ employee, onView, onEdit, onDelete }) {
  const [imageError, setImageError] = useState(false);
  useEffect(() => {
    setImageError(false);
  }, [employee.profileImage]);

  return (
    <tr className="employee-row">
      <td onClick={() => onView(employee)}>
        <div className="d-flex align-items-center gap-2 cursor-pointer">
          {employee.profileImage && !imageError ? (
            <img
              src={employee.profileImage}
              alt={employee.name}
              className="rounded-circle"
              width="36"
              height="36"
              onError={() => setImageError(true)}
              style={{ objectFit: "cover", outline: "2px solid #c7c7c7" }}
            />
          ) : (
            <div
              className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fw-semibold"
              style={{ width: "36px", height: "36px", fontSize: "16px", outline: "2px solid #c7c7c7" }}
            >
              {getStringAvatar(employee.name)}
            </div>
          )}
          <span class="fw-semibold text-nowrap">{employee.name} </span>
        </div>
      </td>
      <td>
        <a
          href={`mailto:${employee.email}`}
          className="text-decoration-none text-reset"
        >
          {employee.email || "-"}
        </a>
      </td>
      <td>
        <a
          href={`tel:${employee.phone}`}
          className="text-decoration-none text-reset"
        >
          {employee.phone || "-"}
        </a>
      </td>
      <td>{employee.post || "-"}</td>
      <td>{employee.address || "-"}</td>

      <td>
        <div className="employee-actions-cell employee-action-buttons">
          <button onClick={() => onView(employee)}>
            {" "}
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button onClick={() => onEdit(employee)} className="text-primary">
            {" "}
            <FontAwesomeIcon icon={faPen} />{" "}
          </button>
          <button onClick={() => onDelete(employee.id)} className="text-danger">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </td>
    </tr>
  );
}
export default EmployeeCard;
