import Container from "react-bootstrap/Container";
import { InfoCard } from "./components/cards/infoCard"
import { NewContactForm } from "./components/forms/newContact/newContact";
import { useContacts } from "./contexts/contactContext";
import { useEffect } from "react";
import { useModal } from "./contexts/modalContext";
import { EditModal } from "./components/modal/editModal";
import { ToastContainer } from "react-toastify";


function App() {
  const { getContacts } = useContacts()
  const { show } = useModal()
  const data = getContacts()

  useEffect(() => {
    const getData = async () => {
      try {
        await getContacts()
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  },)

  return (
    <Container className="bg-primary pb-3 h-100">
      <ToastContainer autoClose={2000}/>
      {show && <EditModal/>}
      <h2 className="text-center text-light pt-2">Lista de Contatos</h2>

      <InfoCard list={data}/>

      <NewContactForm/>
   
    </Container>
  );
}

export default App
