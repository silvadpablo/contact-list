import Button from "react-bootstrap/Button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema } from "../../../schemas/contact.schema"
import "./formStyle.css"
import { useContacts } from "../../../contexts/contactContext"

export function NewContactForm () {
  const { createContact } = useContacts()
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm({resolver: zodResolver(contactSchema)})

  function onSubmit (data) {
    createContact(data)
    reset()
  }

    return (
      <form className="p-3 mt-3 mx-3 bg-warning rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h4 className="text-center text-dark">Salve um novo contato</h4>

        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          placeholder="Nome do contato"
          type="text"
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
          onChange={(e) => {
            setValue("telefone", e.target.value)
          }}
          {...register("telefone")}
        ></input>
        {errors.telefone?.message && <p>{errors.telefone?.message}</p>}

        <div>
          <Button type="submit" variant="success m-2 rounded-pill w-50">Salvar</Button>
        </div>

      </form>
    )
}