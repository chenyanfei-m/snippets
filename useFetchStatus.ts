type FetchStatusHook = () => {
  isLoading: boolean,
  isFailed: boolean,
  isSucceed: boolean,
  isFinished: boolean,
  load: <T,>(arg: Promise<T>) => Promise<T>,
}
  
const useFetchStatus: FetchStatusHook = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isFailed, setIsFailed] = useState(false)
  const [isSucceed, setIsSucceed] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  // 组件卸载的时候也需要set loading？
  useEffect(() => () => {
    setIsLoading(false)
  })

  return {
    isLoading,
    isFailed,
    isSucceed,
    isFinished,
    load: async (p) => {
      setIsLoading(true)
      try {
        const rst = await p
        setIsSucceed(true)
        return rst
      } catch (e) {
        setIsFailed(true)
        throw new Error(e)
      } finally {
        setIsFinished(true)
        setIsLoading(false)
      }
    }
  }
}
