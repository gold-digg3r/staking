export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          wallet_address: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          wallet_address: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          wallet_address?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      staking_positions: {
        Row: {
          id: string
          user_id: string
          nft_mint: string
          pool_id: string
          staked_at: string
          unstaked_at: string | null
          rewards_claimed: number
        }
        Insert: {
          id?: string
          user_id: string
          nft_mint: string
          pool_id: string
          staked_at?: string
          unstaked_at?: string | null
          rewards_claimed?: number
        }
        Update: {
          id?: string
          user_id?: string
          nft_mint?: string
          pool_id?: string
          staked_at?: string
          unstaked_at?: string | null
          rewards_claimed?: number
        }
        Relationships: [
          {
            foreignKeyName: "staking_positions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
