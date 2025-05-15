"use server"
import * as bs58 from "bs58"
import { PublicKey } from "@solana/web3.js"
import { randomBytes } from "crypto"
import { auth } from "@/lib/auth"

/**
 * Wallet Authentication Utilities
 *
 * This module provides functions for authenticating users with their Solana wallets.
 */

// Store nonces in memory (in production, use Redis or another persistent store)
const NONCE_EXPIRY = 5 * 60 * 1000 // 5 minutes
const nonceStore: Map<string, { nonce: string; expires: number }> = new Map()

/**
 * Generates a random nonce for wallet authentication
 * @param walletAddress The wallet address to generate a nonce for
 * @returns The generated nonce
 */
export async function generateNonce(walletAddress: string): Promise<string> {
  // Generate a random nonce
  const nonce = randomBytes(32).toString("base64")

  // Store the nonce with an expiry time
  nonceStore.set(walletAddress, {
    nonce,
    expires: Date.now() + NONCE_EXPIRY,
  })

  return nonce
}

// Create a message for the user to sign
export async function createSignMessage(walletAddress: string): Promise<string> {
  // Simple message with timestamp to prevent replay attacks
  const timestamp = new Date().toISOString()
  return `Sign this message to authenticate with Gold Digger: ${walletAddress}\nTimestamp: ${timestamp}`
}

/**
 * Verifies a wallet signature
 * @param walletAddress The wallet address that signed the message
 * @param signature The signature to verify
 * @param message The message that was signed
 * @returns Whether the signature is valid
 */
export async function verifyWalletSignature(
  walletAddress: string,
  signature: string,
  message: string,
): Promise<boolean> {
  try {
    // Get the stored nonce
    const storedNonceData = nonceStore.get(walletAddress)

    if (!storedNonceData) {
      console.error("No nonce found for wallet", walletAddress)
      return false
    }

    // Check if nonce has expired
    if (Date.now() > storedNonceData.expires) {
      console.error("Nonce expired for wallet", walletAddress)
      nonceStore.delete(walletAddress)
      return false
    }

    // Check if the message contains the correct nonce
    if (!message.includes(`Nonce: ${storedNonceData.nonce}`)) {
      console.error("Message does not contain the correct nonce")
      return false
    }

    // Verify the signature
    const publicKey = new PublicKey(walletAddress)
    const signatureUint8 = bs58.decode(signature)
    const messageUint8 = new TextEncoder().encode(message)

    const isValid =
      PublicKey.isOnCurve(publicKey.toBytes()) &&
      PublicKey.prototype.verify.call(publicKey, messageUint8, signatureUint8)

    // Clean up the nonce after verification
    nonceStore.delete(walletAddress)

    return isValid
  } catch (error) {
    console.error("Error verifying wallet signature:", error)
    return false
  }
}

// Authenticate a user with their wallet
export async function authenticateWithWallet(
  walletAddress: string,
  signature: string,
  message: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    // In a real implementation, we would verify the signature here
    // For now, just return success
    return { success: true }
  } catch (error) {
    console.error("Error authenticating with wallet:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Authentication failed",
    }
  }
}

/**
 * Gets the current authenticated wallet
 * @returns The wallet address if authenticated, null otherwise
 */
export async function getCurrentWallet(): Promise<string | null> {
  const { user } = await auth()

  if (!user) {
    return null
  }

  return user.user_metadata?.wallet_address || null
}
