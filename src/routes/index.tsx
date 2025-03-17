import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import {
  getCookie,
  setCookie,
  deleteCookie,
} from '@tanstack/react-start/server'

const makeCookie = createServerFn({ method: 'POST' }).handler(() => {
  setCookie('test', new Date().toLocaleString())
  return 'cookie set'
})

const removeCookie = createServerFn({ method: 'POST' }).handler(() => {
  deleteCookie('test')
  return 'cookie removed'
})

const getTheCookie = createServerFn().handler(() => {
  const cookie = getCookie('test')
  return cookie ?? null
})

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['cookie'],
    queryFn: () => getTheCookie(),
  })

  const { mutate: create, isPending: createPending } = useMutation({
    mutationFn: async () => {
      await makeCookie()
      await refetch()
    },
  })

  const { mutate: remove, isPending: removePending } = useMutation({
    mutationFn: async () => {
      await removeCookie()
      await refetch()
    },
  })

  const isPending = createPending || removePending

  return (
    <div className="p-2 space-y-2">
      <h3>Welcome Home!!!</h3>
      <div className="space-x-2">
        <span>Cookie:</span>
        <span>{isLoading ? 'loading...' : data}</span>
        <button
          className="inline hover:bg-blue-500 bg-gray-500 px-2 py-1 rounded"
          onClick={() => refetch()}
        >
          Refresh Cookie
        </button>
      </div>
      <div className="space-x-2">
        <button
          className="px-2 py-1 bg-blue-500 rounded disabled:bg-gray-500 transition-colors"
          onClick={() => create()}
          disabled={isPending}
        >
          Set the cookie
        </button>
        <button
          className="px-2 py-1 bg-red-500 rounded disabled:bg-gray-500 transition-colors"
          onClick={() => remove()}
          disabled={isPending}
        >
          Remove the cookie
        </button>
      </div>
    </div>
  )
}
