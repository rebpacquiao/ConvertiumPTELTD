"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { passwordSchema } from "@/validation/passwordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginUser } from "./action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import GoogleSignin from "./GoogleSignin";

const formSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

export default function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setServerError(null);
    setIsLoading(true);

    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (response.error) {
        setServerError(response.message);
      } else {
        // Redirect to the dashboard page
        router.push("/dashboard");
      }
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const email = form.getValues("email");

  return (
    <main className="flex bg-custom-gradient justify-center items-center min-h-screen">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle className="text-white text-2xl">
            Sign in to your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email address</FormLabel>
                    <FormControl>
                      <Input {...field} className="text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        className="text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {serverError && (
                <p className="text-red-500 text-sm mt-2">{serverError}</p>
              )}

              <Button
                className="bg-blue-500 hover:bg-blue-500"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
              <GoogleSignin />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <div className="text-muted-foreground text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="underline">
              Register
            </Link>
          </div>
          <div className="text-muted-foreground text-sm">
            Forgot password?{" "}
            <Link
              href={`/forgot-password${
                email ? `?email=${encodeURIComponent(email)}` : ""
              }`}
              className="underline"
            >
              Reset my password
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
