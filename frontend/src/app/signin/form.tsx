"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import Link from "next/link";

const schema = z.object({
  email: z.string().trim().email("Email must be valid"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function Form() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = schema.safeParse(formData);

    if (validation.success) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const resPayload = await res.json();

      if (res.ok) {
        setCookie("access_token", resPayload.token, { maxAge: 60 * 60 * 24 });

        router.push("/browse");
      } else {
        setFormErrors(resPayload.error);
      }
    } else {
      const zErr = validation.error.flatten();

      setFormErrors({
        email: zErr.fieldErrors.email?.[0] || "",
        password: zErr.fieldErrors.password?.[0] || "",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 flex flex-col max-w-[400px] mx-auto"
    >
      <h1 className="text-xl font-bold">Sign in</h1>

      <div className="h-10" />

      <Input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        isInvalid={!!formErrors.email}
        errorMessage={formErrors.email}
      />

      <div className="h-6" />

      <Input
        type={isPasswordVisible ? "text" : "password"}
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        isInvalid={!!formErrors.password}
        errorMessage={formErrors.password}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={() => {
              setIsPasswordVisible(!isPasswordVisible);
            }}
          >
            {isPasswordVisible ? (
              <FaEyeSlash className="pointer-events-none text-2xl text-default-400" />
            ) : (
              <FaEye className="pointer-events-none text-2xl text-default-400" />
            )}
          </button>
        }
      />

      <div className="h-6" />

      <Button type="submit">Sign in</Button>

      <div className="h-6" />

      <p className="text-sm">
        Don't have an account?{" "}
        <Link href={`/register`} className="text-blue-600">
          Sign in here
        </Link>
      </p>
    </form>
  );
}
