import { useEffect } from 'react'
import { pickBy } from '@/lib/utils'
import { router } from '@inertiajs/react'
import { useDebouncedCallback } from 'use-debounce'

export function useFilter({ route, values, only, wait = 300 }) {
  const reload = useDebouncedCallback((query) => {
    router.get(route, pickBy(query), {
      only: only,
      preserveState: true,
      preserveScroll: true,
    })
  }, 300)

  useEffect(() => reload(values), [values, reload])

  return { values }
}
