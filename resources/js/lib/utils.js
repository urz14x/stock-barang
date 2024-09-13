import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export function pickBy(object, predicate = (value, key) => value !== undefined && value){
    return Object.keys(object).reduce((acc, key) => {
        if(predicate(object[key], key)) {
            acc[key] = object[key]
        }
        return acc;
    }, {})
}
