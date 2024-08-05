import prisma from "@/lib/db";

const DataFechingTest = async () => {
  const user = await prisma.user.findMany();
  console.log(user, "sfsfh");

  return <div>page</div>;
};

export default DataFechingTest;
