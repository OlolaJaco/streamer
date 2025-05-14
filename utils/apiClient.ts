export async function fetchFromApi(
  endpoint: string,
  options: RequestInit = {}
) {
  const url = `https://${process.env.NEXT_API_MOVIE_BASE_URL}${endpoint}`;
  const defaultOptions: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_API_MOVIE_BEARER_TOKEN}`,
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, mergedOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching from API:", error);
    throw error;
  }
}
