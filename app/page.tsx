import { cookies } from "next/headers";
import ClientPage from "./ClientPage";

export default function Page() {
  const userCookie = cookies().get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  return <ClientPage initialUser={user} />;
}
