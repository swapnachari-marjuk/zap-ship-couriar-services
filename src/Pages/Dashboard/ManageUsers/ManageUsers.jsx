import React, { useState } from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { BsFillShieldSlashFill } from "react-icons/bs";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaSearchengin } from "react-icons/fa6";

const ManageUsers = () => {
  const [skip, setSkip] = useState(0);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const axiosSecure = useAxiosSecure();
  const {
    refetch,
    data: response,
    isLoading,
  } = useQuery({
    queryKey: ["users", skip, searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?skip=${skip}&limit=${10}&searchText=${searchText}`
      );
      return res;
    },
  });

  const users = response?.data?.result || [];
  const totalCount = response?.data?.documentCount || 0;
  const pageCount = Math.ceil(totalCount / 10);
  console.log(users);

  const handleAdmin = (user, role) => {
    const updateInfo = { approvalStatus: role };
    axiosSecure
      .patch(`/users/${user._id}/role`, updateInfo)
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
    Swal.fire({
      title: "Confirm it!",
      text: `You want to approve ${user.displayName} as an admin.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Approve",
    }).then((result) => {
      if (result.isConfirmed) {
        handleAdmin(user, "approved");
      }
    });
  };

  const handleReject = (user) => {
    Swal.fire({
      title: "Confirm it!",
      text: `You want to remove ${user.displayName} from admin panel.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Remove",
    }).then((result) => {
      if (result.isConfirmed) {
        handleAdmin(user, "removed");
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl font-bold text-center mt-3">All Users</h2>
      <div className="flex justify-center items-center my-4">
        <label className="input">
          <FaSearchengin />
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="search"
            required
            placeholder="Search an user"
          />
        </label>
      </div>
      <div className="overflow-x-auto">
        {isLoading ? (
          <p>loading...</p>
        ) : (
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
        )}
      </div>
      <div className="">
        <button
          disabled={skip === 0 && true}
          className="btn btn-sm mx-2"
          onClick={() => setSkip(skip - 10)}
        >
          Prev
        </button>
        {[...Array(pageCount)].map((_, i) => (
          <button
            key={i}
            onClick={() => setSkip(i * 10)}
            className="btn btn-sm mx-1"
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={skip + 10 >= totalCount}
          className="btn btn-sm mx-2"
          onClick={() => setSkip(skip + 10)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageUsers;
