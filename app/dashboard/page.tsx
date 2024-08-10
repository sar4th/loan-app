import { Metadata } from "next";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import TeamSwitcher from "./_components/team-switcher";
import { MainNav } from "./_components/main-nav";
import { Search } from "./_components/search";
import { UserNav } from "./_components/user-nav";
import { CalendarDateRangePicker } from "./_components/date-range-picker";
import { Overview } from "./_components/overview";
import { Button } from "@/components/ui/button";

import EditPoolDetails from "./_components/edit-pool-details";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { LuckyDrawButton } from "./_components/lucky-draw-button";
import { RecentWinners } from "./_components/recent-winners";
import Allusers from "./_components/all-users";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

// const users = [
//   { id: 1, name: "Faris", isActive: true, iswinned: false },
//   { id: 2, name: "Faez", isActive: true, iswinned: false },
//   { id: 3, name: "Shebi", isActive: true, iswinned: false },
//   { id: 4, name: "Shifas", isActive: true, iswinned: false },
//   { id: 5, name: "Siraj", isActive: true, iswinned: false },
//   { id: 6, name: "Murshi", isActive: true, iswinned: false },
//   { id: 7, name: "Favas", isActive: true, iswinned: false },
//   { id: 8, name: "Sajas", isActive: true, iswinned: false },
//   { id: 9, name: "Habi", isActive: true, iswinned: false },
//   { id: 10, name: "Mansoor", isActive: true, iswinned: false },
//   { id: 11, name: "Suhail", isActive: true, iswinned: false },
//   { id: 12, name: "Nadir", isActive: true, iswinned: false },
//   { id: 13, name: "Hashim", isActive: true, iswinned: false },
//   { id: 14, name: "kunjani", isActive: true, iswinned: false },
//   { id: 15, name: "Mammu", isActive: true, iswinned: false },
//   { id: 16, name: "suppu", isActive: true, iswinned: false },
//   { id: 17, name: "Ashad", isActive: true, iswinned: false },
//   { id: 18, name: "Murshi 1", isActive: true, iswinned: false },
//   { id: 19, name: "Siraj 1", isActive: true, iswinned: false },
//   { id: 20, name: "Murshi 2", isActive: true, iswinned: false },
// ];

// async function main() {
//   console.log("Start seeding...");
//   for (const user of users) {
//     await prisma.user.upsert({
//       where: { id: user.id },
//       update: {},
//       create: user,
//     });
//   }
//   console.log("Seeding finished.");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
export default async function DashboardPage() {
  const fetchDashboardData = async () => {
    try {
      const dashboardData = await prisma.poolDetails.findFirst();
      return dashboardData;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      return null;
    }
  };
  const dashboardData = await fetchDashboardData();
  const users = await prisma.user.findMany();
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            {/* <TeamSwitcher /> */}
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              {/* <Search /> */}
              {/* <UserNav /> */}
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>
            <EditPoolDetails dashboardData={dashboardData} />

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total pool amount
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {dashboardData?.poolAmount}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Monthly payment
                    </CardTitle>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {dashboardData?.monthlyPayment}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total winners
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {dashboardData?.totalWinners}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active users
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {dashboardData?.activeUsers}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader></CardHeader>
                  <CardContent className="pl-2">
                    <Allusers initialUsers={users} />
                    {/* <LuckyDrawButton /> */}
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Winners</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RecentWinners />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
