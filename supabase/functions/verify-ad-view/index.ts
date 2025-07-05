import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface AdViewRequest {
  userId: string;
  adId: string;
  provider: string;
  duration: number;
  taskId: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const { userId, adId, provider, duration, taskId } = await req.json() as AdViewRequest;

    // Validate required fields
    if (!userId || !adId || !provider || !duration || !taskId) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields",
          success: false 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // In a real implementation, you would:
    // 1. Verify with the ad provider API that the ad was actually viewed
    // 2. Check for fraud patterns (too many views, impossible timing, etc.)
    // 3. Validate the user's session

    // For this example, we'll simulate verification
    const verificationData = {
      verified: true,
      timestamp: new Date().toISOString(),
      adId,
      provider,
      duration,
      // In a real implementation, this would include a signature or token from the ad provider
      verificationToken: crypto.randomUUID(),
      // Additional metadata that might be useful
      userAgent: req.headers.get("user-agent") || "unknown",
      ipHash: hashIp(req.headers.get("x-forwarded-for") || "unknown"),
    };

    return new Response(
      JSON.stringify(verificationData),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing ad view verification:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to process verification",
        message: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

// Simple function to hash IP addresses for privacy
function hashIp(ip: string): string {
  // In a real implementation, use a proper hashing algorithm
  // This is just a simple example
  return btoa(ip).substring(0, 10);
}