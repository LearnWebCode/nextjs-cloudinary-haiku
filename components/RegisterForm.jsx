"use client"

import { useFormState, useFormStatus } from "react-dom"
import { register } from "../actions/userController"

function OurButton() {
  const { pending } = useFormStatus()

  return <button className="btn btn-primary">{pending ? "Submitting..." : "Create Account"}</button>
}

export default function RegisterForm() {
  const [formState, formAction] = useFormState(register, {
    errors: [],
    success: false
  })

  return (
    <div>
      <p className="text-center text-2xl text-gray-600 mb-5">
        Don&rsquo;t have an account? <strong>Create One</strong>
      </p>

      <form action={formAction} className="max-w-xs mx-auto">
        <div className="mb-3">
          <input
            name="username"
            type="text"
            placeholder="Username"
            autoComplete="off"
            className={"input input-bordered w-full max-w-xs " + (formState.errors?.username ? "input-error" : "")}
          />

          {formState.errors?.username && (
            <div role="alert" className="alert alert-error py-2 max-w-xs">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{formState.errors?.username}</span>
            </div>
          )}
        </div>

        <div className="mb-3">
          <input
            name="password"
            type="password"
            placeholder="password"
            className={"input input-bordered w-full max-w-xs " + (formState.errors?.password ? "input-error" : "")}
          />

          {formState.errors?.password && (
            <div role="alert" className="alert alert-error py-2 max-w-xs">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{formState.errors?.password}</span>
            </div>
          )}
        </div>

        <OurButton />
      </form>
    </div>
  )
}
