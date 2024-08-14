import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import prisma from "@/lib/db";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
} from "react";

export const RecentWinners = async () => {
  try {
    const recentWinners: any = await prisma.user.findMany({
      where: {
        iswinned: true,
      },
    });

    return (
      <div className="space-y-8">
        {recentWinners.map(
          (winner: {
            id: Key | null | undefined;
            name:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<AwaitedReactNode>
              | null
              | undefined;
            winDate: { toLocaleString: () => any };
          }) => (
            <div key={winner.id} className="flex items-center">
              {/* <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>{winner.userName}</AvatarFallback>
            </Avatar> */}
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {winner.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {winner?.winDate.toLocaleString() || ""}
                </p>
              </div>
              <div className="ml-auto font-medium">
                {/* Replace with winner's prize amount */}
              </div>
            </div>
          )
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching recent winners:", error);
    return null;
  }
};
