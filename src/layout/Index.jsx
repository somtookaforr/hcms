import React, { useEffect } from "react";
import Layout from "../components/layout";
import { endpoint } from "../App";
import { useData } from "../components/context";
import moment from "moment";

const Index = () => {
  const { complaints, fetchComplaints } = useData();
  const { users, fetchUsers } = useData();
  const { assigned, fetchAssigned } = useData();
  const { userComplaints, fetchUserComplaints } = useData();
  const { profile, fetchProfile } = useData();
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    fetchProfile(endpoint + "profile/");
  }, []);

  useEffect(() => {
    fetchUsers(endpoint + "users/");
  }, []);

  useEffect(() => {
    fetchComplaints(endpoint + "complaint/");
  }, []);

  useEffect(() => {
    fetchAssigned(endpoint + "assigned-complaints/");
  }, []);

  useEffect(() => {
    fetchUserComplaints(endpoint + "complaints-by-user/");
  }, []);

  let card = `rounded-md border p-6 shadow-sm`;

  return (
    <>
      <Layout>
        <div className="grid gap-8">
          <div
            className={`grid gap-8 ${
              userType === "1" ? "lg:grid-cols-3" : "lg:grid-cols-2"
            }`}
          >
            <div className={`${card} bg-white`}>
              <p className="font-bold text-3xl text-red-600">
                {userType === "1"
                  ? complaints?.filter(
                      (item) =>
                        item.status === "Unresolved" ||
                        item.status === "unresolved"
                    ).length
                  : userType === "2"
                  ? assigned?.filter(
                      (item) =>
                        item.status === "Unresolved" ||
                        item.status === "unresolved"
                    ).length
                  : userType === "3"
                  ? userComplaints?.filter(
                      (item) =>
                        item.status === "Unresolved" ||
                        item.status === "unresolved"
                    ).length
                  : ""}
              </p>
              <p>No. of unresolved complaints</p>
            </div>
            <div className={`${card} bg-white`}>
              <p className="font-bold text-3xl text-red-600">
                {userType === "1"
                  ? complaints?.filter(
                      (item) =>
                        item.status === "Reresolved" ||
                        item.status === "reresolved"
                    ).length
                  : userType === "2"
                  ? assigned?.filter(
                      (item) =>
                        item.status === "Reresolved" ||
                        item.status === "reresolved"
                    ).length
                  : userType === "3"
                  ? userComplaints?.filter(
                      (item) =>
                        item.status === "Reresolved" ||
                        item.status === "reresolved"
                    ).length
                  : ""}
              </p>
              <p>No. of resolved complaints</p>
            </div>
            {userType === "1" ? (
              <div className={`${card} bg-white`}>
                <p className="font-bold text-3xl text-red-600">
                  {users?.length}
                </p>
                <p>No. of Users</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="grid gap-y-4 mt-12 mb-4">
            <h3 className="font-semibold text-2xl">Recent Complaints</h3>
            <>
              {userType === "1"
                ? complaints?.slice(0, 3)?.map((x, key) => (
                    <div
                      className={`${card} ${
                        x.status == "resolved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                      key={key}
                    >
                      {x.description}
                      <div className="text-right">
                        {moment(x.submission_date).format("MMMM Do YYYY")}
                      </div>
                    </div>
                  ))
                : userType === "2"
                ? assigned?.slice(0, 3)?.map((x, key) => (
                    <div
                      className={`${card} ${
                        x.status == "resolved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                      key={key}
                    >
                      {x.description}
                      <div className="text-right">
                        {moment(x.submission_date).format("MMMM Do YYYY")}
                      </div>
                    </div>
                  ))
                : userType === "3"
                ? userComplaints?.slice(0, 3)?.map((x, key) => (
                    <div
                      className={`${card} ${
                        x.status == "resolved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                      key={key}
                    >
                      {x.description}
                      <div className="text-right">
                        {moment(x.submission_date).format("MMMM Do YYYY")}
                      </div>
                    </div>
                  ))
                : ""}
            </>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Index;
