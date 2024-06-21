"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSession, signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export function LoginForm() {
  const router = useRouter();
  const { data: session } = useSession();

  console.log("user session is ", session);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    try {
      const res = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (res?.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log("Error login ", err);
    }
  }

  return (
    <div className="flex justify-center items-center w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-start max-w-[400px] w-full  py-[35px] px-[40px]"
        >
          <h1 className="text-4xl font-bold mb-6 ">Login</h1>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="max-w-[400px] w-full mb-[30px]">
                <FormLabel className="text-[16px] font-bold mb-[10px] w-full">
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="user1122"
                    {...field}
                    className="max-w-[400px] font-light py-2 px-[10px]  w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="max-w-[400px] w-full mb-[30px]">
                <FormLabel className="text-[16px] font-bold mb-[10px] w-full">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Your password"
                    {...field}
                    className="max-w-[400px] font-light py-2 px-[10px] w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="max-w-[400px] w-full rounded-[25px] mb-2"
          >
            Submit
          </Button>
          <FormDescription className="text-[14px] text-black">
            Create Account
          </FormDescription>
        </form>
      </Form>
    </div>
  );
}
