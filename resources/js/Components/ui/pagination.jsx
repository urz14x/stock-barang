import React from 'react'
import { Link } from '@inertiajs/react'

import { buttonVariants } from './button'

export default function SimplePagination({meta, links}) {
  return (
    <div className="w-full flex items-center justify-start">
        <div className="flex items-center justify-end gap-x-2">
            <Link className={buttonVariants({variant: 'outline', size: 'sm'})} as="button" href={links?.prev} disabled={links?.prev === null} preserveState preserveScroll>
                Sebelum
            </Link>
            <Link className={buttonVariants({variant: 'outline', size: 'sm'})} as="button" href={links?.next} disabled={links?.next === null} preserveState preserveScroll>
                Selanjutnya
            </Link>
        </div>
    </div>
  )
}
