"use client";

import React, { useState } from "react";
import { Chip } from "@nextui-org/react";
import Link from "next/link";

import otherThumbnailStyle from "./other-thumbnail.module.css";

export default function OtherThumbnail(props: {
  film: {
    id: string;
    title: string;
    description: string;
    image_thumbnail: string;
  };
}) {
  const { film } = props;

  const [renderedSrc, setRenderedSrc] = useState(film.image_thumbnail);

  return (
    <Link href={`/watch/${film.id}`}>
      <div className="p-6 w-[calc((100%-16px)/2)] md:w-[calc((100%-32px)/3)]">
        <div className="-mt-6 -mx-6 rounded-t-2xl">
          <img
            className={`${otherThumbnailStyle.gradient} rounded-t-2xl`}
            src={renderedSrc}
            onError={() => {
              setRenderedSrc("/no_image.png");
            }}
            alt="film thumbnail"
          />
        </div>

        <div className="flex gap-4 items-center">
          <p className="text-white">{film.title}</p>

          <Chip
            className="bg-yellow-500 text-gray-900"
            variant="solid"
            radius="sm"
          >
            Exclusive
          </Chip>
        </div>
      </div>
    </Link>
  );
}
