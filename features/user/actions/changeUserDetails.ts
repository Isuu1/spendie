"use server";

import { getUserServer } from "../api/getUserServer";

export async function changeUserDetails(formData: FormData) {
  const name = formData.get("name") as string;
  const surname = formData.get("surname") as string;
  const dob = formData.get("dob") as string;
  const email = formData.get("email") as string;

  try {
    const { user, error } = await getUserServer();

    if (error || !user) {
      console.error("Error fetching user:", error);
      return;
    }

    console.log("User profile:", user);

    // Perform server-side logic to change user details
    console.log("Changing user details to:", { name, surname, dob, email });
  } catch (error) {
    console.error("Error changing user details:", error);
  }
}
