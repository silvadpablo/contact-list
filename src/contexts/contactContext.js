import { createContext, useContext, useState } from "react"
import { toast } from "react-toastify"
import { useModal } from "./modalContext"

export const ContactContext = createContext()

export function ContactProvider ({children}) {

    const [contacts, setContacts] = useState()
    const [currContact, setCurrContact] = useState()
    const { handleClose } = useModal()

    function getContacts () {
        const contacts = JSON.parse(localStorage.getItem("tPrimeContacts"))
        return contacts
    }
    
    function createContact (newContact) {
        const contacts = getContacts()
        if (contacts === null) {
            const firstContact = []
            newContact.codigo = 1
            firstContact.push(newContact)
            setContacts(firstContact)
            localStorage.setItem("tPrimeContacts", JSON.stringify(firstContact))
            toast.success(`Contato de ${newContact.nome} adicionado com sucesso`)
        } else {
            newContact.codigo = contacts[contacts.length-1].codigo + 1
            contacts.push(newContact)
            setContacts(contacts)
            localStorage.setItem("tPrimeContacts", JSON.stringify(contacts))
            toast.success(`Contato de ${newContact.nome} adicionado com sucesso`)
        }
    }

    function editContact (data, currContact) {
        const contacts = getContacts()
        const foundIndex = contacts.findIndex(item => item.codigo === currContact.codigo)
        contacts[foundIndex].nome = data.nome
        contacts[foundIndex].email = data.email
        contacts[foundIndex].telefone = data.telefone
        setContacts(contacts)
        localStorage.setItem("tPrimeContacts", JSON.stringify(contacts))
        handleClose()
        toast.success(`Contato de ${data.nome} editado com sucesso`)
    }

    function deleteContact (id) {
        const contacts = getContacts()
        contacts.splice(contacts.findIndex(contact => contact.codigo === id), 1)
        setContacts(contacts)
        if (contacts.length === 0) {
            localStorage.removeItem("tPrimeContacts")
        } else {
            localStorage.setItem("tPrimeContacts", JSON.stringify(contacts))
        }
        toast.success("Contato deletado com sucesso!")
    }
    return (
        <ContactContext.Provider
            value={{
                getContacts,
                createContact,
                contacts,
                editContact,
                deleteContact,
                currContact,
                setCurrContact,
            }}
        >
            {children}
        </ContactContext.Provider>
    )
}

export const useContacts = () => useContext(ContactContext)