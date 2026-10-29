import { Apple, Globe2, LampDesk, Laptop, PawPrint, Volleyball } from 'lucide-react';
import type { Category } from '../types/game';

const icons = { animals: PawPrint, fruits: Apple, countries: Globe2, objects: LampDesk, technology: Laptop, sports: Volleyball };
export default function CategoryIcon({ category, size = 23 }: { category: Category; size?: number }) {
  const Icon = icons[category];
  return <Icon size={size} strokeWidth={1.65} aria-hidden="true" />;
}
