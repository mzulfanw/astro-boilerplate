import { AlertCircle } from "lucide-react"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"

interface ErrorStateProps {
  title?: string
  description?: string
  retry?: () => void
}

export function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again later.",
  retry,
}: ErrorStateProps) {
  return (
    <Card className="py-12 text-center">
      <CardHeader>
        <div className="mb-4 flex justify-center">
          <AlertCircle className="size-12 text-destructive/50" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      {retry && (
        <CardFooter className="justify-center">
          <button
            type="button"
            onClick={retry}
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs hover:bg-primary/90"
          >
            Try Again
          </button>
        </CardFooter>
      )}
    </Card>
  )
}
