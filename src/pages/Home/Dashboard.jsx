import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreteModal, setOpenCreateModal] = useState(false);
  const [session, setSession] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSession = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSession(response.data);
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  };
  const deleteSessions = async (sessionId) => {};

  useEffect(() => {
    fetchAllSession();
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 md:px-3">
          {session.map((data, index) => (
            <SummaryCard
              key={data?._id}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data?.role || ""}
              topicToFocus={data?.topicToFocus || ""}
              experience={data?.experience || "-"}
              questions={data?.questions?.length || "-"}
              description={data?.description || ""}
              lastUpdate={
                data?.updateAt ? moment(data.updateAt).format("DD MM YYYY") : ""
              }
              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
          ))}
        </div>
        <button
          className="h-12 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-[#FF9324] to-[#E99A4B] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className="text-2xl text-white" />
          Add new
        </button>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
