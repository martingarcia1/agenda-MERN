import { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/ContactContext";

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const text = useRef("");

    const { filterContacts, clearFilter, filtered } = contactContext;

    useEffect(() => {
        if (filtered === null) {
            text.current.value = "";
        }
    }, [filtered]); // Agregar dependencias para evitar warnings en React Strict Mode

    const onChange = (e) => {
        if (text.current.value !== "") {
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    };

    return (
        <form>
            <input ref={text} type="text" placeholder="Filtrar contactos..." onChange={onChange} />
        </form>
    );
};

export default ContactFilter;
