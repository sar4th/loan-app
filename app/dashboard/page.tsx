import { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainNav } from "./_components/main-nav";
import EditPoolDetails from "./_components/edit-pool-details";
import prisma from "@/lib/db";
import { RecentWinners } from "./_components/recent-winners";
import Allusers from "./_components/all-users";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth";
import SignOutButton from "./_components/sign-out-button";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default async function DashboardPage() {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("user")?.value === "admin";

  const fetchDashboardData = async () => {
    try {
      const dashboardData = await prisma.poolDetails.findFirst();
      return dashboardData;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      return null;
    }
  };

  const fetchTotalWinners = async () => {
    try {
      const totalWinners = await prisma.user.count({
        where: {
          iswinned: true,
        },
      });
      return totalWinners;
    } catch (error) {
      console.error("Error fetching total winners count:", error);
      return 0;
    }
  };

  const dashboardData = await fetchDashboardData();
  const totalWinners = await fetchTotalWinners();
  const users = await prisma.user.findMany();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <SignOutButton />
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Dashboard
        </h1>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="flex-wrap">
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>

          {isAdmin && <EditPoolDetails dashboardData={dashboardData} />}

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Dashboard cards */}
              <DashboardCard
                title="Total pool amount"
                value={dashboardData?.poolAmount}
                icon={
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
                }
              />
              <DashboardCard
                title="Monthly payment"
                value={dashboardData?.monthlyPayment}
                icon={
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
                }
              />
              <DashboardCard
                title="Total winners"
                value={totalWinners}
                icon={
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
                }
              />
              <DashboardCard
                title="Active users"
                value={dashboardData?.activeUsers}
                icon={
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
                }
              />
            </div>

            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
              <Card className="col-span-full lg:col-span-4">
                <CardHeader>
                  <CardTitle>All Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <Allusers initialUsers={users} isAdmin={isAdmin} />
                </CardContent>
              </Card>

              <Card className="col-span-full lg:col-span-3">
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
      </main>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: any;
  icon: any;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
