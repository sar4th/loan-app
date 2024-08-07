"use client";
import { Button } from "@/components/ui/button";
import { getAllUsers } from "@/lib/actions/selectRandomWinner";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
export function LuckyDrawButton() {
  const [winner, setWinner] = useState("");
  function getRandomWinner(users: any) {
    return users[Math.floor(Math.random() * users.length)];
  }

  const handleLuckyDraw = async () => {
    try {
      const allUsers = await getAllUsers();
      const randomWinner = getRandomWinner(allUsers);
      setWinner(randomWinner);
    } catch (error) {
      console.error("Error selecting winner:", error);
      alert("Failed to select a winner. Please try again.");
    } finally {
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-full flex-col">
        <div>
          <Button onClick={handleLuckyDraw}>Pick Random Winner</Button>
        </div>
      </div>
      <AlertDialog open={winner !== ""}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Winner: {winner.name}</AlertDialogTitle>
            <AlertDialogDescription>
              You won the lucky draw.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setWinner("")}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
