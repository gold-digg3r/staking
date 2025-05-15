"use server"

// Define the getStakingHistory function
export async function getStakingHistory(owner: string) {
  // Mock implementation
  return [
    {
      id: "history-1",
      user_id: owner,
      nft_id: "nft-123",
      pool_id: "pool-1",
      type: "stake",
      amount: null,
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "history-2",
      user_id: owner,
      nft_id: "nft-456",
      pool_id: "pool-1",
      type: "unstake",
      amount: null,
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]
}

// Define other staking-related functions
export async function getStakingPool(id: string) {
  // Mock implementation
  return {
    id,
    name: "Gold Digger Staking Pool",
    description: "Stake your Gold Digger NFTs to earn DIGR tokens",
    reward_token_mint: "GLD1234567890abcdef",
    reward_token_symbol: "DIGR",
    reward_token_icon: "/gold-token-icon.png",
    reward_rate: 10,
    total_staked: 156,
    requires_collection: "Gold Digger",
    min_staking_period: 7,
    lockup_period: 2,
    early_unstake_penalty: 20,
    is_active: true,
    created_at: new Date("2023-01-01").toISOString(),
    updated_at: new Date("2023-05-15").toISOString(),
  }
}

export async function getStakingStats(owner: string) {
  // Mock implementation
  return {
    total_staked: 5,
    total_rewards: 250,
    total_claimed: 100,
    total_pending: 150,
  }
}
