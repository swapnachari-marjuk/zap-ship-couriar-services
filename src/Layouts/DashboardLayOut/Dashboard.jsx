import { FaTruckFast } from "react-icons/fa6";
import { BsCreditCard2BackFill } from "react-icons/bs";
import { RiEBike2Line, RiMotorbikeFill } from "react-icons/ri";
import { FaTasks, FaUserClock } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { GoTasklist } from "react-icons/go";
import logoImg from "../../assets/logo.png";
import React from "react";
import { Link, Outlet } from "react-router";
import useRole from "../../hooks/useRole";

const Dashboard = () => {
  const { userRole } = useRole();
  // console.log(userRole);
  return (
    <div className="max-w-7xl mx-auto">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>

            <Link to={"/dashboard"} className="px-4 font-bold text-xl">
              {" "}
              <span className="bg-lime-300 p-2 rounded-2xl">ZapShift</span>{" "}
              Dashboard
            </Link>
          </nav>

          {/* Page content here */}
          <Outlet />
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}
              <li>
                <Link
                  to={"/"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <img className="max-w-5" src={logoImg} alt="" />
                  <span className="is-drawer-close:hidden">Homepage</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/dashboard"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Dashboard Home"
                >
                  {/* Home icon */}
                  <AiFillHome />
                  <span className="is-drawer-close:hidden">Dashboard Home</span>
                </Link>
              </li>

              {/* my parcels */}
              <li>
                <Link
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="myParcels"
                  to={"/dashboard/myParcels"}
                >
                  <FaTruckFast />
                  <span className="is-drawer-close:hidden"> My Parcels</span>
                </Link>
              </li>

              {/* my payment */}
              <li>
                <Link
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Payment"
                  to={"/dashboard/myPayment"}
                >
                  <BsCreditCard2BackFill />
                  <span className="is-drawer-close:hidden">My Payment</span>
                </Link>
              </li>

              {/* riders only */}

              {userRole?.role === "rider" && (
                <>
                  <li>
                    <Link
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Assigned Deliveries"
                      to={"/dashboard/assignedDeliveries"}
                    >
                      <GoTasklist size={18} />

                      <span className="is-drawer-close:hidden">
                        Assigned Deliveries
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Completed Deliveries"
                      to={"/dashboard/completedDeliveries"}
                    >
                      <FaTasks />
                      <span className="is-drawer-close:hidden"></span>
                    </Link>
                  </li>
                </>
              )}

              {/* admin only links */}
              {userRole?.role === "admin" && (
                <>
                  {/* pending rider */}
                  <li>
                    <Link
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Pending Rider"
                      to={"/dashboard/pendingRider"}
                    >
                      <RiMotorbikeFill />
                      <span className="is-drawer-close:hidden">
                        Pending Rider
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Assign Rider"
                      to={"/dashboard/assignRider"}
                    >
                      <RiEBike2Line />
                      <span className="is-drawer-close:hidden">
                        Assign Rider
                      </span>
                    </Link>
                  </li>
                  {/* manage user */}
                  <li>
                    <Link
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Manage Users"
                      to={"/dashboard/manageUsers"}
                    >
                      <FaUserClock />
                      <span className="is-drawer-close:hidden">
                        Manage Users
                      </span>
                    </Link>
                  </li>
                </>
              )}
              {/* List item */}
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Settings"
                >
                  {/* Settings icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                  <span className="is-drawer-close:hidden">Settings</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
