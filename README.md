<p align="center">
  <img src="public/favicon.png" alt="Gold Digger Logo" width="120" height="120" />
</p>

<h1 align="center"> Gold Digger Staking Protocol - Demo</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Solana-362fd9?style=for-the-badge&logo=solana&logoColor=white" alt="Solana" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</p>

<p align="center">
  Gold Digger is a comprehensive Solana-based platform that combines NFT marketplace functionality, DeFi features, and AI-powered tools to create a unique ecosystem for crypto enthusiasts.
</p>

# 🏆 Gold Digger - Staking Protocol

A powerful staking system on **Solana** supporting:

* 🔒 Compressed NFT staking (e.g., GOLD via Bubblegum)
* 💰 Reward emissions in **DIGR** SPL token
* 📈 Auto-compounding into secondary DIGR staking
* 🕰️ Vesting with cliff + linear unlocks
* 🧠 Smart rarity-based reward boosts
* 🔄 NFT restaking & reward tracking
* ⚡ Real-time event indexing (Helius-compatible)

---

## 🧱 Architecture Overview

```
Frontend (React, Helius SDK)
   └── Stake, Unstake, Claim, Compound
         ↓
Anchor Program (staking_pool.rs)
   ├── Pool (global settings)
   ├── StakeAccount (per user)
   ├── VestingAccount (DIGR vesting)
   └── CollectionWhitelist (NFT gates)
         ↓
DIGR Token Mint
   └── Auto-minted or vested to user
```

---

## 🚀 Features

### ✅ Staking

* Stake **compressed NFTs** (cNFTs) from approved collections
* Proof-verified via **Bubblegum + Merkle Root**
* Rarity-based reward multipliers

### 💸 DIGR Rewards

* DIGR SPL token distributed on claim
* Configurable reward rates per pool
* Claimed DIGR goes into vesting escrow

### 🧠 Vesting & Cliff

* VestingAccount per user
* Supports:

  * Cliff (e.g., 7 days no unlock)
  * Gradual unlock over time (e.g., 30 days)
* Fully claimable after full vesting period

### 🔁 Auto-Compounding

* Re-stake earned DIGR into DIGR staking pool
* Streak-based boosts (optional)
* Tracks compounding state on-chain

### ⚙️ Admin Controls

* Pause / resume pools
* Update reward rates
* Whitelist collections
* Slash unvested rewards

---

## 💻 Frontend Instruction Formats (Helius SDK Style)

```ts
export interface StakeCNFTInstruction {
  programId: string;
  accounts: {
    pool: string;
    stakeAccount: string;
    nftMint: string;
    merkleRoot: string;
    user: string;
    systemProgram: string;
  };
  args: {
    merkleProof: string[];
    leaf: string;
    rarityMultiplier: number;
  };
}
```

```ts
export interface AutoCompoundInstruction {
  programId: string;
  accounts: {
    pool: string;
    stakeAccount: string;
    vestingAccount: string;
    digrMint: string;
    digrStakeAccount: string;
    user: string;
    tokenProgram: string;
  };
}
```

---

## 📦 State Accounts

| Account               | Description                             |
| --------------------- | --------------------------------------- |
| `Pool`                | Pool settings (rates, lock, limits)     |
| `StakeAccount`        | User NFT stake info (timestamps, NFT)   |
| `VestingAccount`      | DIGR vesting (cliff, unlock, claimable) |
| `CollectionWhitelist` | Approved NFT collections                |

---

## 🔊 Emitted Events

| Event            | Purpose                     |
| ---------------- | --------------------------- |
| `StakeEvent`     | User staked an NFT          |
| `UnstakeEvent`   | User unstaked an NFT        |
| `ClaimEvent`     | DIGR reward claim initiated |
| `CompoundEvent`  | DIGR auto-compounded        |
| `VestingUpdated` | Vesting account updated     |

Can be indexed via **Helius** or **Supabase Edge Functions**.

---

## 🧪 Test Coverage

Includes unit tests for:

* [x] Stake / Claim / Unstake flow
* [x] Vesting logic with cliff
* [x] Admin updates + pausing
* [x] Auto-compounding reward tracking
* [x] Rarity multipliers + collection filtering

Run tests:

```bash
anchor test
```

---

## 🛠 Deployment

### Environment

* Solana Devnet or Mainnet
* Anchor 0.29+
* SPL Token Program
* Bubblegum Merkle proofs (for cNFT verification)

### Deploy

```bash
anchor build
anchor deploy
```

---

## 🧬 Optional Supabase Schema

For frontend indexing:

```sql
CREATE TABLE user_stakes (
  wallet TEXT,
  nft_mint TEXT,
  collection TEXT,
  stake_time TIMESTAMP,
  pool_id TEXT,
  rarity INTEGER,
  is_active BOOLEAN
);

CREATE TABLE digr_vesting (
  wallet TEXT,
  amount BIGINT,
  claimed BIGINT,
  cliff_end TIMESTAMP,
  unlock_end TIMESTAMP,
  last_claim TIMESTAMP
);
```

---

## 🧠 Future Plans

* DAO reward boosts
* NFT restaking streak logic
* Leaderboards & community badges
* GAMIFIED quests tied to staking behavior

