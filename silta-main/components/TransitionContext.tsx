import { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

interface TransitionContextType {
  isExiting: boolean
  navigateTo: (path: string) => void
}

const Ctx = createContext<TransitionContextType>({ isExiting: false, navigateTo: () => {} })

export function usePageTransition() { return useContext(Ctx) }

const EXIT_DURATION = 900 // ms — enough time for elements to fly out

export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isExiting, setIsExiting] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const pendingPath = useRef<string | null>(null)

  const navigateTo = useCallback((path: string) => {
    if (path === location.pathname) return
    if (isExiting) return

    pendingPath.current = path
    setIsExiting(true)

    timerRef.current = setTimeout(() => {
      if (pendingPath.current) {
        navigate(pendingPath.current)
        pendingPath.current = null
      }
      window.scrollTo({ top: 0 })
      setIsExiting(false)
    }, EXIT_DURATION)
  }, [navigate, location.pathname, isExiting])

  return (
    <Ctx.Provider value={{ isExiting, navigateTo }}>
      {children}
    </Ctx.Provider>
  )
}
