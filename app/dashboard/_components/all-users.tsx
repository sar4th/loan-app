"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { updateWinner } from "@/lib/actions/updateWinner";

// This type assumes your User model has these fields. Adjust as necessary.
type User = {
  id: number;
  name: string;
  iswinned: boolean;
};

const Allusers = ({ initialUsers }: { initialUsers: User[] }) => {
  const [users, setUsers] = useState(initialUsers);

  const handleWinnerChange = async (userId: number, isWinner: boolean) => {
    // Update local state
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, iswinned: isWinner } : user
      )
    );

    // Update the database
    await updateWinner(userId, isWinner);
  };

  return (
    <div className="w-full h-[300px] overflow-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] sticky top-0 bg-white">
                  Id
                </TableHead>
                <TableHead className="sticky top-0 bg-white">Name</TableHead>
                <TableHead className="sticky top-0 bg-white">Winner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={user.iswinned}
                      onCheckedChange={(checked) =>
                        handleWinnerChange(user.id, checked as boolean)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Allusers;
