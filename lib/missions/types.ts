export type MissionDifficulty = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary" | "Mythic"
export type MissionType = "Puzzle" | "Chaos" | "Planning" | "Hacking" | "Stealth" | "Combat" | "Hybrid"
export type MissionComponent = "puzzle" | "chaos" | "planning" | "hacking" | "stealth" | "combat" | "support"
export type MissionStatus = "available" | "in_progress" | "completed" | "failed" | "cooldown"

export interface MissionComponentBreakdown {
  [key: string]: number // percentage of each component (0-100)
}

export interface MissionReward {
  baseDIGR: number
  stakingBonus: number
  abilityMultipliedDIGR: number
  totalDIGR: number
  nftDropChance: number
  effectiveDropChance: number
  leaderboardPoints: number
  nftDropped?: boolean
  nftDroppedRarity?: string
}

export interface MissionResult {
  success: boolean
  rewards: MissionReward
  cooldownEnds?: string
  randomRoll?: number
  successThreshold?: number
}

export interface Mission {
  id: string
  name: string
  description: string
  difficulty: MissionDifficulty
  type: MissionType
  baseSuccess: number
  baseReward: number
  components: MissionComponentBreakdown
  dropChance: number
  leaderboardPoints: number
  cooldownHours: number
  requiredSkills: MissionComponent[]
  image: string
  status: MissionStatus
  cooldownEnds?: string
}

export interface DeployedNFT {
  id: string
  name: string
  rarity: string
  stakingPower: number
  skills: Array<{ type: string; value: number }>
  specialAbility: string
  crew: string
  image: string
}

export interface MissionTeam {
  nfts: DeployedNFT[]
  totalStakingPower: number
  successRate: number
  effectiveDropChance: number
  estimatedReward: MissionReward
}

export interface MissionHistoryEntry {
  id: string
  missionId: string
  missionName: string
  difficulty: MissionDifficulty
  timestamp: string
  team: DeployedNFT[]
  result: MissionResult
}

export interface LeaderboardEntry {
  id: string
  walletAddress: string
  displayName: string
  points: number
  completedMissions: number
  rank: number
  rewards: number
}

export interface MissionState {
  availableMissions: Mission[]
  activeMissions: Mission[]
  completedMissions: MissionHistoryEntry[]
  leaderboard: LeaderboardEntry[]
  selectedMission: Mission | null
  selectedTeam: DeployedNFT[]
  missionResult: MissionResult | null
  isLoading: boolean
  error: string | null
}
