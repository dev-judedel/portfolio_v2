import { NextResponse } from "next/server";

const QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { username: "dev-judedel" } }),
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (!res.ok) {
      return NextResponse.json({ error: "GitHub API error" }, { status: 500 });
    }

    const json = await res.json();
    const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return NextResponse.json({ error: "No data" }, { status: 500 });
    }

    return NextResponse.json({
      total: calendar.totalContributions,
      weeks: calendar.weeks,
    });
  } catch (err) {
    console.error("GitHub graph error:", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
