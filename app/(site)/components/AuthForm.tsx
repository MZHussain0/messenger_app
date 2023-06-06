"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/Inputs/Input";
import { FC, useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";

interface AuthFormProps {}

type Variant = "LOGIN" | "REGISTER";

const AuthForm: FC<AuthFormProps> = ({}) => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      //axios register
    }

    if (variant === "LOGIN") {
      //nextAuth signIn
    }
  };

  const socialActions = (action: string) => {
    setIsLoading(true);
    // NextAuth socialLogin
  };
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input id="name" label="Name" register={register} errors={errors} />
          )}

          <Input
            id="email"
            label="Email Address"
            register={register}
            errors={errors}
          />
          <Input
            id="password"
            label="Password"
            register={register}
            errors={errors}
          />

          <div className="">
            <Button disabled={isLoading} type="submit" fullWidth>
              {variant === "LOGIN" ? "Sign In" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialActions("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialActions("google")}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === "LOGIN"
              ? "New to messenger? "
              : "Already have an account? "}
          </div>
          <div onClick={toggleVariant} className="cursor-pointer underline">
            {variant === "LOGIN" ? "Register" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
