import type { Options, Sortable } from 'sortablejs'
import type { Ref } from 'vue'
import { nextTick, unref } from 'vue'

export function useSortable(el: HTMLElement | Ref<HTMLElement>, options?: Options) {
  const sortableRef = ref<Sortable>()

  function initSortable() {
    nextTick(async () => {
      if (!el) return
      const Sortable = (await import('sortablejs')).default
      sortableRef.value = Sortable.create(unref(el), {
        animation: 500,
        delay: 400,
        delayOnTouchOnly: true,
        ...options
      })
    })
  }

  function getSortable() {
    return sortableRef.value
  }

  initSortable()
  return { getSortable }
}
