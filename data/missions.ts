import type { Mission } from "@/lib/missions/types"

export const missions: Mission[] = [
  {
    id: "mission-common-1",
    name: "Retrieve the Lost Package",
    description: "A simple retrieval mission requiring basic skills.",
    difficulty: "Common",
    type: "Hybrid",
    baseSuccess: 50,
    baseReward: 50,
    components: {
      stealth: 50,
      planning: 50,
    },
    dropChance: 0,
    leaderboardPoints: 10,
    cooldownHours: 2,
    requiredSkills: ["stealth", "planning"],
    image: "/placeholder-j41as.png",
    status: "available",
  },
  {
    id: "mission-uncommon-1",
    name: "Hack the Security System",
    description: "Infiltrate a low-security system to extract data.",
    difficulty: "Uncommon",
    type: "Hybrid",
    baseSuccess: 40,
    baseReward: 100,
    components: {
      hacking: 70,
      stealth: 30,
    },
    dropChance: 0,
    leaderboardPoints: 20,
    cooldownHours: 4,
    requiredSkills: ["hacking", "stealth"],
    image: "/placeholder-sh5gk.png",
    status: "available",
  },
  {
    id: "mission-rare-1",
    name: "Decode the Lost Tablet",
    description: "Solve the ancient puzzle to reveal hidden treasures.",
    difficulty: "Rare",
    type: "Puzzle",
    baseSuccess: 30,
    baseReward: 200,
    components: {
      puzzle: 100,
    },
    dropChance: 0,
    leaderboardPoints: 50,
    cooldownHours: 6,
    requiredSkills: ["puzzle"],
    image: "/placeholder-5qrah.png",
    status: "available",
  },
  {
    id: "mission-epic-1",
    name: "Sabotage the Vault",
    description: "Use puzzle-solving and chaos to break into a high-security vault.",
    difficulty: "Epic",
    type: "Hybrid",
    baseSuccess: 25,
    baseReward: 300,
    components: {
      puzzle: 50,
      chaos: 50,
    },
    dropChance: 5,
    leaderboardPoints: 100,
    cooldownHours: 8,
    requiredSkills: ["puzzle", "chaos"],
    image: "/placeholder-y5dba.png",
    status: "available",
  },
  {
    id: "mission-legendary-1",
    name: "Steal the Mayor's Blackmail Files",
    description: "A high-stakes heist requiring perfect planning and execution.",
    difficulty: "Legendary",
    type: "Planning",
    baseSuccess: 20,
    baseReward: 500,
    components: {
      planning: 100,
    },
    dropChance: 5,
    leaderboardPoints: 200,
    cooldownHours: 12,
    requiredSkills: ["planning"],
    image: "/placeholder-bsp29.png",
    status: "available",
  },
  {
    id: "mission-legendary-2",
    name: "Infiltrate the Syndicate HQ",
    description: "A complex mission requiring hacking, stealth, and planning.",
    difficulty: "Legendary",
    type: "Hybrid",
    baseSuccess: 20,
    baseReward: 500,
    components: {
      hacking: 33,
      stealth: 33,
      planning: 34,
    },
    dropChance: 5,
    leaderboardPoints: 200,
    cooldownHours: 12,
    requiredSkills: ["hacking", "stealth", "planning"],
    image: "/placeholder.svg?height=400&width=400&query=infiltrate+headquarters",
    status: "available",
  },
  {
    id: "mission-mythic-1",
    name: "Steal the Eternal Artifact",
    description: "The ultimate heist requiring exceptional skills and perfect execution.",
    difficulty: "Mythic",
    type: "Hybrid",
    baseSuccess: 10,
    baseReward: 1000,
    components: {
      hacking: 25,
      stealth: 25,
      planning: 25,
      puzzle: 25,
    },
    dropChance: 10,
    leaderboardPoints: 500,
    cooldownHours: 24,
    requiredSkills: ["hacking", "stealth", "planning", "puzzle"],
    image: "/placeholder.svg?height=400&width=400&query=mythical+artifact+heist",
    status: "available",
  },
]

export const missionHistory = [
  {
    id: "history-1",
    missionId: "mission-legendary-1",
    missionName: "Steal the Mayor's Blackmail Files",
    difficulty: "Legendary" as const,
    timestamp: "2025-05-14T14:30:00Z",
    team: [
      {
        id: "nft-1",
        name: "Victor Moretti",
        rarity: "Legendary",
        stakingPower: 1000,
        skills: [{ type: "Planning", value: 20 }],
        specialAbility: "Double planning rewards",
        crew: "Syndicate",
        image: "/placeholder-7i9v8.png",
      },
      {
        id: "nft-2",
        name: "Goldie Jenkins",
        rarity: "Legendary",
        stakingPower: 1000,
        skills: [{ type: "Planning", value: 20 }],
        specialAbility: "2x planning influence",
        crew: "Jailbirds",
        image: "/placeholder-e0ii2.png",
      },
      {
        id: "nft-3",
        name: "Theodore Diggers",
        rarity: "Legendary",
        stakingPower: 1000,
        skills: [{ type: "Support", value: 10 }],
        specialAbility: "30% reduced damage for team",
        crew: "Gold Diggers",
        image: "/placeholder-l6cn1.png",
      },
    ],
    result: {
      success: true,
      rewards: {
        baseDIGR: 500,
        stakingBonus: 150,
        abilityMultipliedDIGR: 1000,
        totalDIGR: 1150,
        nftDropChance: 5,
        effectiveDropChance: 4.5,
        leaderboardPoints: 200,
        nftDropped: false,
      },
    },
  },
  {
    id: "history-2",
    missionId: "mission-epic-1",
    missionName: "Sabotage the Vault",
    difficulty: "Epic" as const,
    timestamp: "2025-05-14T10:15:00Z",
    team: [
      {
        id: "nft-4",
        name: "Gina Diggers",
        rarity: "Common",
        stakingPower: 100,
        skills: [{ type: "Puzzle", value: 15 }],
        specialAbility: "Double puzzle rewards",
        crew: "Gold Diggers",
        image: "/placeholder-whh95.png",
      },
      {
        id: "nft-5",
        name: "Ophelia Martinez",
        rarity: "Rare",
        stakingPower: 200,
        skills: [{ type: "Chaos", value: 10 }],
        specialAbility: "2x chaos rewards",
        crew: "Syndicate",
        image: "/placeholder-hvo30.png",
      },
      {
        id: "nft-6",
        name: "Winters",
        rarity: "Rare",
        stakingPower: 200,
        skills: [{ type: "Strategy", value: 15 }],
        specialAbility: "2x strategy influence",
        crew: "Jailbirds",
        image: "/placeholder-l6cn1.png",
      },
    ],
    result: {
      success: true,
      rewards: {
        baseDIGR: 300,
        stakingBonus: 25,
        abilityMultipliedDIGR: 600,
        totalDIGR: 625,
        nftDropChance: 5,
        effectiveDropChance: 4.25,
        leaderboardPoints: 100,
        nftDropped: true,
        nftDroppedRarity: "Epic",
      },
    },
  },
]

export const leaderboard = [
  {
    id: "leader-1",
    walletAddress: "8xJ4Lm...7Yp2",
    displayName: "CryptoKing",
    points: 1200,
    completedMissions: 5,
    rank: 1,
    rewards: 1000,
  },
  {
    id: "leader-2",
    walletAddress: "3rT9Kp...2Zq8",
    displayName: "DiggerQueen",
    points: 950,
    completedMissions: 4,
    rank: 2,
    rewards: 750,
  },
  {
    id: "leader-3",
    walletAddress: "5mN7Jd...9Xw3",
    displayName: "SolanaWhale",
    points: 820,
    completedMissions: 6,
    rank: 3,
    rewards: 500,
  },
  {
    id: "leader-4",
    walletAddress: "2bP8Rt...4Ys6",
    displayName: "JailbirdMaster",
    points: 780,
    completedMissions: 7,
    rank: 4,
    rewards: 400,
  },
  {
    id: "leader-5",
    walletAddress: "7cQ1Wz...3Vf9",
    displayName: "SyndicateBoss",
    points: 650,
    completedMissions: 3,
    rank: 5,
    rewards: 300,
  },
]
