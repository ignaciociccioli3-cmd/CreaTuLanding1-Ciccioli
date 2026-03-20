import { useEffect, useEffectEvent, useRef, useState } from 'react'

export function useAsyncData({
  request,
  requestKey,
  initialData,
  errorMessage,
}) {
  const [state, setState] = useState({
    loading: true,
    data: initialData,
    error: '',
  })
  const runRequest = useEffectEvent(request)
  const initialDataRef = useRef(initialData)
  const errorMessageRef = useRef(errorMessage)

  useEffect(() => {
    let isCancelled = false

    const loadData = async () => {
      setState({
        loading: true,
        data: initialDataRef.current,
        error: '',
      })

      try {
        const response = await runRequest()

        if (isCancelled) {
          return
        }

        setState({
          loading: false,
          data: response,
          error: '',
        })
      } catch (error) {
        if (isCancelled) {
          return
        }

        setState({
          loading: false,
          data: initialDataRef.current,
          error: error?.message || errorMessageRef.current,
        })
      }
    }

    loadData()

    return () => {
      isCancelled = true
    }
  }, [requestKey])

  return state
}
