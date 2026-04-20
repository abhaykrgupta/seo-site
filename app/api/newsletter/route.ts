import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { message: "Please provide a valid email address." },
        { status: 400 }
      )
    }

    // SIMULATED API CALL - Replace with your actual Formspree/Mailchimp/etc logic
    // const response = await fetch("YOUR_ENDPOINT", {
    //   method: "POST",
    //   body: JSON.stringify({ email }),
    //   headers: { "Content-Type": "application/json" }
    // });

    // For now, we simulate a successful subscription
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json(
      { message: "Success! You've been subscribed to FinVault weekly." },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    )
  }
}
