"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, Link } from "react-router-dom";
import React from "react";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";

// Define the form schema using Zod
const formSchema = z.object({
  email: z.string().email({ message: "无效的邮箱地址。" }),
  password: z.string().min(6, { message: "密码必须至少为6个字符。" }),
});

const Login = () => {
  console.log("Login page loaded");
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // This is where you would typically handle authentication
    console.log("Login attempt with:", values);
    // Simulate successful login and navigate to the dashboard
    navigate("/"); // Navigate to the root route which is the Dashboard
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-sm mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">商店脉搏</CardTitle>
          <CardDescription>
            欢迎回来！请输入您的凭据以登录。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>电子邮件</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
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
                    <FormLabel>密码</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                登录
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
            <p className="text-sm text-center text-muted-foreground">
                <Link to="#" className="underline">
                    忘记密码？
                </Link>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;