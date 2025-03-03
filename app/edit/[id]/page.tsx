import React from "react";
import Sidebar from "../../dashboard/Sidebar";
import AppBarMenu from "../../dashboard/appBarMenu";

export default function EditInformation({ params }) {
  const { id } = params;

  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AppBarMenu />
        <div className="p-5">
          <h1>Edit Information for User ID: {id}</h1>
        </div>
      </div>
    </div>
  );
}
