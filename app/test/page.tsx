import prisma from "@/lib/db";
const DataFechingTest = async () => {
  const user = await prisma.user.findMany();
  return (
    <div>
      {user.map(function (user) {
        return <div>{user.name}</div>;
      })}
    </div>
  );
};

export default DataFechingTest;
