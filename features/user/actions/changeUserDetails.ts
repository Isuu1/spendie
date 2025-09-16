"use server";

export async function changeUserDetails(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");

  // Perform server-side logic to change user details
  console.log("Changing user details to:", { name, email });
}
