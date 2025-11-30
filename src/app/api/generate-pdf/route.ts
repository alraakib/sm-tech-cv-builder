import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { resume } = await request.json();

    return new NextResponse(resume, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": 'attachment; filename="resume.html"',
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
