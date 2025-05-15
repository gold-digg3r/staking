interface PageTitleProps {
  title: string
  description?: string
  className?: string
}

export function PageTitle({ title, description, className = "" }: PageTitleProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
      {description && <p className="mt-2 text-lg text-muted-foreground">{description}</p>}
    </div>
  )
}
