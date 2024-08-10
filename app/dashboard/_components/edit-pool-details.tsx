"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { nullable, z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { upsertPoolDetails } from "@/lib/actions/createPoolDetails";
import { useEffect, useState } from "react";

const EditPoolDetails = ({ dashboardData }: { dashboardData: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const formSchema = z.object({
    poolAmount: z
      .string()
      .optional()
      .refine((val) => !val || val.length > 0, {
        message: "Amount is required if provided",
      }),
    monthlyPayment: z
      .string()
      .optional()
      .refine((val) => !val || val.length > 0, {
        message: "Monthly payment is required if provided",
      }),
    activeUsers: z
      .string()
      .optional()
      .refine((val) => !val || val.length > 0, {
        message: "Active users is required if provided",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: dashboardData,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const filteredValues = Object.fromEntries(
        Object.entries(values).filter(([_, v]) => v !== undefined && v !== "")
      );
      await upsertPoolDetails(filteredValues);
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }
  useEffect(() => {
    form.reset(dashboardData);
  }, [dashboardData]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Edit Pool Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Pool Details</DialogTitle>
          <DialogDescription>
            Make changes to your pool details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="poolAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total pool amount</FormLabel>
                  <FormControl>
                    <Input placeholder="amount" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthlyPayment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly payment</FormLabel>
                  <FormControl>
                    <Input placeholder="amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="activeUsers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Active users</FormLabel>
                  <FormControl>
                    <Input placeholder="amount" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPoolDetails;
