import { fetchGithubRepos } from "@/lib/githubApi";

export async function GET(request, { params }) {
  const { username } = await params;
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");

  if (!username || username.trim() === "") {
    return Response.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    const { data, fromCache } = await fetchGithubRepos(username, page);
    return Response.json({ repos: data, fromCache });
  } catch (err) {
    if (err.message === "User not found") {
      return Response.json(
        { error: err.message },
        { status: 404 }
      );
    }

    if (err.message.startsWith("Rate limit")) {
      return Response.json(
        { error: err.message },
        { status: 429 }
      );
    }

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}