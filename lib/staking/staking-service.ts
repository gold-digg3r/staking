// Export only async functions, no objects
export async function getStakingPositions(walletAddress: string) {
  // Mock implementation
  return []
}

export async function stakeNFT(params: { walletAddress: string; nftId: string; poolId: string }) {
  // Mock implementation
  return {
    id: "position-1",
    walletAddress: params.walletAddress,
    nftId: params.nftId,
    poolId: params.poolId,
    stakedAt: new Date().toISOString(),
    rewards: 0,
  }
}

export async function unstakeNFT(params: { walletAddress: string; positionId: string }) {
  // Mock implementation
  return {
    success: true,
    rewards: 100,
  }
}
