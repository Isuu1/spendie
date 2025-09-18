"use server";

export async function changeUserDetails(formData: FormData) {
  const username = formData.get("username");
  const email = formData.get("email");

  // Perform server-side logic to change user details
  console.log("Changing user details to:", { username, email });
}
