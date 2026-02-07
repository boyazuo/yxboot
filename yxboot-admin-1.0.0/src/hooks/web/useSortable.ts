import type Sortable from 'sortablejs'
import type { Options } from 'sortablejs'
import type { Ref } from 'vue'
import { nextTick, unref } from 'vue'

export function useSortable(el: HTMLElement | Ref<HTMLElement | undefined>, options?: Options) {
  const sortableRef = ref<Sortable>()

  function initSortable() {
    nextTick(async () => {
      const element = unref(el)
      if (!element) return
      const Sortable = (await import('sortablejs')).default
      sortableRef.value = Sortable.create(element, {
        animation: 100,
        delay: 400,
        delayOnTouchOnly: true,
        ...options,
      })
    })
  }

  function getSortable() {
    return sortableRef.value
  }

  initSortable()
  return { getSortable }
}
