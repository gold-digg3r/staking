"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/components/auth/auth-provider"
import { WalletMultiButton } from "@/components/solana/wallet-multi-button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/staking/dashboard"
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    if (isAuthenticated && !redirecting) {
      setRedirecting(true)
      router.push(redirect)
    }
  }, [isAuthenticated, redirect, router, redirecting])

  return (
    <div className="container max-w-md mx-auto py-12 px-4">
      <Button variant="ghost" size="sm" className="mb-6" onClick={() => router.push("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>

      <Card className="border-amber-200 dark:border-amber-800">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Image src="/favicon.png" alt="Gold Digger" width={80} height={80} className="mx-auto" />
          </div>
          <CardTitle className="text-2xl">Sign In to Gold Digger</CardTitle>
          <CardDescription>Connect your Solana wallet to access the Gold Digger ecosystem</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          {isLoading || redirecting ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-amber-600 mb-4" />
              <p className="text-sm text-muted-foreground">{redirecting ? "Redirecting..." : "Loading..."}</p>
            </div>
          ) : (
            <>
              <div className="w-full max-w-xs">
                <WalletMultiButton className="w-full" />
              </div>
              <p className="text-sm text-muted-foreground text-center mt-4">
                By connecting your wallet, you agree to our{" "}
                <a href="/terms-of-use" className="text-amber-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy-policy" className="text-amber-600 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
          <p className="text-xs text-center text-muted-foreground">
            Need help? Contact{" "}
            <a href="mailto:support@golddigger.io" className="text-amber-600 hover:underline">
              support@golddigger.io
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
