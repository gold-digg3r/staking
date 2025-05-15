import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw, TrendingUp, Clock, Calculator } from "lucide-react"

export function AutoCompoundExplainer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <RefreshCw className="mr-2 h-5 w-5 text-gold-500" />
          Auto-Compound Rewards
        </CardTitle>
        <CardDescription>Maximize your earnings with automatic reinvestment</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Auto-compounding automatically reinvests your earned rewards back into your staking position, allowing you
            to earn interest on your interest and maximize your returns over time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-5 w-5 mr-2 text-gold-500" />
                <h3 className="font-medium">Higher Returns</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Earn significantly more over time compared to standard staking through the power of compound interest.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 mr-2 text-gold-500" />
                <h3 className="font-medium">Weekly Compounding</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Your rewards are automatically reinvested on a weekly basis for optimal growth.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Calculator className="h-5 w-5 mr-2 text-gold-500" />
                <h3 className="font-medium">Compound Effect</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                The longer your staking period, the greater the impact of compounding on your total returns.
              </p>
            </div>
          </div>

          <div className="bg-gold-500/5 border border-gold-500/10 rounded-lg p-4">
            <h3 className="font-medium mb-2">Example: The Power of Compounding</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Standard Staking:</span> 1,000 DIGR at 15% APR for 90 days = 37.5 DIGR
                rewards
              </p>
              <p>
                <span className="font-medium">With Auto-Compound:</span> 1,000 DIGR at 15% APR for 90 days with weekly
                compounding = 39.8 DIGR rewards
              </p>
              <p className="text-gold-500 font-medium">That's a 6.1% increase in your returns!</p>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>
              Note: Auto-compounding can be enabled when creating a new staking position or toggled for existing
              positions. A small network fee applies for each compounding transaction.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
