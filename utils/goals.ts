import foodIcon from "@/assets/icons/food.png";
import wellnessIcon from "@/assets/icons/wellness.png";
import workoutIcon from "@/assets/icons/workout.png";
import studyingIcon from "@/assets/icons/studyingworking.png";
import riseshineIcon from "@/assets/icons/riseshine.png";
import passionhobbyIcon from "@/assets/icons/passionhobby.png";

interface Goal {
  id: number;
  label: string;
  category: string;
  icon: string;
}

const goals: Goal[] = [
  { id: 0, label: 'Food', category: "FOOD", icon: foodIcon },
  { id: 1, label: 'Wellness', category: "WELLNESS", icon: wellnessIcon },
  { id: 2, label: 'Working Out', category: "WORKING_OUT", icon: workoutIcon },
  { id: 3, label: 'Studying / Working', category: "STUDYING_WORKING", icon: studyingIcon },
  { id: 4, label: 'Rise and Shine', category: "RISE_AND_SHINE", icon: riseshineIcon },
  { id: 5, label: 'My Passion / Hobby', category: "PASSION_HOBBY", icon: passionhobbyIcon },
];

const getCategoryById = (id: number | null): string | null => {
  const goal = goals.find(goal => goal.id === id);
  return goal ? goal.category : null;
};

const getLabelByCategory = (category: string | null): string | null => {
  const goal = goals.find(goal => goal.category === category);
  return goal ? goal.label : null;
};

const getIconByCategory = (category: string | null): string | null => {
  const goal = goals.find(goal => goal.category === category);
  return goal ? goal.icon : null;
};

export { goals, getCategoryById, getLabelByCategory, getIconByCategory };