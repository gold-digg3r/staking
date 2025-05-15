import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Use | Gold Digger",
  description: "Terms of Use for the Gold Digger platform",
}

export default function TermsOfUsePage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Terms of Use</h1>

        <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert">
          <p>Last updated: May 15, 2025</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Gold Digger platform ("Platform"), you agree to be bound by these Terms of Use. If
            you do not agree to these terms, please do not use the Platform.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            Gold Digger is a comprehensive Solana-based platform that combines NFT marketplace functionality, DeFi
            features, and AI-powered tools to create a unique ecosystem for crypto enthusiasts.
          </p>

          <h2>3. User Responsibilities</h2>
          <p>
            Users are responsible for maintaining the security of their wallet and private keys. Gold Digger is not
            responsible for any loss of funds due to user error or security breaches on the user's end.
          </p>

          <h2>4. Staking</h2>
          <p>
            Staking on the Gold Digger platform involves locking up tokens or NFTs for a period of time. Users
            understand that staking involves risks, including potential loss of value of the staked assets.
          </p>

          <h2>5. Rewards</h2>
          <p>
            Staking rewards are distributed according to the rules set forth in the smart contracts. Reward rates may
            change over time based on various factors.
          </p>

          <h2>6. Prohibited Activities</h2>
          <p>
            Users may not use the Platform for any illegal activities, including but not limited to money laundering,
            tax evasion, or financing of terrorism.
          </p>

          <h2>7. Intellectual Property</h2>
          <p>
            All content on the Platform, including but not limited to text, graphics, logos, and software, is the
            property of Gold Digger or its content suppliers and is protected by copyright laws.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            Gold Digger shall not be liable for any direct, indirect, incidental, special, consequential, or punitive
            damages resulting from your use of or inability to use the Platform.
          </p>

          <h2>9. Changes to Terms</h2>
          <p>
            Gold Digger reserves the right to modify these Terms of Use at any time. Users will be notified of
            significant changes.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms of Use shall be governed by and construed in accordance with the laws of the jurisdiction in
            which Gold Digger operates.
          </p>

          <h2>11. Contact Information</h2>
          <p>If you have any questions about these Terms of Use, please contact us at support@golddigger.app.</p>
        </div>
      </div>
    </div>
  )
}
