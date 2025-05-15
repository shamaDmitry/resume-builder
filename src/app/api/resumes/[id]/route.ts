// import { IResumeData } from "@/types";
import { type NextRequest, NextResponse } from "next/server";

// This would normally connect to a database
// For this example, we're simulating with an in-memory store
// const RESUMES_STORE: Record<string, IResumeData> = {};

// interface RouteSegmentProps {
//   params: { id: string };
// }

export async function GET(request: NextRequest) {
  console.log("request", request);

  // const id = props.params.id;

  // // In a real app, you would fetch from your database
  // const resume = RESUMES_STORE[id];

  // if (!resume) {
  //   return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  // }

  // return NextResponse.json(resume);

  return NextResponse.json({ message: "Hello, world!" });
}

export async function POST(request: NextRequest) {
  // const id = props.params.id;

  try {
    const body = await request.json();

    console.log("body", body);

    // In a real app, you would save to your database
    // RESUMES_STORE[id] = {
    //   ...body,
    //   id,
    //   updatedAt: new Date().toISOString(),
    // };

    // return NextResponse.json({
    //   success: true,
    //   id,
    //   message: "Resume saved successfully",
    // });
  } catch (error) {
    console.error("Error saving resume:", error);

    return NextResponse.json(
      { error: "Failed to save resume" },
      { status: 500 }
    );
  }
}
