interface Goal {
    id: number;
    label: string;
    category: string;
  }

const goals: Goal[] = [
    { id: 0, label: 'Food', category: "FOOD" },
    { id: 1, label: 'Wellness', category: "WELLNESS" },
    { id: 2, label: 'Working Out', category: "WORKING_OUT" },
    { id: 3, label: 'Studying / Working', category: "STUDYING_WORKING" },
    { id: 4, label: 'Rise and Shine', category: "RISE_AND_SHINE" },
    { id: 5, label: 'My Passion / Hobby', category: "PASSION_HOBBY" },
];

const getCategoryById = (id: number | null): string | null => {
    const goal = goals.find(goal => goal.id === id);
    return goal ? goal.category : null;
};

const getLabelByCategory = (category: string | null): string | null => {
    const goal = goals.find(goal => goal.category === category);
    return goal ? goal.label : null;
};

export { goals, getCategoryById, getLabelByCategory };