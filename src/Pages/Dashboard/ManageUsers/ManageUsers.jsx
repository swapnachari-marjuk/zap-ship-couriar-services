import React from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { BsFillShieldSlashFill } from "react-icons/bs";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleUser = (user, role) => {
    const updateInfo = { approvalStatus: role };
    axiosSecure
      .patch(`/users/${user._id}`, updateInfo)
      .then((res) => {
        console.log(res.data);
        refetch();
        if (res.data.approvalStatus === "approved") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.displayName} has been saved as an admin.`,
            showConfirmButton: false,
            timer: 1500,
          });
        }

        if (res.data.approvalStatus === "removed") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.displayName} has been removed from admin.`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleApprove = (user) => {
    handleUser(user, "approved");
  };

  const handleReject = (user) => {
    handleUser(user, "removed");
  };

  return (
    <div>
      <h2 className="text-4xl font-bold text-center">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-xl font-bold">{user.displayName}</p>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <th>
                  {user.role === "admin" ? (
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleReject(user)}
                    >
                      <BsFillShieldSlashFill size={15} />
                    </button>
                  ) : (
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleApprove(user)}
                    >
                      <MdAdminPanelSettings size={20} />
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
