"use client";

import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";
import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import PersonalInformation from "./PersonalInformation";
import { fetchProfile } from "../../app/api/api";
import AdditionalDetails from "./AdditionalDetails";
import SpouseDetails from "./SpouseDetails";
import PersonalPreferences from "./PersonalPreferences";
import Sidebar from "./Sidebar";

export default function DashboardContent() {
  const {
    data: profile,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  const [activeTab, setActiveTab] = useState("profile");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;

  return (
    <div className="flex">
      <Sidebar setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-x-hidden overflow-y-auto px-10 mt-10 rounded-lg bg-gray-200">
        <div className="border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
            Profile
          </h3>
          <div className="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
                <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                  <Image
                    src="/images/owner.jpg"
                    width={20}
                    height={10}
                    alt="user"
                  />
                </div>
                <div className="order-3 xl:order-2">
                  <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                    {profile?.[0]?.first_Name} {profile?.[0]?.last_name}
                  </h4>
                  <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {/* {data.role} */}
                    </p>
                    <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {profile?.[0]?.first_Name} {profile?.[0]?.last_name}
                    </p>
                  </div>
                </div>
              </div>

              <Button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                    fill=""
                  ></path>
                </svg>
                Edit
              </Button>
            </div>
          </div>
          {activeTab === "profile" && (
            <PersonalInformation data={profile?.[0]} />
          )}
          {activeTab === "additional-details" && (
            <AdditionalDetails data={profile?.[0]} />
          )}
          {activeTab === "spouse-details" && (
            <SpouseDetails data={profile?.[0]} />
          )}
          {activeTab === "personal-preferences" && (
            <PersonalPreferences data={profile?.[0]} />
          )}
        </div>
      </main>
    </div>
  );
}
