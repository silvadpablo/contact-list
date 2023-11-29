import Modal from 'react-bootstrap/Modal'
import { useModal } from "../../contexts/modalContext"
import Button from 'react-bootstrap/Button'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { editContactSchema } from '../../schemas/contact.schema'
import { useContacts } from '../../contexts/contactContext'

export function EditModal () {
    const { show, handleClose } = useModal()
    const { currContact, editContact } = useContacts()

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        reset,
    } = useForm({resolver: zodResolver(editContactSchema)})

    function onSubmit(data) {
      editContact(data, currContact)
      reset()
    }

    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edite o contato</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="rounded">
                      <label htmlFor="nome">Nome</label>
                      <input
                        id="nome"
                        placeholder="Nome do contato"
                        type="text"
                        defaultValue={currContact.nome}
                        onChange={(e) => {
                          setValue("nome", e.target.value)
                        }}
                        {...register("nome")}
                      ></input>
                      {errors.nome?.message && <p>{errors.nome?.message}</p>}

                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        placeholder="Email do contato"
                        type="text"
                        defaultValue={currContact.email}
                        onChange={(e) => {
                          setValue("email", e.target.value)
                        }}
                        {...register("email")}
                      ></input>
                      {errors.email?.message && <p>{errors.email?.message}</p>}

                      <label htmlFor="telefone">Telefone</label>
                      <input
                        id="telefone"
                        placeholder="Telefone do contato"
                        type="text"
                        defaultValue={currContact.telefone}
                        onChange={(e) => {
                          setValue("telefone", e.target.value)
                        }}
                        {...register("telefone")}
                      ></input>
                      {errors.telefone?.message && <p>{errors.telefone?.message}</p>}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={handleClose}>Cancelar</Button>
                    <Button variant='primary' onClick={handleSubmit(onSubmit)}>Salvar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}