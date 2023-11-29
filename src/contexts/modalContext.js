import { createContext, useContext, useState } from "react"

export const modalContext = createContext()

export function ModalProvider ({children}) {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleOpen = () => setShow(true)

    return (
        <modalContext.Provider
            value={{show, handleClose, handleOpen}}
        >
            {children}
        </modalContext.Provider>
    )
}

export const useModal = () => useContext(modalContext)