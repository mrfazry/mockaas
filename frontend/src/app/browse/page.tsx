import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import Footer from "./footer";

const getFilms = async (token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/films`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const resPayload = await res.json();

  return resPayload;
};

export default async function BrowsePage() {
  const token = cookies().get("access_token")?.value;

  if (!token) {
    redirect("/signin");
  }

  const { data: films, error } = await getFilms(token);

  if (error || !Array.isArray(films)) {
    return <div>Something went wrong</div>;
  }

  console.log("films", films);

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-64px)]">
      <h1>BrowsePage</h1>

      <Footer />
    </div>
  );
}
