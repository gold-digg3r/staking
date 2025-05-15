import { type Connection, PublicKey, Transaction, SystemProgram, TransactionInstruction } from "@solana/web3.js"
import {
  TOKEN_PROGRAM_ID,
  createApproveInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  getAccount,
} from "@solana/spl-token"
import { PROGRAMS, TOKENS } from "@/lib/constants"

/**
 * Stake tokens in a staking pool
 * @param connection - Solana connection
 * @param wallet - User's wallet (with signTransaction method)
 * @param tokenMint - Token mint address
 * @param amount - Amount to stake (in token units)
 * @param duration - Staking duration in days
 * @param autoCompound - Whether to automatically reinvest rewards
 * @returns Transaction signature
 */
export async function stakeTokens(
  connection: Connection,
  wallet: any,
  tokenMint: string,
  amount: number,
  duration: number,
  autoCompound = false,
): Promise<string> {
  try {
    if (!wallet.publicKey) throw new Error("Wallet not connected")

    // Convert amount to lamports (accounting for decimals)
    const decimals = tokenMint === TOKENS.DIGR ? 9 : 6 // Example: DIGR has 9 decimals, others might have 6
    const amountInLamports = amount * Math.pow(10, decimals)

    // Get the staking program ID
    const stakingProgramId = new PublicKey(PROGRAMS.STAKE_POOL)

    // Get the token mint public key
    const tokenMintPubkey = new PublicKey(tokenMint)

    // Get the user's token account
    const userTokenAccount = await getAssociatedTokenAddress(tokenMintPubkey, wallet.publicKey)

    // Check if the token account exists
    let userTokenAccountInfo
    try {
      userTokenAccountInfo = await getAccount(connection, userTokenAccount)
    } catch (error) {
      // If the account doesn't exist, we'll need to create it
      const transaction = new Transaction().add(
        createAssociatedTokenAccountInstruction(wallet.publicKey, userTokenAccount, wallet.publicKey, tokenMintPubkey),
      )

      // Sign and send the transaction
      const signature = await wallet.sendTransaction(transaction, connection)
      await connection.confirmTransaction(signature, "confirmed")

      // Now get the account info
      userTokenAccountInfo = await getAccount(connection, userTokenAccount)
    }

    // Get the staking pool token account (where tokens will be transferred)
    // In a real implementation, this would be derived from the program
    const stakingPoolAddress = new PublicKey(PROGRAMS.STAKE_POOL)

    // Create a PDA for the staking account
    const [stakingAccount] = await PublicKey.findProgramAddress(
      [
        Buffer.from("staking"),
        wallet.publicKey.toBuffer(),
        tokenMintPubkey.toBuffer(),
        Buffer.from(duration.toString()),
      ],
      stakingProgramId,
    )

    // Build the transaction
    const transaction = new Transaction()

    // Add instruction to create staking account if it doesn't exist
    // This is a simplified version - in a real implementation, you would check if the account exists
    transaction.add(
      SystemProgram.createAccountWithSeed({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: stakingAccount,
        basePubkey: wallet.publicKey,
        seed: `staking-${tokenMint}-${duration}`,
        lamports: await connection.getMinimumBalanceForRentExemption(165), // Example size
        space: 165, // Example size for staking account data
        programId: stakingProgramId,
      }),
    )

    // Add instruction to approve token transfer
    transaction.add(
      createApproveInstruction(userTokenAccount, stakingPoolAddress, wallet.publicKey, BigInt(amountInLamports)),
    )

    // Add instruction to stake tokens
    // This would be a custom instruction for your staking program
    const stakeInstruction = new TransactionInstruction({
      keys: [
        { pubkey: wallet.publicKey, isSigner: true, isWritable: true },
        { pubkey: userTokenAccount, isSigner: false, isWritable: true },
        { pubkey: stakingAccount, isSigner: false, isWritable: true },
        { pubkey: stakingPoolAddress, isSigner: false, isWritable: true },
        { pubkey: tokenMintPubkey, isSigner: false, isWritable: false },
        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      ],
      programId: stakingProgramId,
      data: Buffer.from([
        1, // Instruction index for stake
        ...new Uint8Array(new BigInt64Array([BigInt(amountInLamports)]).buffer), // Amount
        ...new Uint8Array(new Uint32Array([duration]).buffer), // Duration
        autoCompound ? 1 : 0, // Auto-compound flag
      ]),
    })

    transaction.add(stakeInstruction)

    // Sign and send the transaction
    const signature = await wallet.sendTransaction(transaction, connection)

    // Wait for confirmation
    await connection.confirmTransaction(signature, "confirmed")

    return signature
  } catch (error) {
    console.error("Error staking tokens:", error)
    throw error
  }
}

/**
 * Unstake tokens from a staking pool
 * @param connection - Solana connection
 * @param wallet - User's wallet (with signTransaction method)
 * @param stakingAccountAddress - Address of the staking account
 * @returns Transaction signature
 */
export async function unstakeTokens(
  connection: Connection,
  wallet: any,
  stakingAccountAddress: string,
): Promise<string> {
  try {
    if (!wallet.publicKey) throw new Error("Wallet not connected")

    // Get the staking program ID
    const stakingProgramId = new PublicKey(PROGRAMS.STAKE_POOL)

    // Convert staking account address to PublicKey
    const stakingAccount = new PublicKey(stakingAccountAddress)

    // Get the staking pool address
    const stakingPoolAddress = new PublicKey(PROGRAMS.STAKE_POOL)

    // Build the transaction
    const transaction = new Transaction()

    // Add instruction to unstake tokens
    // This would be a custom instruction for your staking program
    const unstakeInstruction = new TransactionInstruction({
      keys: [
        { pubkey: wallet.publicKey, isSigner: true, isWritable: true },
        { pubkey: stakingAccount, isSigner: false, isWritable: true },
        { pubkey: stakingPoolAddress, isSigner: false, isWritable: true },
        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      ],
      programId: stakingProgramId,
      data: Buffer.from([2]), // Instruction index for unstake
    })

    transaction.add(unstakeInstruction)

    // Sign and send the transaction
    const signature = await wallet.sendTransaction(transaction, connection)

    // Wait for confirmation
    await connection.confirmTransaction(signature, "confirmed")

    return signature
  } catch (error) {
    console.error("Error unstaking tokens:", error)
    throw error
  }
}

/**
 * Claim staking rewards
 * @param connection - Solana connection
 * @param wallet - User's wallet (with signTransaction method)
 * @param stakingAccountAddress - Address of the staking account
 * @returns Transaction signature
 */
export async function claimStakingRewards(
  connection: Connection,
  wallet: any,
  stakingAccountAddress: string,
): Promise<string> {
  try {
    if (!wallet.publicKey) throw new Error("Wallet not connected")

    // Get the staking program ID
    const stakingProgramId = new PublicKey(PROGRAMS.STAKE_POOL)

    // Convert staking account address to PublicKey
    const stakingAccount = new PublicKey(stakingAccountAddress)

    // Get the staking pool address
    const stakingPoolAddress = new PublicKey(PROGRAMS.STAKE_POOL)

    // Build the transaction
    const transaction = new Transaction()

    // Add instruction to claim rewards
    // This would be a custom instruction for your staking program
    const claimInstruction = new TransactionInstruction({
      keys: [
        { pubkey: wallet.publicKey, isSigner: true, isWritable: true },
        { pubkey: stakingAccount, isSigner: false, isWritable: true },
        { pubkey: stakingPoolAddress, isSigner: false, isWritable: true },
        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      ],
      programId: stakingProgramId,
      data: Buffer.from([3]), // Instruction index for claim
    })

    transaction.add(claimInstruction)

    // Sign and send the transaction
    const signature = await wallet.sendTransaction(transaction, connection)

    // Wait for confirmation
    await connection.confirmTransaction(signature, "confirmed")

    return signature
  } catch (error) {
    console.error("Error claiming rewards:", error)
    throw error
  }
}

/**
 * Toggle auto-compounding for a staking position
 * @param connection - Solana connection
 * @param wallet - User's wallet (with signTransaction method)
 * @param stakingAccountAddress - Address of the staking account
 * @param enableAutoCompound - Whether to enable or disable auto-compounding
 * @returns Transaction signature
 */
export async function toggleAutoCompound(
  connection: Connection,
  wallet: any,
  stakingAccountAddress: string,
  enableAutoCompound: boolean,
): Promise<string> {
  try {
    if (!wallet.publicKey) throw new Error("Wallet not connected")

    // Get the staking program ID
    const stakingProgramId = new PublicKey(PROGRAMS.STAKE_POOL)

    // Convert staking account address to PublicKey
    const stakingAccount = new PublicKey(stakingAccountAddress)

    // Get the staking pool address
    const stakingPoolAddress = new PublicKey(PROGRAMS.STAKE_POOL)

    // Build the transaction
    const transaction = new Transaction()

    // Add instruction to toggle auto-compounding
    // This would be a custom instruction for your staking program
    const toggleAutoCompoundInstruction = new TransactionInstruction({
      keys: [
        { pubkey: wallet.publicKey, isSigner: true, isWritable: true },
        { pubkey: stakingAccount, isSigner: false, isWritable: true },
        { pubkey: stakingPoolAddress, isSigner: false, isWritable: false },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      ],
      programId: stakingProgramId,
      data: Buffer.from([4, enableAutoCompound ? 1 : 0]), // Instruction index for toggle auto-compound
    })

    transaction.add(toggleAutoCompoundInstruction)

    // Sign and send the transaction
    const signature = await wallet.sendTransaction(transaction, connection)

    // Wait for confirmation
    await connection.confirmTransaction(signature, "confirmed")

    return signature
  } catch (error) {
    console.error("Error toggling auto-compound:", error)
    throw error
  }
}

/**
 * Get user's staking positions
 * @param connection - Solana connection
 * @param walletAddress - User's wallet address
 * @param tokenMint - Optional token mint to filter by
 * @returns Array of staking positions
 */
export async function getTokenStakingPositions(
  connection: Connection,
  walletAddress: PublicKey,
  tokenMint?: string,
): Promise<any[]> {
  try {
    // Get the staking program ID
    const stakingProgramId = new PublicKey(PROGRAMS.STAKE_POOL)

    // Get program accounts owned by the staking program
    const accounts = await connection.getProgramAccounts(stakingProgramId, {
      filters: [
        {
          memcmp: {
            offset: 8, // Assuming the wallet address is stored at offset 8
            bytes: walletAddress.toBase58(),
          },
        },
        // Add additional filter for token mint if provided
        ...(tokenMint
          ? [
              {
                memcmp: {
                  offset: 40, // Assuming the token mint is stored at offset 40
                  bytes: new PublicKey(tokenMint).toBase58(),
                },
              },
            ]
          : []),
      ],
    })

    // Parse account data
    // This is a simplified example - in a real implementation, you would parse the data based on your program's account structure
    return accounts.map((account) => {
      // Example parsing - adjust based on your actual data structure
      const data = account.account.data
      const dataView = new DataView(data.buffer, data.byteOffset, data.byteLength)

      return {
        address: account.pubkey.toString(),
        owner: new PublicKey(data.slice(8, 40)).toString(),
        tokenMint: new PublicKey(data.slice(40, 72)).toString(),
        amount: dataView.getBigUint64(72, true),
        startTime: dataView.getUint32(80, true) * 1000, // Convert to milliseconds
        duration: dataView.getUint32(84, true),
        endTime: (dataView.getUint32(80, true) + dataView.getUint32(84, true)) * 1000, // Convert to milliseconds
        claimed: dataView.getUint8(88) === 1,
        autoCompound: dataView.getUint8(89) === 1, // New field for auto-compound
        lastCompoundTime: dataView.getUint32(90, true) * 1000, // New field for last compound time
      }
    })
  } catch (error) {
    console.error("Error getting staking positions:", error)
    return []
  }
}
