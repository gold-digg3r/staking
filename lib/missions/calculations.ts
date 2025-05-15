import type { Mission, DeployedNFT, MissionTeam, MissionReward, MissionResult } from "./types"

// Constants
const STAKING_BONUS_MULTIPLIER = 0.05
const SUCCESS_RATE_CAP = 95
const EPOCHS_PER_YEAR = 146
const ECOSYSTEM_FEE = 0.02
const ANNUAL_YIELD_RATE = 0.054

/**
 * Calculate the staking power bonus for a mission
 */
export function calculateStakingBonus(totalStakingPower: number): number {
  return totalStakingPower * STAKING_BONUS_MULTIPLIER
}

/**
 * Calculate the success rate for a mission based on the team's skills
 */
export function calculateSuccessRate(mission: Mission, team: DeployedNFT[]): number {
  let successRate = mission.baseSuccess

  // Add skill bonuses
  team.forEach((nft) => {
    nft.skills.forEach((skill) => {
      // Check if the skill is relevant to the mission
      const skillType = skill.type.toLowerCase()
      if (mission.requiredSkills.includes(skillType as any)) {
        // Apply skill bonus
        let skillBonus = skill.value

        // Check for skill multiplier abilities (e.g., "2x planning influence")
        if (nft.specialAbility.toLowerCase().includes(`${skillType} influence`)) {
          if (nft.specialAbility.includes("2x")) {
            skillBonus *= 2
          } else if (nft.specialAbility.includes("1.5x")) {
            skillBonus *= 1.5
          }
        }

        successRate += skillBonus
      }
    })
  })

  // Cap success rate at 95%
  return Math.min(successRate, SUCCESS_RATE_CAP)
}

/**
 * Calculate the reward multipliers from special abilities
 */
export function calculateAbilityMultipliers(mission: Mission, team: DeployedNFT[]): { [key: string]: number } {
  const multipliers: { [key: string]: number } = {}

  // Initialize multipliers for each component
  Object.keys(mission.components).forEach((component) => {
    multipliers[component] = 1.0
  })

  // Apply ability multipliers
  team.forEach((nft) => {
    const ability = nft.specialAbility.toLowerCase()

    // Check for reward multiplier abilities
    Object.keys(mission.components).forEach((component) => {
      if (ability.includes(`${component} rewards`)) {
        let multiplier = 1.0

        if (ability.includes("double")) {
          multiplier = 2.0
        } else if (ability.includes("triple")) {
          multiplier = 3.0
        } else if (ability.includes("2x")) {
          multiplier = 2.0
        } else if (ability.includes("1.5x")) {
          multiplier = 1.5
        }

        // Apply the highest multiplier
        if (multiplier > multipliers[component]) {
          multipliers[component] = multiplier
        }
      }
    })

    // Check for mission-wide multipliers
    if (ability.includes("mission rewards")) {
      let multiplier = 1.0

      if (ability.includes("double")) {
        multiplier = 2.0
      } else if (ability.includes("triple")) {
        multiplier = 3.0
      } else if (ability.includes("2x")) {
        multiplier = 2.0
      } else if (ability.includes("1.5x")) {
        multiplier = 1.5
      }

      // Apply to all components
      Object.keys(mission.components).forEach((component) => {
        if (multiplier > multipliers[component]) {
          multipliers[component] = multiplier
        }
      })
    }
  })

  return multipliers
}

/**
 * Calculate the total reward for a mission
 */
export function calculateMissionReward(mission: Mission, team: DeployedNFT[], successRate: number): MissionReward {
  // Calculate total staking power
  const totalStakingPower = team.reduce((sum, nft) => sum + nft.stakingPower, 0)

  // Calculate staking bonus
  const stakingBonus = calculateStakingBonus(totalStakingPower)

  // Calculate ability multipliers
  const multipliers = calculateAbilityMultipliers(mission, team)

  // Calculate base reward with ability multipliers
  let abilityMultipliedDIGR = 0

  Object.entries(mission.components).forEach(([component, percentage]) => {
    const componentReward = mission.baseReward * (percentage / 100)
    const multipliedReward = componentReward * multipliers[component]
    abilityMultipliedDIGR += multipliedReward
  })

  // Calculate total DIGR reward
  const totalDIGR = abilityMultipliedDIGR + stakingBonus

  // Calculate NFT drop chance
  const effectiveDropChance = (mission.dropChance * successRate) / 100

  return {
    baseDIGR: mission.baseReward,
    stakingBonus,
    abilityMultipliedDIGR,
    totalDIGR,
    nftDropChance: mission.dropChance,
    effectiveDropChance,
    leaderboardPoints: mission.leaderboardPoints,
    nftDropped: false,
  }
}

/**
 * Calculate the result of a mission
 */
export function calculateMissionResult(mission: Mission, team: DeployedNFT[]): MissionResult {
  // Calculate success rate
  const successRate = calculateSuccessRate(mission, team)

  // Generate random roll (1-100)
  const randomRoll = Math.floor(Math.random() * 100) + 1

  // Determine success
  const success = randomRoll <= successRate

  // Calculate rewards
  const rewards = calculateMissionReward(mission, team, successRate)

  // Check for NFT drop if successful
  if (success) {
    const dropRoll = Math.floor(Math.random() * 100) + 1
    rewards.nftDropped = dropRoll <= rewards.effectiveDropChance * 100

    // Determine NFT rarity if dropped
    if (rewards.nftDropped) {
      const rarityRoll = Math.random()
      if (rarityRoll < 0.1) {
        rewards.nftDroppedRarity = "Mythic"
      } else if (rarityRoll < 0.3) {
        rewards.nftDroppedRarity = "Legendary"
      } else {
        rewards.nftDroppedRarity = "Epic"
      }
    }
  }

  // Calculate cooldown if failed
  let cooldownEnds: string | undefined

  if (!success) {
    // Apply cooldown reduction abilities
    let cooldownReduction = 0

    team.forEach((nft) => {
      const ability = nft.specialAbility.toLowerCase()

      if (ability.includes("faster") && ability.includes("cooldown")) {
        let reduction = 0

        if (ability.includes("50%")) {
          reduction = 0.5
        } else if (ability.includes("30%")) {
          reduction = 0.3
        }

        cooldownReduction = Math.max(cooldownReduction, reduction)
      }
    })

    // Calculate cooldown end time
    const now = new Date()
    const cooldownHours = mission.cooldownHours * (1 - cooldownReduction)
    const cooldownMs = cooldownHours * 60 * 60 * 1000
    const endTime = new Date(now.getTime() + cooldownMs)

    cooldownEnds = endTime.toISOString()
  }

  return {
    success,
    rewards,
    cooldownEnds,
    randomRoll,
    successThreshold: successRate,
  }
}

/**
 * Calculate annual DIGR yield based on staking power
 */
export function calculateAnnualYield(stakingPower: number): number {
  return stakingPower * ANNUAL_YIELD_RATE
}

/**
 * Calculate per-epoch yield (after fee)
 */
export function calculateEpochYield(stakingPower: number): number {
  const annualYield = calculateAnnualYield(stakingPower)
  const epochYield = annualYield / EPOCHS_PER_YEAR
  return epochYield * (1 - ECOSYSTEM_FEE)
}

/**
 * Estimate team performance for a mission
 */
export function estimateTeamPerformance(mission: Mission, team: DeployedNFT[]): MissionTeam {
  const totalStakingPower = team.reduce((sum, nft) => sum + nft.stakingPower, 0)
  const successRate = calculateSuccessRate(mission, team)
  const estimatedReward = calculateMissionReward(mission, team, successRate)
  const effectiveDropChance = (mission.dropChance * successRate) / 100

  return {
    nfts: team,
    totalStakingPower,
    successRate,
    effectiveDropChance,
    estimatedReward,
  }
}
