import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import Footer from "./footer";
import MainThumbnail from "./main-thumbnail";
import OtherThumbnail from "./other-thumbnail";

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

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-64px)]">
      <div className="h-10" />
      {films[0] ? (
        <>
          <div className="px-6">
            <MainThumbnail film={films[0]} />
          </div>
        </>
      ) : null}

      {films.length > 1 ? (
        <>
          <div className="h-6" />
          <div className="px-6 flex flex-row flex-wrap gap-4">
            {films.slice(1).map((f) => (
              <OtherThumbnail key={f.id} film={f} />
            ))}
          </div>
        </>
      ) : null}

      <Footer />
    </div>
  );
}
