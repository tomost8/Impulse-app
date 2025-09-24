export enum BadgeLevel {
  BRONZE = "bronze",
  SILVER = "silver",
  GOLD = "gold",
  DIAMOND = "diamond",
}

export function calculateBadgeLevel(
  daysCompleted: number,
  totalDays: number
): BadgeLevel | null {
  const pct = (daysCompleted / totalDays) * 100;
  if (pct === 100) return BadgeLevel.DIAMOND;
  if (pct >= 85) return BadgeLevel.GOLD;
  if (pct >= 70) return BadgeLevel.SILVER;
  if (pct >= 50) return BadgeLevel.BRONZE;
  return null;
}

const badgeOrder: BadgeLevel[] = [
  BadgeLevel.BRONZE,
  BadgeLevel.SILVER,
  BadgeLevel.GOLD,
  BadgeLevel.DIAMOND,
];

function extractCategoryAndLevel(title: string) {
  const totalDays = +title.split(" ")[0];
  const level = totalDays / 7;

  let category = title.split(" ")[2].toLowerCase();
  if (category === "working") category = "workout";

  return { category, level, totalDays };
}


export function getBadges(title: string, daysCompleted: number) {
  const totalDays = +title.split(" ")[0];
  const { category, level } = extractCategoryAndLevel(title);
  const currentLevel = calculateBadgeLevel(daysCompleted, totalDays);

  return badgeOrder.map((badge) => {
    const key = `${category}_level_${level}_${badge}`;

    if (
      currentLevel &&
      badgeOrder.indexOf(badge) <= badgeOrder.indexOf(currentLevel)
    ) {
      // unlocked badge
      return badgeImages[key];
    } else {
      // locked badge
      return greyBadgeImages[key];
    }
  });
}

export function getBadgeImageName(title: string, badge: string): string {
  const { category, level } = extractCategoryAndLevel(title);

  return `${category}_level_${level}_${badge.toLowerCase()}`;
}

// Helper to get the image directly
export function getBadgeImage(title: string, badge: string) {
  const name = getBadgeImageName(title, badge);
  //console.log("🛹 Getting badge image for:", name);
  return badgeImages[name];
}

export function getCategoryIcon(category?: string) {
  let iconName = category?.split("_")[0].toLowerCase();
  if (iconName === "working") iconName = "workout";

  return categoryIcons[iconName || "available"];
}

// Static image map (Metro requires explicit requires)
export const badgeImages: Record<string, any> = {
  food_level_1_bronze: require("@/assets/images/challenge/badges/food_level_1_bronze.png"),
  food_level_1_silver: require("@/assets/images/challenge/badges/food_level_1_silver.png"),
  food_level_1_gold: require("@/assets/images/challenge/badges/food_level_1_gold.png"),
  food_level_1_diamond: require("@/assets/images/challenge/badges/food_level_1_diamond.png"),
  food_level_2_bronze: require("@/assets/images/challenge/badges/food_level_2_bronze.png"),
  food_level_2_silver: require("@/assets/images/challenge/badges/food_level_2_silver.png"),
  food_level_2_gold: require("@/assets/images/challenge/badges/food_level_2_gold.png"),
  food_level_2_diamond: require("@/assets/images/challenge/badges/food_level_2_diamond.png"),
  food_level_3_bronze: require("@/assets/images/challenge/badges/food_level_3_bronze.png"),
  food_level_3_silver: require("@/assets/images/challenge/badges/food_level_3_silver.png"),
  food_level_3_gold: require("@/assets/images/challenge/badges/food_level_3_gold.png"),
  food_level_3_diamond: require("@/assets/images/challenge/badges/food_level_3_diamond.png"),
  workout_level_1_bronze: require("@/assets/images/challenge/badges/workout_level_1_bronze.png"),
  workout_level_1_silver: require("@/assets/images/challenge/badges/workout_level_1_silver.png"),
  workout_level_1_gold: require("@/assets/images/challenge/badges/workout_level_1_gold.png"),
  workout_level_1_diamond: require("@/assets/images/challenge/badges/workout_level_1_diamond.png"),
  workout_level_2_bronze: require("@/assets/images/challenge/badges/workout_level_2_bronze.png"),
  workout_level_2_silver: require("@/assets/images/challenge/badges/workout_level_2_silver.png"),
  workout_level_2_gold: require("@/assets/images/challenge/badges/workout_level_2_gold.png"),
  workout_level_2_diamond: require("@/assets/images/challenge/badges/workout_level_2_diamond.png"),
  workout_level_3_bronze: require("@/assets/images/challenge/badges/workout_level_3_bronze.png"),
  workout_level_3_silver: require("@/assets/images/challenge/badges/workout_level_3_silver.png"),
  workout_level_3_gold: require("@/assets/images/challenge/badges/workout_level_3_gold.png"),
  workout_level_3_diamond: require("@/assets/images/challenge/badges/workout_level_3_diamond.png"),
  studying_level_1_bronze: require("@/assets/images/challenge/badges/studying_level_1_bronze.png"),
  studying_level_1_silver: require("@/assets/images/challenge/badges/studying_level_1_silver.png"),
  studying_level_1_gold: require("@/assets/images/challenge/badges/studying_level_1_gold.png"),
  studying_level_1_diamond: require("@/assets/images/challenge/badges/studying_level_1_diamond.png"),
  studying_level_2_bronze: require("@/assets/images/challenge/badges/studying_level_2_bronze.png"),
  studying_level_2_silver: require("@/assets/images/challenge/badges/studying_level_2_silver.png"),
  studying_level_2_gold: require("@/assets/images/challenge/badges/studying_level_2_gold.png"),
  studying_level_2_diamond: require("@/assets/images/challenge/badges/studying_level_2_diamond.png"),
  studying_level_3_bronze: require("@/assets/images/challenge/badges/studying_level_3_bronze.png"),
  studying_level_3_silver: require("@/assets/images/challenge/badges/studying_level_3_silver.png"),
  studying_level_3_gold: require("@/assets/images/challenge/badges/studying_level_3_gold.png"),
  studying_level_3_diamond: require("@/assets/images/challenge/badges/studying_level_3_diamond.png"),
  wellness_level_1_bronze: require("@/assets/images/challenge/badges/wellness_level_1_bronze.png"),
  wellness_level_1_silver: require("@/assets/images/challenge/badges/wellness_level_1_silver.png"),
  wellness_level_1_gold: require("@/assets/images/challenge/badges/wellness_level_1_gold.png"),
  wellness_level_1_diamond: require("@/assets/images/challenge/badges/wellness_level_1_diamond.png"),
  wellness_level_2_bronze: require("@/assets/images/challenge/badges/wellness_level_2_bronze.png"),
  wellness_level_2_silver: require("@/assets/images/challenge/badges/wellness_level_2_silver.png"),
  wellness_level_2_gold: require("@/assets/images/challenge/badges/wellness_level_2_gold.png"),
  wellness_level_2_diamond: require("@/assets/images/challenge/badges/wellness_level_2_diamond.png"),
  wellness_level_3_bronze: require("@/assets/images/challenge/badges/wellness_level_3_bronze.png"),
  wellness_level_3_silver: require("@/assets/images/challenge/badges/wellness_level_3_silver.png"),
  wellness_level_3_gold: require("@/assets/images/challenge/badges/wellness_level_3_gold.png"),
  wellness_level_3_diamond: require("@/assets/images/challenge/badges/wellness_level_3_diamond.png"),
  rise_level_1_bronze: require("@/assets/images/challenge/badges/rise_level_1_bronze.png"),
  rise_level_1_silver: require("@/assets/images/challenge/badges/rise_level_1_silver.png"),
  rise_level_1_gold: require("@/assets/images/challenge/badges/rise_level_1_gold.png"),
  rise_level_1_diamond: require("@/assets/images/challenge/badges/rise_level_1_diamond.png"),
  rise_level_2_bronze: require("@/assets/images/challenge/badges/rise_level_2_bronze.png"),
  rise_level_2_silver: require("@/assets/images/challenge/badges/rise_level_2_silver.png"),
  rise_level_2_gold: require("@/assets/images/challenge/badges/rise_level_2_gold.png"),
  rise_level_2_diamond: require("@/assets/images/challenge/badges/rise_level_2_diamond.png"),
  rise_level_3_bronze: require("@/assets/images/challenge/badges/rise_level_3_bronze.png"),
  rise_level_3_silver: require("@/assets/images/challenge/badges/rise_level_3_silver.png"),
  rise_level_3_gold: require("@/assets/images/challenge/badges/rise_level_3_gold.png"),
  rise_level_3_diamond: require("@/assets/images/challenge/badges/rise_level_3_diamond.png"),
  passion_level_1_bronze: require("@/assets/images/challenge/badges/passion_level_1_bronze.png"),
  passion_level_1_silver: require("@/assets/images/challenge/badges/passion_level_1_silver.png"),
  passion_level_1_gold: require("@/assets/images/challenge/badges/passion_level_1_gold.png"),
  passion_level_1_diamond: require("@/assets/images/challenge/badges/passion_level_1_diamond.png"),
  passion_level_2_bronze: require("@/assets/images/challenge/badges/passion_level_2_bronze.png"),
  passion_level_2_silver: require("@/assets/images/challenge/badges/passion_level_2_silver.png"),
  passion_level_2_gold: require("@/assets/images/challenge/badges/passion_level_2_gold.png"),
  passion_level_2_diamond: require("@/assets/images/challenge/badges/passion_level_2_diamond.png"),
  passion_level_3_bronze: require("@/assets/images/challenge/badges/passion_level_3_bronze.png"),
  passion_level_3_silver: require("@/assets/images/challenge/badges/passion_level_3_silver.png"),
  passion_level_3_gold: require("@/assets/images/challenge/badges/passion_level_3_gold.png"),
  passion_level_3_diamond: require("@/assets/images/challenge/badges/passion_level_3_diamond.png"),
};

export const greyBadgeImages: Record<string, any> = {
  food_level_1_bronze: require("@/assets/images/challenge/badges/food_level_1_bronze.png"),
  food_level_1_silver: require("@/assets/images/challenge/badges/food_level_1_silver.png"),
  food_level_1_gold: require("@/assets/images/challenge/badges/food_level_1_gold.png"),
  food_level_1_diamond: require("@/assets/images/challenge/badges/food_level_1_diamond.png"),
  food_level_2_bronze: require("@/assets/images/challenge/badges/food_level_2_bronze.png"),
  food_level_2_silver: require("@/assets/images/challenge/badges/food_level_2_silver.png"),
  food_level_2_gold: require("@/assets/images/challenge/badges/food_level_2_gold.png"),
  food_level_2_diamond: require("@/assets/images/challenge/badges/food_level_2_diamond.png"),
  food_level_3_bronze: require("@/assets/images/challenge/badges/food_level_3_bronze.png"),
  food_level_3_silver: require("@/assets/images/challenge/badges/food_level_3_silver.png"),
  food_level_3_gold: require("@/assets/images/challenge/badges/food_level_3_gold.png"),
  food_level_3_diamond: require("@/assets/images/challenge/badges/food_level_3_diamond.png"),
  workout_level_1_bronze: require("@/assets/images/challenge/badges/workout_level_1_bronze.png"),
  workout_level_1_silver: require("@/assets/images/challenge/badges/workout_level_1_silver.png"),
  workout_level_1_gold: require("@/assets/images/challenge/badges/workout_level_1_gold.png"),
  workout_level_1_diamond: require("@/assets/images/challenge/badges/workout_level_1_diamond.png"),
  workout_level_2_bronze: require("@/assets/images/challenge/badges/workout_level_2_bronze.png"),
  workout_level_2_silver: require("@/assets/images/challenge/badges/workout_level_2_silver.png"),
  workout_level_2_gold: require("@/assets/images/challenge/badges/workout_level_2_gold.png"),
  workout_level_2_diamond: require("@/assets/images/challenge/badges/workout_level_2_diamond.png"),
  workout_level_3_bronze: require("@/assets/images/challenge/badges/workout_level_3_bronze.png"),
  workout_level_3_silver: require("@/assets/images/challenge/badges/workout_level_3_silver.png"),
  workout_level_3_gold: require("@/assets/images/challenge/badges/workout_level_3_gold.png"),
  workout_level_3_diamond: require("@/assets/images/challenge/badges/workout_level_3_diamond.png"),
  studying_level_1_bronze: require("@/assets/images/challenge/badges/studying_level_1_bronze.png"),
  studying_level_1_silver: require("@/assets/images/challenge/badges/studying_level_1_silver.png"),
  studying_level_1_gold: require("@/assets/images/challenge/badges/studying_level_1_gold.png"),
  studying_level_1_diamond: require("@/assets/images/challenge/badges/studying_level_1_diamond.png"),
  studying_level_2_bronze: require("@/assets/images/challenge/badges/studying_level_2_bronze.png"),
  studying_level_2_silver: require("@/assets/images/challenge/badges/studying_level_2_silver.png"),
  studying_level_2_gold: require("@/assets/images/challenge/badges/studying_level_2_gold.png"),
  studying_level_2_diamond: require("@/assets/images/challenge/badges/studying_level_2_diamond.png"),
  studying_level_3_bronze: require("@/assets/images/challenge/badges/studying_level_3_bronze.png"),
  studying_level_3_silver: require("@/assets/images/challenge/badges/studying_level_3_silver.png"),
  studying_level_3_gold: require("@/assets/images/challenge/badges/studying_level_3_gold.png"),
  studying_level_3_diamond: require("@/assets/images/challenge/badges/studying_level_3_diamond.png"),
  wellness_level_1_bronze: require("@/assets/images/challenge/badges/wellness_level_1_bronze.png"),
  wellness_level_1_silver: require("@/assets/images/challenge/badges/wellness_level_1_silver.png"),
  wellness_level_1_gold: require("@/assets/images/challenge/badges/wellness_level_1_gold.png"),
  wellness_level_1_diamond: require("@/assets/images/challenge/badges/wellness_level_1_diamond.png"),
  wellness_level_2_bronze: require("@/assets/images/challenge/badges/wellness_level_2_bronze.png"),
  wellness_level_2_silver: require("@/assets/images/challenge/badges/wellness_level_2_silver.png"),
  wellness_level_2_gold: require("@/assets/images/challenge/badges/wellness_level_2_gold.png"),
  wellness_level_2_diamond: require("@/assets/images/challenge/badges/wellness_level_2_diamond.png"),
  wellness_level_3_bronze: require("@/assets/images/challenge/badges/wellness_level_3_bronze.png"),
  wellness_level_3_silver: require("@/assets/images/challenge/badges/wellness_level_3_silver.png"),
  wellness_level_3_gold: require("@/assets/images/challenge/badges/wellness_level_3_gold.png"),
  wellness_level_3_diamond: require("@/assets/images/challenge/badges/wellness_level_3_diamond.png"),
  rise_level_1_bronze: require("@/assets/images/challenge/badges/rise_level_1_bronze.png"),
  rise_level_1_silver: require("@/assets/images/challenge/badges/rise_level_1_silver.png"),
  rise_level_1_gold: require("@/assets/images/challenge/badges/rise_level_1_gold.png"),
  rise_level_1_diamond: require("@/assets/images/challenge/badges/rise_level_1_diamond.png"),
  rise_level_2_bronze: require("@/assets/images/challenge/badges/rise_level_2_bronze.png"),
  rise_level_2_silver: require("@/assets/images/challenge/badges/rise_level_2_silver.png"),
  rise_level_2_gold: require("@/assets/images/challenge/badges/rise_level_2_gold.png"),
  rise_level_2_diamond: require("@/assets/images/challenge/badges/rise_level_2_diamond.png"),
  rise_level_3_bronze: require("@/assets/images/challenge/badges/rise_level_3_bronze.png"),
  rise_level_3_silver: require("@/assets/images/challenge/badges/rise_level_3_silver.png"),
  rise_level_3_gold: require("@/assets/images/challenge/badges/rise_level_3_gold.png"),
  rise_level_3_diamond: require("@/assets/images/challenge/badges/rise_level_3_diamond.png"),
  passion_level_1_bronze: require("@/assets/images/challenge/badges/passion_level_1_bronze.png"),
  passion_level_1_silver: require("@/assets/images/challenge/badges/passion_level_1_silver.png"),
  passion_level_1_gold: require("@/assets/images/challenge/badges/passion_level_1_gold.png"),
  passion_level_1_diamond: require("@/assets/images/challenge/badges/passion_level_1_diamond.png"),
  passion_level_2_bronze: require("@/assets/images/challenge/badges/passion_level_2_bronze.png"),
  passion_level_2_silver: require("@/assets/images/challenge/badges/passion_level_2_silver.png"),
  passion_level_2_gold: require("@/assets/images/challenge/badges/passion_level_2_gold.png"),
  passion_level_2_diamond: require("@/assets/images/challenge/badges/passion_level_2_diamond.png"),
  passion_level_3_bronze: require("@/assets/images/challenge/badges/passion_level_3_bronze.png"),
  passion_level_3_silver: require("@/assets/images/challenge/badges/passion_level_3_silver.png"),
  passion_level_3_gold: require("@/assets/images/challenge/badges/passion_level_3_gold.png"),
  passion_level_3_diamond: require("@/assets/images/challenge/badges/passion_level_3_diamond.png"),
};

export const categoryIcons: Record<string, any> = {
  available: require("@/assets/icons/challenges/category_available.png"),
  food: require("@/assets/icons/challenges/category_food.png"),
  workout: require("@/assets/icons/challenges/category_workout.png"),
  studying: require("@/assets/icons/challenges/category_studying.png"), 
  wellness: require("@/assets/icons/challenges/category_wellness.png"),
  rise: require("@/assets/icons/challenges/category_rise.png"),
  passion: require("@/assets/icons/challenges/category_passion.png"),
};

// Function to parse title from "Num Day Category Challenge" format
export function parseTitle(title: string): string {
  // Match pattern: "Num Day" + Category + "Challenge"
  const match = title.match(/^(\d+\s+Day)\s+(.+?)\s+(Challenge)$/);
  if (match) {
    const dayPart = match[1];
    const challengePart = match[3];
    return `${dayPart} ${challengePart}`;
  }
  return title; // Return original if pattern doesn't match
}
