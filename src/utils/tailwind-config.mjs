import resolveConfig from 'tailwindcss/resolveConfig';
import myConfig from '../../tailwind.config.cjs';

​export const fullTailwindConfig = resolveConfig(myConfig);