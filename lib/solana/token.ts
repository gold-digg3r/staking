import { type Connection, PublicKey } from "@solana/web3.js"
import { TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { TOKENS } from "@/lib/constants"

/**
 * Get the token account for a specific token and wallet
 * @param connection - Solana connection
 * @param walletAddress - Wallet public key
 * @param tokenMint - Token mint address
 * @returns Token account public key or null if not found
 */
export async function getTokenAccount(
  connection: Connection,
  walletAddress: PublicKey,
  tokenMint: string,
): Promise<PublicKey | null> {
  try {
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(walletAddress, {
      programId: TOKEN_PROGRAM_ID,
    })

    const tokenAccount = tokenAccounts.value.find((account) => account.account.data.parsed.info.mint === tokenMint)

    return tokenAccount ? new PublicKey(tokenAccount.pubkey) : null
  } catch (error) {
    console.error("Error getting token account:", error)
    return null
  }
}

/**
 * Get the balance of a specific token for a wallet
 * @param connection - Solana connection
 * @param walletAddress - Wallet public key
 * @param tokenMint - Token mint address
 * @returns Token balance or 0 if not found
 */
export async function getTokenBalance(
  connection: Connection,
  walletAddress: PublicKey,
  tokenMint: string,
): Promise<number> {
  try {
    const tokenAccount = await getTokenAccount(connection, walletAddress, tokenMint)

    if (!tokenAccount) {
      return 0
    }

    const accountInfo = await connection.getParsedAccountInfo(tokenAccount)

    if (!accountInfo.value) {
      return 0
    }

    // @ts-ignore - The parsed data structure is not fully typed
    const balance = accountInfo.value.data.parsed.info.tokenAmount.uiAmount
    return balance
  } catch (error) {
    console.error("Error getting token balance:", error)
    return 0
  }
}

/**
 * Get the DIGR token balance for a wallet
 * @param connection - Solana connection
 * @param walletAddress - Wallet public key
 * @returns DIGR token balance or 0 if not found
 */
export async function getDigrBalance(connection: Connection, walletAddress: PublicKey): Promise<number> {
  // Use the actual DIGR token mint address from constants
  return getTokenBalance(connection, walletAddress, TOKENS.DIGR)
}
