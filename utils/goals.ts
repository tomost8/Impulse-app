interface Goal {
  id: number;
  label: string;
  category: string;
  icon: any;
  categoryIcon: any;
}

const goals: Goal[] = [
  { id: 0, label: 'Food', category: "FOOD", icon: require('@/assets/icons/food.png'), categoryIcon: require('@/assets/icons/categoryfood.png') },
  { id: 1, label: 'Wellness', category: "WELLNESS", icon: require('@/assets/icons/wellness.png'), categoryIcon: require('@/assets/icons/categorywellness.png') },
  { id: 2, label: 'Working Out', category: "WORKING_OUT", icon: require('@/assets/icons/workout.png'), categoryIcon: require('@/assets/icons/categoryworkout.png') },
  { id: 3, label: 'Studying / Working', category: "STUDYING_WORKING", icon: require('@/assets/icons/studyingworking.png'), categoryIcon: require('@/assets/icons/categorystudying.png') },
  { id: 4, label: 'Rise and Shine', category: "RISE_AND_SHINE", icon: require('@/assets/icons/riseshine.png'), categoryIcon: require('@/assets/icons/categoryriseshine.png') },
  { id: 5, label: 'My Passion / Hobby', category: "PASSION_HOBBY", icon: require('@/assets/icons/passionhobby.png'), categoryIcon: require('@/assets/icons/categorypassion.png') },
];

const getCategoryById = (id: number | null): string | null => {
  const goal = goals.find(goal => goal.id === id);
  return goal ? goal.category : null;
};

const getIdByCategory = (category: string): number | null => {
  const goal = goals.find(goal => goal.category === category);
  return goal ? goal.id : null;
};

const getLabelByCategory = (category: string): string  => {
  const goal = goals.find(goal => goal.category === category);
  return goal ? goal.label : 'No Goal Selected';
};

const getIconByCategory = (category: string | null): any => {
  const goal = goals.find(goal => goal.category === category);
  return goal ? goal.icon : null;
};

const getCategoryIconByCategory = (category: string | null): any => {
  const goal = goals.find(goal => goal.category === category);
  return goal ? goal.categoryIcon : null;
};

export { goals, getCategoryById, getIdByCategory, getLabelByCategory, getIconByCategory, getCategoryIconByCategory };