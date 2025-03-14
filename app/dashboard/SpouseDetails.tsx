import React from "react";

import Link from "next/link";

interface SpouseData {
  salutation: string;
  spouse_first_name: string;
  spouse_last_name: string;
}

export default function SpouseDetails({ data }: { data: SpouseData }) {
  return (
    <>
      <div className="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Spouse Information
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Salutation
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data.salutation}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  First Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data.spouse_first_name}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Last Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data.spouse_last_name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
