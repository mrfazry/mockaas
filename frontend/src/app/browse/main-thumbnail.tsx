"use client";

import { Button, Chip } from "@nextui-org/react";
import React, { useState } from "react";
import Link from "next/link";

import mainThumbnailStyle from "./main-thumbnail.module.css";

export default function MainThumbnail(props: {
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
    <div className="rounded-2xl bg-blue-800 p-8 mx-auto md:flex md:flex-row-reverse md:justify-between md:items-end">
      <div className="-mt-8 -mx-8 rounded-t-2xl md:ml-8 md:-mb-8 md:w-1/2 md:rounded-tl-none md:rounded-br-2xl">
        <img
          className={`${mainThumbnailStyle.gradient} rounded-t-2xl md:rounded-tl-none md:rounded-br-2xl`}
          src={renderedSrc}
          onError={() => {
            setRenderedSrc("/no_image.png");
          }}
          alt="film thumbnail"
        />
      </div>

      <div className="md:w-1/2">
        <p className="text-2xl font-semibold text-white">{film.title}</p>

        <div className="h-6" />

        <div className="flex gap-4">
          <Chip
            className="bg-blue-700 text-yellow-500"
            variant="solid"
            radius="sm"
          >
            2022
          </Chip>
          <Chip
            className="bg-blue-700 text-yellow-500"
            variant="solid"
            radius="sm"
          >
            2h 33m
          </Chip>
          <Chip
            className="bg-blue-700 text-yellow-500"
            variant="solid"
            radius="sm"
          >
            Action
          </Chip>
        </div>

        <div className="h-6" />

        <p className="text-sm text-gray-200">{film.description}</p>

        <div className="h-6" />

        <div className="flex gap-4">
          <Link href={`/watch/${film.id}`}>
            <Button className="bg-yellow-500 text-gray-900">Play</Button>
          </Link>
          <Button variant="ghost" className="text-white border-white">
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
