import React from "react";
import Link from "next/link";

import Form from "./form";

export default function RegisterPage(props: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const successRegistering = props.searchParams?.success === "true";

  return (
    <div>
      {successRegistering ? (
        <p>
          Registration succes. Go to signin page by clicking{" "}
          <Link href="/signin">here</Link>.
        </p>
      ) : null}
      <Form />
    </div>
  );
}
