import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";

interface PersonalPreferencesProps {
  data: {
    personal_references: string;
  };
}

export default function PersonalPreferences({
  data,
}: PersonalPreferencesProps) {
  return (
    <>
      <div className="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Personal Preferences
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Hobbies and Interest
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data.personal_references}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
