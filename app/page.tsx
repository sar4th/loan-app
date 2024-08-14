import { cookies } from "next/headers";
import ClientPage from "./ClientPage";

export default function Page() {
  const userCookie = cookies().get("user");

  return <ClientPage initialUser={userCookie} />;
}
