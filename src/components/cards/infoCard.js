import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Dropdown from "react-bootstrap/Dropdown"
import { FaRegEdit } from "react-icons/fa"
import { useContacts } from "../../contexts/contactContext"
import { useModal } from "../../contexts/modalContext"
import { Pagination } from "react-bootstrap"
import { useEffect, useState } from "react"

export function InfoCard ({list}) {

    const { deleteContact, setCurrContact, getContacts, contacts } = useContacts()
    const { handleOpen } = useModal()
    const [active, setActive] = useState(1)
    const [partialList, setPartialList] = useState([])
    let pages = []
    const numberOfContactsPerPage = 3
    let indexOfLastContact = active * numberOfContactsPerPage
    let indexOfFirstContact = indexOfLastContact - numberOfContactsPerPage

    for (let number = 1; number <=5; number++){
        pages.push(
            <Pagination.Item
                key={number}
                active={number === active}
                onClick={() => pagination(number)}
            >
                {number}
            </Pagination.Item>
        )
    }

    useEffect(() => {
        if (active === 1 && contacts !== null){
            const foundContacts = getContacts().slice(indexOfFirstContact, indexOfLastContact)
            setPartialList(foundContacts)
        }
    }, [active, contacts])

    function pagination(number) {
        indexOfLastContact = number * numberOfContactsPerPage
        indexOfFirstContact = indexOfLastContact - numberOfContactsPerPage
        setActive(number)
        const foundContacts = getContacts().slice(indexOfFirstContact, indexOfLastContact)
        setPartialList(foundContacts)
    }

    function openModal (contact) {
        setCurrContact(contact)
        handleOpen()
    }

    return (
        <>
            <Row className="mx-3 text-dark p-3 rounded bg-warning">
                <Col>
                    {list && list.length ? (
                        partialList.map((contact) => (
                            <Row key={contact.codigo} id={contact.codigo} className="justify-content-m-center p-2 m-3 bg-light rounded text-dark">
                                <p></p>
                                <Col><h5>Nome:</h5> {contact.nome}</Col>
                                <Col><h5>Email:</h5> {contact.email}</Col>
                                <Col><h5>Telefone:</h5> {contact.telefone}</Col>
                                <Col>
                                    {list && list.length ? (
                                            <Row key={contact.codigo} id={contact.codigo} className="m-1 p-2">
                                                <Dropdown>
                                                    <Dropdown.Toggle>
                                                        <FaRegEdit />
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => openModal(contact)}>Editar</Dropdown.Item>
                                                        <Dropdown.Divider/>
                                                        <Dropdown.Item onClick={() => deleteContact(contact.codigo)}>Deletar</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Row>
                                    ) : (
                                        <>
                                        </>
                                    )}
                                </Col>
                            </Row>
                        ))
                    ) : (
                        <>
                            <Row className="justify-content-center p-2 m-3 bg-light rounded-pill text-dark">
                                Seus contatos aparecerão aqui depois de salvos
                            </Row>
                        </>
                    )}
                </Col>
                
                {list && list.length ? (
                    <Row>
                        <Pagination>
                            <Pagination.Prev
                                onClick={() =>{
                                    if (active === 1){

                                    } else {
                                        pagination(active -1)
                                    }
                                }}
                            />
                            {pages}
                            <Pagination.Next
                                onClick={() =>{
                                    if (active <5){
                                        pagination(active + 1)
                                    }
                                }}
                            />
                        </Pagination>
                    </Row>
                ) : (
                    <></>
                )}
            </Row>
        </>
    )
}