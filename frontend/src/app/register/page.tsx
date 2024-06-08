import React from "react";
import Link from "next/link";

import Form from "./form";

export default function RegisterPage(props: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const successRegistering = props.searchParams?.success === "true";

  return (
    <div className="py-10 px-6">
      <Form success={successRegistering} />
    </div>
  );
}
