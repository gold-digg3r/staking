import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HowItWorks() {
  const steps = [
    {
      title: "Choose a Pool",
      description: "Select a staking pool that matches your investment strategy and time horizon.",
      icon: "🔍",
    },
    {
      title: "Stake Your NFTs",
      description: "Deposit your Gold Digger NFTs into the selected pool to start earning rewards.",
      icon: "💰",
    },
    {
      title: "Earn Rewards",
      description: "Accumulate GOLD tokens as rewards based on the pool's APY and your staking duration.",
      icon: "✨",
    },
    {
      title: "Claim or Compound",
      description: "Withdraw your rewards or reinvest them to maximize your earnings over time.",
      icon: "📈",
    },
  ]

  return (
    <div className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-8 md:mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How Staking Works</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Follow these simple steps to start earning passive income with your NFTs
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <CardTitle>
                  Step {index + 1}: {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
