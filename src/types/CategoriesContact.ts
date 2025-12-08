// categories.ts
export const categoryMap: Record<string, string> = {
  accessibility: 'Accessibility',
  concern: 'Concern',
  facility: 'Facility',
  feedback: 'Feedback',
  program: 'Program',
  webissue: 'Website Issue',
  other: 'Other',
};

export type CategoryOption = keyof typeof categoryMap; // 'accessibility' | 'concern' | 'facility' | 'feedback' | 'program' | 'webissue' | 'other'

export const categoryItems = Object.entries(categoryMap).map(
  ([value, label]) => ({ value, label }),
) as { value: CategoryOption; label: string }[];
