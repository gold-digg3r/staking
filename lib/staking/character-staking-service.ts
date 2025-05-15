// Export only async functions, no objects
export async function getCharacterStakingPositions(walletAddress: string) {
  // Mock implementation
  return []
}

export async function stakeCharacter(params: { walletAddress: string; character: any; duration?: number }) {
  // Mock implementation
  return {
    id: "position-1",
    walletAddress: params.walletAddress,
    characterId: params.character.id,
    stakedAt: new Date().toISOString(),
    duration: params.duration || 30,
    rewards: 0,
  }
}

export async function unstakeCharacter(params: { walletAddress: string; positionId: string }) {
  // Mock implementation
  return {
    success: true,
    rewards: 100,
  }
}
