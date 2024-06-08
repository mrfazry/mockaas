"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const schema = z.object({
  username: z
    .string()
    .trim()
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(
      /^[a-zA-Z][a-zA-Z0-9]*$/gi,
      "Username must only contain alphanumeric characters and without space"
    ),
  email: z.string().trim().email("Email must be valid"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function Form(props: { success?: boolean }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/register`,
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
        router.push("?success=true");
      } else {
        setFormErrors(resPayload.error);
      }
    } else {
      const zErr = validation.error.flatten();

      setFormErrors({
        username: zErr.fieldErrors.username?.[0] || "",
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
      <h1 className="text-xl font-bold">Register</h1>

      <div className="h-10" />

      {props.success ? (
        <p className="text-sm">
          Registration success. Go to signin page by clicking{" "}
          <Link href="/signin" className="text-blue-600">
            here
          </Link>
          .
        </p>
      ) : (
        <>
          <Input
            type="text"
            name="username"
            label="Username"
            labelPlacement="outside"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            isInvalid={!!formErrors.username}
            errorMessage={formErrors.username}
          />

          <div className="h-6" />

          <Input
            type="email"
            name="email"
            label="Email"
            labelPlacement="outside"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            isInvalid={!!formErrors.email}
            errorMessage={formErrors.email}
          />

          <div className="h-6" />

          <Input
            type={isPasswordVisible ? "text" : "password"}
            label="Password"
            labelPlacement="outside"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
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

          <Button type="submit">Register</Button>

          <div className="h-6" />

          <p className="text-sm">
            Already had an account?{" "}
            <Link href={`/signin`} className="text-blue-600">
              Sign in here
            </Link>
          </p>
        </>
      )}
    </form>
  );
}
