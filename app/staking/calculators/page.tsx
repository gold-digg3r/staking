import type { Metadata } from "next"
import { CompoundInterestCalculator } from "@/components/staking/calculators/compound-interest-calculator"
import { APRtoAPYCalculator } from "@/components/staking/calculators/apr-to-apy-calculator"

export const metadata: Metadata = {
  title: "Staking Calculators | Gold Digger",
  description: "Calculate your potential staking rewards with our interactive calculators",
}

export default function CalculatorsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Staking Calculators</h1>
        <p className="text-muted-foreground">
          Calculate your potential staking rewards with our interactive calculators
        </p>
      </div>

      <div className="grid gap-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">APR to APY Calculator</h2>
            <p className="text-muted-foreground">
              Understand the difference between APR and APY and how compounding frequency affects your returns
            </p>
          </div>
          <div></div>
        </div>

        <APRtoAPYCalculator />

        <div className="grid gap-8 lg:grid-cols-2 mt-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Compound Interest Calculator</h2>
            <p className="text-muted-foreground">
              Compare standard interest vs compound interest for your token staking investments
            </p>
          </div>
          <div></div>
        </div>

        <CompoundInterestCalculator />

        <div className="bg-gold-500/5 border border-gold-500/10 rounded-lg p-6 mt-4">
          <h2 className="text-2xl font-bold mb-4">Understanding Staking Returns</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold mb-3">APR vs APY</h3>
              <p className="text-muted-foreground mb-4">
                <strong>APR (Annual Percentage Rate)</strong> is the simple interest rate stated for a year, without
                accounting for compounding. It's the base rate that staking protocols often use internally.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>APY (Annual Percentage Yield)</strong> is the effective annual rate of return taking into
                account the effect of compounding. This is usually higher than APR and represents what you'll actually
                earn over a year.
              </p>
              <p className="text-muted-foreground">
                When comparing staking opportunities, always look at the APY to understand your true potential returns.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Compound Interest</h3>
              <p className="text-muted-foreground mb-4">
                Compound interest is the addition of interest to the principal sum of a loan or deposit, or in other
                words, interest on interest. It is the result of reinvesting interest, rather than paying it out, so
                that interest in the next period is earned on the principal sum plus previously accumulated interest.
              </p>
              <p className="text-muted-foreground">
                The power of compounding is that it accelerates the growth of your investments over time, especially
                over longer periods. This is why enabling auto-compounding for your staking positions can significantly
                increase your returns.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Maximizing Your Staking Returns</h3>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Choose tokens with higher APR rates when available</li>
              <li>Stake for longer durations to benefit from higher rates</li>
              <li>Enable auto-compounding to automatically reinvest your rewards</li>
              <li>Select more frequent compounding intervals when available</li>
              <li>Diversify your staking across different tokens and durations</li>
              <li>Regularly check for special staking promotions or boosted rewards</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
