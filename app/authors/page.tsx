import { redirect } from "next/navigation";

export default function AuthorsRedirect() {
  redirect("/author");
}

