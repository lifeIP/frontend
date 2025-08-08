import { useEffect, useState } from "react"
import VersionGeneration from "./VersionGeneration"
import ActionsContext from "./VersionGenerationContext"

const VersionGenerationContextProvider = ({ children }) => {
  const [state, setState] = useState({})


  useEffect(() => {
  }, [])

  // Providing a value
  return (
    <ActionsContext.Provider value={{state, setState}}>
        {children}
    </ActionsContext.Provider>
  )
}


export default VersionGenerationContextProvider;