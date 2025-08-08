import type { ClassValue } from 'clsx'
import type * as z from 'zod'
import { clsx } from 'clsx'
import _ from 'lodash'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function array2Object(arr: FormSchemaType[]): { [key: string]: z.ZodType<any, any> } {
  return _.reduce(arr, (acc, item) => {
    acc[item.name] = item.rule
    return acc
  }, {} as { [key: string]: z.ZodType<any, any> })
}
