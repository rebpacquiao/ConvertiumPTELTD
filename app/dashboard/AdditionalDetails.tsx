import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";

interface PersonalInformationProps {
  data: {
    home_address: string;
    country: string;
    postal_code: string;
    date_of_birth: string;
    gender: string;
    status: string;
  };
}

export default function PersonalInformation({
  data,
}: PersonalInformationProps) {
  console.log("PersonalInformation data:", data);

  return (
    <>
      <div className="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Additon Information
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Home Address
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data.home_address}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Country
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data.country}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Postal
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data.postal_code}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Date of Birth
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data.date_of_birth}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Gender
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data.gender}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Marital Status
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
