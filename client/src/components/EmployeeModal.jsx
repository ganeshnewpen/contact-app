import { FaLinkedin, FaGithub, FaDiscord } from "react-icons/fa";
import { format } from "date-fns";
import PropTypes from "prop-types";

const EmployeeModal = ({ employee, onClose, imageError, setImageError, getStringAvatar }) => {
  if (!employee) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="employeeModalLabel"
      aria-hidden="false"
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content shadow-lg border-0">
          <div className="modal-header bg-light border-bottom">
            <h5 className="modal-title fw-bold" id="employeeModalLabel">
              Employee Details
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-4 text-center">
            {employee.profileImage && !imageError ? (
              <img
                src={employee.profileImage}
                alt={employee.name}
                className="rounded-circle mb-3 border border-secondary"
                width="100"
                height="100"
                style={{ objectFit: "cover" }}
                onError={() => setImageError(true)}
              />
            ) : (
              <div
                className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center mx-auto mb-3 border fw-bold"
                style={{
                  width: "80px",
                  height: "80px",
                  fontSize: "32px",
                }}
              >
                {getStringAvatar(employee.name)}
              </div>
            )}
            <h5 className="fw-semibold">{employee.name}</h5>

            <p className="mt-2 mb-0 text-muted">
              Joined Date:{" "}
              {employee.joinedDate
                ? format(new Date(employee.joinedDate), "MMMM d, yyyy")
                : "-"}
            </p>

            <div className="d-flex flex-wrap justify-content-center gap-3 mb-3 mt-3">
              {employee.linkedinProfile && (
                <a
                  href={employee.linkedinProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn Profile"
                  className="text-primary"
                >
                  <FaLinkedin size={24} />
                </a>
              )}
              {employee.githubProfile && (
                <a
                  href={employee.githubProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub Profile"
                  className="text-dark"
                >
                  <FaGithub size={24} />
                </a>
              )}
              {employee.discordProfile && (
                <a
                  href={employee.discordProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Discord Profile"
                  className="text-info"
                >
                  <FaDiscord size={24} />
                </a>
              )}
            </div>
            <div className="text-start mt-3 border-top pt-3">
              <p className="mb-2">
                <strong>Post / Designation:</strong> {employee.post || "—"}
              </p>
              <p className="mb-2">
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${employee.email}`}
                  className="text-decoration-none"
                >
                  {employee.email}
                </a>
              </p>
              <p className="mb-2">
                <strong>Phone:</strong> {employee.phone || "—"}
              </p>
              <p className="mb-2">
                <strong>Address:</strong> {employee.address || "—"}
              </p>
              {(employee.emergencyContactName || employee.emergencyContactNumber) && (
                <div className="mt-3">
                  <strong>Emergency Contact Person:</strong>
                  <p className="mb-2 mt-2">
                    <strong>Name:</strong> {employee.emergencyContactName || "—"}
                  </p>
                  <p className="mb-2">
                    <strong>Phone:</strong>{" "}
                    <a
                      href={`tel:${employee.emergencyContactNumber}`}
                      className="text-decoration-none"
                    >
                      {employee.emergencyContactNumber}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EmployeeModal.propTypes = {
  employee: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  imageError: PropTypes.bool.isRequired,
  setImageError: PropTypes.func.isRequired,
  getStringAvatar: PropTypes.func.isRequired,
};

export default EmployeeModal;