"use client"
import Logo from "@/components/Logo";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginSchema, LoginSchemaType} from "@/app/auth/signin/models";
import {useRouter} from "next/navigation";
import userStore from "@/stores/userStore";

// TODO: divide this component into smaller components
export default function AuthForm() {

  const {
    register,
    handleSubmit,
    setError,
    formState: {errors}
  } = useForm<LoginSchemaType>({resolver: zodResolver(LoginSchema)});
  const router = useRouter()

  const onSubmit = (data: LoginSchemaType) => {
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    }).then(async r => {
      const responseJson = await r.json()
      if (r.ok) {
        userStore.setState(state => ({
            ...state,
            isAuthenticated: true,
            username: responseJson.username,
            email: responseJson.email,
            avatar: responseJson.avatar,
            tokens: {
              access: responseJson.tokens.access,
              refresh: responseJson.tokens.refresh
            }
          })
        )
        router.push("/dashboard")
        return
      }

      Object.keys(responseJson).forEach((key) => {
        if (responseJson[key as keyof LoginSchemaType].length === 0) return
        setError(key as keyof LoginSchemaType, {
          type: "manual",
          message: responseJson[key as keyof LoginSchemaType][0]
        })
      })
      console.log(responseJson)
    })

  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Logo className="mx-auto h-10 text-center"/>
          <h2 className="mt-6 text-center text-4xl font-bold leading-9 tracking-tight text-white">
            Sign in
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                  Username
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    id="username"
                    {...register("username", {required: true})}
                    className={`px-2 block w-full rounded-md border-0 py-1.5 ring-1 ring-inset ${
                      errors.username
                        ? "ring-red-500 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500"
                        : ""
                    } sm:text-sm sm:leading-6`}
                    placeholder="witson"
                    autoComplete={"username"}
                    aria-invalid={errors.username ? "true" : "false"}
                    aria-describedby={errors.username ? "username-error" : ""}
                  />
                  {errors.username && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" role="alert">
                      <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                           className="h-5 w-5 text-red-500" aria-hidden={true}>
                        <path d="M3 3h16v2H5v14h14v2H3V3zm18 0h-2v18h2V3zM11 15h2v2h-2v-2zm2-8h-2v6h2V7z"
                              fill="currentColor"/>
                      </svg>
                    </div>
                  )}
                </div>
                {errors.username && (
                  <p className="mt-2 text-sm text-red-600" id="username-error" role="alert">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="password"
                    id="password"
                    {...register("password", {required: true})}
                    className={`px-2 block w-full rounded-md border-0 py-1.5 ring-1 ring-inset ${
                      errors.password
                        ? "ring-red-500 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500"
                        : ""
                    } sm:text-sm sm:leading-6`}
                    placeholder="Password"

                    autoComplete={"password"}
                    aria-invalid={errors.password ? "true" : "false"}
                    aria-describedby={errors.password ? "password-error" : ""}
                  />
                  {errors.password && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" role="alert">
                      <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                           className="h-5 w-5 text-red-500" aria-hidden={true}>
                        <path d="M3 3h16v2H5v14h14v2H3V3zm18 0h-2v18h2V3zM11 15h2v2h-2v-2zm2-8h-2v6h2V7z"
                              fill="currentColor"/>
                      </svg>
                    </div>
                  )}
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600" id="password-error" role="alert">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-white">
                    Remember me
                  </label>
                </div>

                <div className="text-sm leading-6">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div>
              <div className="relative mt-10">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200"/>
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="px-6 text-white bg-gray-900">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <a
                  href="#"
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
                >
                  <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                  <span className="text-sm font-semibold leading-6">Twitter</span>
                </a>

                <a
                  href="#"
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
                >
                  <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-semibold leading-6">GitHub</span>
                </a>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-200">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
