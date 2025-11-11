"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Checkbox, Alert } from "antd";
import { AuthService, type IUser } from "@/lib/api";
import Link from "next/link";
import { AxiosError } from "axios";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const handleSignUp = async (values: IUser) => {
    try {
      setLoading(true);
      setErrorMessage("");
      const signUpData: IUser = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      const response = await AuthService.signUp(signUpData);
      AuthService.saveToken(response.access_token);
      router.push("/dashboard");
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      setErrorMessage(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden relative">
      <div className="absolute inset-0 z-0 hidden md:hidden mobile-bg">
        <img
          src="/login.png"
          alt="Background"
          className="w-full h-full object-cover blur-[8px]"
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-5 py-10 md:px-10 bg-white relative z-10 md:bg-white/95 md:backdrop-blur-[10px] md:rounded-[20px] md:m-5">
        <div className="w-full max-w-[400px]">
          <h1 className="text-[32px] font-bold mb-2 text-black">
            Get Started Now
          </h1>

          <Form
            name="signup"
            onFinish={handleSignUp}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              label={<span className="text-black">Name</span>}
              name="name"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input
                placeholder="Enter your name"
                className="h-[45px] rounded-lg border-gray-300"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-black">Email</span>}
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Invalid email!" },
              ]}
            >
              <Input
                placeholder="Enter your email"
                className="h-[45px] rounded-lg border-gray-300"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-black">Password</span>}
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password
                placeholder="Enter password"
                className="h-[45px] rounded-lg border-gray-300"
              />
            </Form.Item>

            <Form.Item
              name="terms"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Please accept terms & policy")
                        ),
                },
              ]}
              className="mb-6"
            >
              <Checkbox>
                I agree to the{" "}
                <Link href="#" className="text-[#00b4a8] hover:underline">
                  terms & policy
                </Link>
              </Checkbox>
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="h-[45px] rounded-lg bg-[#4a7c59] hover:bg-[#3d6849] border-none text-base font-medium mb-5"
            >
              Signup
            </Button>

            {errorMessage && (
              <Alert
                message={errorMessage}
                type="error"
                showIcon
                closable
                onClose={() => setErrorMessage("")}
                className="mb-5"
              />
            )}

            <div className="text-center text-gray-400 mb-5 text-sm">Or</div>

            <div className="flex gap-3 mb-8">
              <Button
                block
                className="h-[45px] rounded-lg border-gray-300 flex items-center justify-center gap-2"
              >
                <span className="text-lg">G</span> Sign in with Google
              </Button>
              <Button
                block
                className="h-[45px] rounded-lg border-gray-300 flex items-center justify-center gap-2"
              >
                <span className="text-lg"></span> Sign in with Apple
              </Button>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-600">Have an account? </span>
              <Link
                href="/login"
                className="text-[#00b4a8] font-medium hover:underline"
              >
                Sign In
              </Link>
            </div>
          </Form>
        </div>
      </div>

      <div className="hidden md:flex flex-1 bg-gray-100 items-center justify-center relative overflow-hidden">
        <img
          src="/login.png"
          alt="Signup illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
