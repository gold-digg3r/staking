// Solana Program IDs
export const TOKEN_PROGRAM_ID = process.env.TOKEN_PROGRAM_ID || "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
export const TOKEN_2022_PROGRAM_ID = process.env.TOKEN_2022_PROGRAM_ID || "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
export const METAPLEX_PROGRAM_ID = process.env.METAPLEX_PROGRAM_ID || "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
export const METADATA_PROGRAM_ID = process.env.METADATA_PROGRAM_ID || "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
export const STAKING_PROGRAM_ID = process.env.STAKING_PROGRAM_ID || "stakepythfJFTQnZMgb5vWBCvGWpJjdAQZSgwqbLXwwS"

// Token Mints
export const JAIL_TOKEN_MINT = process.env.JAIL_TOKEN_MINT || "JAiLXKQJrpzgpPRxBzjxkHzKAJkYPwcQHu81Ade5UQb"
export const DIGR_TOKEN_MINT = process.env.DIGR_TOKEN_MINT || "DiGrUXBQGZcPiLQmb8bpYYcEY8vQCNiu1NWKxgQQ6q7y"

// Collection Addresses
export const JAILBIRDS_COLLECTION_ADDRESS =
  process.env.JAILBIRDS_COLLECTION_ADDRESS || "JAiLXKQJrpzgpPRxBzjxkHzKAJkYPwcQHu81Ade5UQb"
export const SYNDICATE_COLLECTION_ADDRESS =
  process.env.SYNDICATE_COLLECTION_ADDRESS || "SYNDiCATEFMZLJZKqEUHFgPNrXqLNwDMpzLBXcqKgMj"

// Feature Flags
export const NFT_STAKING_ENABLED = process.env.NFT_STAKING_ENABLED === "true"
export const TOKEN_STAKING_ENABLED = process.env.TOKEN_STAKING_ENABLED === "true"
export const STAKING_REWARDS_ENABLED = process.env.STAKING_REWARDS_ENABLED === "true"
export const LEADERBOARD_ENABLED = process.env.LEADERBOARD_ENABLED === "true"
export const STAKING_ENABLED = process.env.STAKING_ENABLED === "true"
export const ENABLE_SYNDICATE_CHARACTERS = process.env.ENABLE_SYNDICATE_CHARACTERS === "true"

// Development Settings
export const MVP_FEATURES = process.env.MVP_FEATURES || "staking,nfts,tokens,rewards"
export const ENABLED_MVP_FEATURES = MVP_FEATURES.split(",")
export const DEVELOPMENT_STAGE = process.env.DEVELOPMENT_STAGE || "beta"
export const MVP_WARNING_LEVEL = process.env.MVP_WARNING_LEVEL || "info"
export const MVP_WARNING_TIMEOUT = Number.parseInt(process.env.MVP_WARNING_TIMEOUT || "5000", 10)

// Network Settings
export const SOLANA_NETWORK = process.env.SOLANA_NETWORK || "devnet"
export const SOLANA_RPC_ENDPOINT = process.env.SOLANA_RPC_ENDPOINT || "https://api.devnet.solana.com"
export const SOLANA_RPC_WS = process.env.SOLANA_RPC_WS || "wss://api.devnet.solana.com"

// Token Settings
export const DEFAULT_MINT_DECIMALS = Number.parseInt(process.env.DEFAULT_MINT_DECIMALS || "9", 10)

// Site Settings
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://golddigger.vercel.app"

// Collection Symbols
export const JAILBIRDS_SYMBOL = "JAIL"
export const SYNDICATE_SYMBOL = "SYNDI"
export const LICENSE_SYMBOL = "LICENSE"

// App metadata
export const APP_META = {
  NAME: "Gold Digger",
  DESCRIPTION: "Stake your NFTs and tokens to earn rewards in the Gold Digger ecosystem",
  TWITTER: "https://twitter.com/golddigger",
  DISCORD: "https://discord.gg/golddigger",
  WEBSITE: "https://golddigger.app",
}

// Program IDs for backward compatibility
export const PROGRAMS = {
  STAKE_POOL: STAKING_PROGRAM_ID,
}

// Tokens for backward compatibility
export const TOKENS = {
  DIGR: DIGR_TOKEN_MINT,
  JAIL: JAIL_TOKEN_MINT,
}

// Environment for backward compatibility
export const ENV = {
  SOLANA_NETWORK,
  RPC_ENDPOINT: SOLANA_RPC_ENDPOINT,
}
