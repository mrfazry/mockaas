import React from "react";
import {
  BsEnvelopeFill,
  BsFacebook,
  BsInstagram,
  BsTelephoneFill,
  BsTiktok,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import { FaMapMarker } from "react-icons/fa";

export default function Footer() {
  const socialMedias = [
    {
      type: "facebook",
      icon: BsFacebook,
      link: "https://facebook.com/mockaas.tv",
    },
    {
      type: "instagram",
      icon: BsInstagram,
      link: "https://instagram.com/mockaas.tv",
    },
    {
      type: "tiktok",
      icon: BsTiktok,
      link: "https://tiktok.com/@mockaastv",
    },
    {
      type: "twitter",
      icon: BsTwitter,
      link: "https://twitter.com/mockaas_tv",
    },
    {
      type: "youtube",
      icon: BsYoutube,
      link: "https://youtube.com/@mockaas.tv",
    },
  ];

  return (
    <div className="bg-yellow-500 p-6 rounded-t-2xl">
      <p className="text-sm font-bold">Follow us</p>

      <div className="h-4" />

      <div className="flex gap-4">
        {socialMedias.map((sm) => (
          <a href={sm.link} target="_blank" className="">
            <sm.icon className="text-orange-800 w-6 h-6" />
          </a>
        ))}
      </div>

      <div className="h-6" />

      <p className="text-sm font-bold">Contact us</p>
      <div className="h-4" />

      <div className="text-white flex gap-4 items-center">
        <BsEnvelopeFill />
        <a href="mailto:info@mockaas.tv">info@mockaas.tv</a>
      </div>

      <div className="h-2" />

      <div className="text-white flex gap-4 items-center">
        <BsTelephoneFill />
        <a href="tel:+6281234567890">+62 812 3456 7890</a>
      </div>

      <div className="h-6" />

      <p className="text-sm font-bold">Address</p>
      <div className="h-4" />

      <div className="text-white flex gap-4 items-center">
        <FaMapMarker />
        <p>Jakarta</p>
      </div>
    </div>
  );
}
