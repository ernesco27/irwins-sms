"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata.role;

    if (role) {
      router.push(`${role}`);
    }
  }, [user, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-irwinSkyLight">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className=" bg-white p-12 rounded-md shadow-2xl flex flex-col gap-6"
        >
          <h1 className="text-3xl flex items-center justify-center gap-2 font-bold">
            <Image src="/logo.png" alt="" width={24} height={24} />
            IrwinsSMS
          </h1>
          <h2 className="text-gray-400 flex justify-center text-lg">
            Sign In to your Account
          </h2>
          <Clerk.GlobalError className="text-sm text-red-400" />
          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label className="text-sm text-gray-500">
              Username
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="p-2 rounded-md ring-1 ring-gray-300 w-96"
            />
            <Clerk.FieldError className="text-sm text-red-400" />
          </Clerk.Field>
          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-sm text-gray-500">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-sm text-red-400" />
          </Clerk.Field>
          <SignIn.Action
            submit
            className="bg-blue-500 text-white my-3 rounded-md text-xl p-[10px] "
          >
            Sign In
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default LoginPage;
