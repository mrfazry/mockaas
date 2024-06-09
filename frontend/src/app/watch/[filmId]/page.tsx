import MainThumbnail from "@/app/browse/main-thumbnail";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const getFilm = async (token: string, filmId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/films/${filmId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const resPayload = await res.json();

  return resPayload;
};

export default async function WatchPage(props: { params: { filmId: string } }) {
  const token = cookies().get("access_token")?.value;

  if (!token) {
    redirect("/signin");
  }

  const { data: film, error } = await getFilm(token, props.params.filmId);

  if (error || !film) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <div className="px-6">
        <div className="h-10" />
        <MainThumbnail film={film} />
      </div>
    </div>
  );
}
