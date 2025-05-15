import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BadgeInfo {
  name: string
  description: string
  variant: "default" | "secondary" | "destructive" | "outline"
}

const badges: BadgeInfo[] = [
  {
    name: "Early Adopter",
    description: "Joined during the platform launch phase",
    variant: "default",
  },
  {
    name: "Diamond Hands",
    description: "Held NFTs for over 6 months",
    variant: "secondary",
  },
  {
    name: "Whale",
    description: "Holds more than 10 NFTs from the same collection",
    variant: "outline",
  },
  {
    name: "Power Staker",
    description: "Staked assets worth over 1000 DIGR",
    variant: "default",
  },
  {
    name: "Collector",
    description: "Owns NFTs from at least 3 different collections",
    variant: "secondary",
  },
  {
    name: "Top 10",
    description: "Ranked in the top 10 on the leaderboard",
    variant: "destructive",
  },
]

export default function BadgesShowcase() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievement Badges</CardTitle>
        <CardDescription>Earn these badges by participating in the Gold Digger ecosystem</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {badges.map((badge) => (
            <div key={badge.name} className="flex flex-col gap-2 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{badge.name}</h3>
                <Badge variant={badge.variant}>{badge.name}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
