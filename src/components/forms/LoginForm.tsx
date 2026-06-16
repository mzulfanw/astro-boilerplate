import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { actions } from "astro:actions"
import { loginSchema, type LoginInput } from "@/lib/schemas/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginInput) {
    const { error } = await actions.login(data)
    if (error) {
      setError("root", { message: error.message || "Invalid credentials" })
      return
    }
    window.location.assign("/dashboard")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" {...register("username")} placeholder="emilys" />
        {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register("password")} placeholder="emilyspass" />
        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
      </div>
      {errors.root && <p className="text-sm text-destructive">{errors.root.message}</p>}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  )
}
