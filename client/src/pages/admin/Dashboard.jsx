import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getEmployees } from "../../services/employees";
import { format } from "date-fns";
import { getCurrentUser } from "../../services/auth";
import { getGreeting } from "../../utils/helpers";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate("/login");
    }
  }, []);

  const today = new Date();
  const todayMonthDay = format(today, "MM-dd");

  const isValidDateFormat = (dateStr) => {
    if (typeof dateStr !== "string") return false;
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateStr)) return false;
    const date = new Date(dateStr);
    return !isNaN(date.getTime()) && dateStr === format(date, "yyyy-MM-dd");
  };

  const birthdayEmployees = employees.filter((employee) => {
    if (!employee.dob) {
      return false;
    }

    if (!isValidDateFormat(employee.dob)) {
      return false;
    }

    try {
      const dobDate = new Date(employee.dob);
      const dobMonthDay = format(dobDate, "MM-dd");
      return dobMonthDay === todayMonthDay;
    } catch (error) {
      console.warn(
        `Skipping employee ${employee.name || employee.id}: Error parsing dob`,
        employee.dob,
        error
      );
      return false;
    }
  });

  return (
    <>
      <div className="container my-5">
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <div className="wrap">
            <h2 className="fw-bold">Dashboard</h2>
            <p>Welcome to Dashboard! {getGreeting("Admin")} </p>
          </div>
        </div>

        <div className="row g-4">
          {/* Total Employees Card */}
          <div className="col-md-4">
            <Link to="/admin/employees" className="text-decoration-none">
              <div className="card border-0 bg-grad-dash text-white shadow-lg h-100 transition-hover p-4">
                <div className="card-body d-flex flex-column justify-content-between">
                  <h4 className="card-title fw-bold">Total Employees</h4>
                  <p className="display-6">{employees.length}</p>
                </div>
              </div>
            </Link>
          </div>

          {/* birthdays... */}
          {birthdayEmployees.length > 0 && (
            <div className="col-md-8">
              <div className="card shadow-lg h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title fw-bold mb-0">
                      Today's Birthdays 🎉
                    </h5>
                    <span>Wish them a birthday!</span>
                  </div>
                  <ul className="list-group list-group-flush">
                    {birthdayEmployees.map((employee) => {
                      if (!isValidDateFormat(employee.dob)) {
                        console.error(
                          `Invalid dob in render for ${employee.name || employee.id
                          }:`,
                          employee.dob
                        );
                        return null;
                      }
                      return (
                        <li
                          key={employee.id}
                          className="list-group-item d-flex justify-content-between align-items-center transition-hover"
                        >
                          <Link
                            to="/employees"
                            className="text-decoration-none text-dark"
                          >
                            <span>{employee.name}</span>
                            {employee.post && (
                              <span className="text-muted ms-2">
                                ({employee.post})
                              </span>
                            )}
                          </Link>
                          <span className="badge bg-success fw-normal rounded-pill">
                            {format(new Date(employee.dob), "MMMM d")}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
