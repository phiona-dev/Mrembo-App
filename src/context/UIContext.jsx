import { createContext, useState, useContext } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)

    const showLoading = () => {
        setLoading(true)
    }
    const hideLoading = () => {
        setLoading(false)
    }
    return (
         <UIContext.Provider value={{ loading, showLoading, hideLoading }}>
            {children}
         </UIContext.Provider>
    )
}

export const useUI = () => { return useContext(UIContext)}