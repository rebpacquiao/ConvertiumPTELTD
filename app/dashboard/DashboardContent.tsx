"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  TextField,
  Button,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { supabase } from "../supabaseClient";

export default function DashboardContent() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: userData, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });
  const mutation = useMutation((data) => updateUserProfile(data));

  if (isLoading) return <div>Loading...</div>;

  const onSubmit = (data) => {
    mutation.mutate(data);
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div className="container px-6 py-8 mx-auto">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-medium text-gray-700 mb-5">
              My Profile
            </h3>
            <Button variant="contained" color="primary" onClick={openDialog}>
              Edit
            </Button>
          </div>
          <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
            <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
            <ul className="mt-2 text-gray-700">
              <li className="flex border-y py-2">
                <span className="font-bold w-24">Full name:</span>
                <span className="text-gray-700">
                  {userData?.firstName} {userData?.lastName}
                </span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Birthday:</span>
                <span className="text-gray-700">{userData?.dob}</span>
              </li>

              <li className="flex border-b py-2">
                <span className="font-bold w-24">Email:</span>
                <span className="text-gray-700">{userData?.email}</span>
              </li>
            </ul>
          </div>
          <Dialog open={open} onClose={closeDialog}>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <TextField
                  label="Salutation"
                  {...register("salutation", { required: true })}
                  error={!!errors.salutation}
                  helperText={errors.salutation ? "Salutation is required" : ""}
                  fullWidth
                />
                <TextField
                  label="First Name"
                  {...register("firstName", { required: true })}
                  error={!!errors.firstName}
                  helperText={errors.firstName ? "First Name is required" : ""}
                  fullWidth
                />
                <TextField
                  label="Last Name"
                  {...register("lastName", { required: true })}
                  error={!!errors.lastName}
                  helperText={errors.lastName ? "Last Name is required" : ""}
                  fullWidth
                />
                <TextField
                  label="Email Address"
                  {...register("email", { required: true })}
                  error={!!errors.email}
                  helperText={errors.email ? "Email Address is required" : ""}
                  fullWidth
                />
                <TextField
                  label="Country"
                  {...register("country", { required: true })}
                  error={!!errors.country}
                  helperText={errors.country ? "Country is required" : ""}
                  fullWidth
                />
                <TextField
                  label="Postal Code"
                  {...register("postalCode", { required: true })}
                  error={!!errors.postalCode}
                  helperText={
                    errors.postalCode ? "Postal Code is required" : ""
                  }
                  fullWidth
                />
                <TextField
                  label="Date of Birth"
                  type="date"
                  {...register("dob", {
                    required: true,
                    validate: validateAge,
                  })}
                  error={!!errors.dob}
                  helperText={
                    errors.dob
                      ? "Date of Birth is required and must be at least 17 years old"
                      : ""
                  }
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
                <TextField
                  label="Gender"
                  select
                  {...register("gender", { required: true })}
                  error={!!errors.gender}
                  helperText={errors.gender ? "Gender is required" : ""}
                  fullWidth
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </TextField>
                <TextField
                  label="Marital Status"
                  select
                  {...register("maritalStatus", { required: true })}
                  error={!!errors.maritalStatus}
                  helperText={
                    errors.maritalStatus ? "Marital Status is required" : ""
                  }
                  fullWidth
                >
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                </TextField>
                <DialogActions>
                  <Button onClick={closeDialog} color="primary">
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </>
  );
}

function fetchUserProfile() {
  return supabase.from("profiles").select("*").single();
}

function updateUserProfile(data) {
  return supabase.from("profiles").update(data).eq("id", data.id);
}

function validateAge(value) {
  const today = new Date();
  const birthDate = new Date(value);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age >= 17;
}
