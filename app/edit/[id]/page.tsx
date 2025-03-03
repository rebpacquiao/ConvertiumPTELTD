import React from "react";
import Sidebar from "../../dashboard/Sidebar";
import AppBarMenu from "../../dashboard/appBarMenu";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function EditInformation({ params }) {
  const { id } = params;

  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AppBarMenu />
        <main className="flex-1 overflow-x-hidden overflow-y-auto px-10 mt-10 rounded-lg bg-gray-200">
          <div className="border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
              Update Information
            </h3>
            <div className="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                    <form>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Full Name
                      </p>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        className="w-full"
                      />
                      <div className="flex gap-3 mt-5">
                        <Button variant="outlined">Cancel</Button>
                        <Button variant="contained">Submit</Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
