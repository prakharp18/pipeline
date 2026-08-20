export const TYPE_COLORS: Record<string, { bg: string; text: string; badgeBg: string; badgeText: string }> = {
  grass:    { bg: '#dcfce7', text: '#166534', badgeBg: '#22c55e', badgeText: '#ffffff' },
  poison:   { bg: '#f3e8ff', text: '#581c87', badgeBg: '#a855f7', badgeText: '#ffffff' },
  fire:     { bg: '#ffedd5', text: '#9a3412', badgeBg: '#f97316', badgeText: '#ffffff' },
  water:    { bg: '#dbeafe', text: '#1e40af', badgeBg: '#3b82f6', badgeText: '#ffffff' },
  electric: { bg: '#fef9c3', text: '#854d0e', badgeBg: '#eab308', badgeText: '#ffffff' },
  ice:      { bg: '#cffafe', text: '#155e75', badgeBg: '#06b6d4', badgeText: '#ffffff' },
  fighting: { bg: '#fee2e2', text: '#991b1b', badgeBg: '#ef4444', badgeText: '#ffffff' },
  ground:   { bg: '#fef3c7', text: '#92400e', badgeBg: '#d97706', badgeText: '#ffffff' },
  flying:   { bg: '#e0e7ff', text: '#3730a3', badgeBg: '#6366f1', badgeText: '#ffffff' },
  psychic:  { bg: '#fce7f3', text: '#9d174d', badgeBg: '#ec4899', badgeText: '#ffffff' },
  bug:      { bg: '#ecfccb', text: '#3f6212', badgeBg: '#84cc16', badgeText: '#ffffff' },
  rock:     { bg: '#f5f5f4', text: '#44403c', badgeBg: '#78716c', badgeText: '#ffffff' },
  ghost:    { bg: '#f3e8ff', text: '#6b21a8', badgeBg: '#8b5cf6', badgeText: '#ffffff' },
  dragon:   { bg: '#e0e7ff', text: '#3730a3', badgeBg: '#4f46e5', badgeText: '#ffffff' },
  steel:    { bg: '#f1f5f9', text: '#334155', badgeBg: '#64748b', badgeText: '#ffffff' },
  fairy:    { bg: '#fce7f3', text: '#9d174d', badgeBg: '#f43f5e', badgeText: '#ffffff' },
  dark:     { bg: '#f1f5f9', text: '#1e293b', badgeBg: '#334155', badgeText: '#ffffff' },
  normal:   { bg: '#f3f4f6', text: '#374151', badgeBg: '#6b7280', badgeText: '#ffffff' }
};

export const getTypeTheme = (type: string) => {
  return TYPE_COLORS[type.toLowerCase()] || { bg: '#f3f4f6', text: '#374151', badgeBg: '#6b7280', badgeText: '#ffffff' };
};

export const formatId = (id: number) => `#${String(id).padStart(3, '0')}`;

export const capitalize = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
};
