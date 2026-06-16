import { type LucideIcon } from "lucide-react"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick?: () => void
    href?: string
  }
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <Card className="py-12 text-center">
      <CardHeader>
        {Icon && (
          <div className="mb-4 flex justify-center">
            <Icon className="size-12 text-muted-foreground/50" />
          </div>
        )}
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      {action && (
        <CardFooter className="justify-center">
          {action.href ? (
            <a
              href={action.href}
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs hover:bg-primary/90"
            >
              {action.label}
            </a>
          ) : (
            <button
              type="button"
              onClick={action.onClick}
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs hover:bg-primary/90"
            >
              {action.label}
            </button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
