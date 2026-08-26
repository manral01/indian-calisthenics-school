import { testimonialsData, type Testimonial } from "../data/testimonials";

const GOOGLE_MAPS_SHARE_URL = "https://share.google/5TbgfESfaoZ6y1epv";

export interface LiveGooglePlaceData {
  rating: number;
  userRatingsTotal: number;
  reviews: Testimonial[];
  googleMapsUrl: string;
}

export async function fetchLiveGoogleReviews(): Promise<LiveGooglePlaceData> {
  const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
  const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID;

  // Fallback data if API key is not yet set in environment variables
  const fallbackData: LiveGooglePlaceData = {
    rating: 4.9,
    userRatingsTotal: 38,
    reviews: testimonialsData,
    googleMapsUrl: GOOGLE_MAPS_SHARE_URL,
  };

  if (!apiKey || !placeId) {
    return fallbackData;
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.status === "OK" && data.result) {
      const fetchedReviews: Testimonial[] = (data.result.reviews || []).map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (r: any) => ({
          initials: r.author_name
            ? r.author_name
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()
            : "GR",
          name: r.author_name || "Google Reviewer",
          label: "Google Maps Review",
          quote: `"${r.text}"`,
          rating: r.rating || 5,
        })
      );

      return {
        rating: data.result.rating || 4.9,
        userRatingsTotal: data.result.user_ratings_total || 38,
        reviews: fetchedReviews.length > 0 ? fetchedReviews : testimonialsData,
        googleMapsUrl: GOOGLE_MAPS_SHARE_URL,
      };
    }
  } catch (error) {
    console.warn("Failed to fetch live Google Places reviews, using fallback:", error);
  }

  return fallbackData;
}
