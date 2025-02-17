import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Reemplazo de useRouter para React Router
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function AddContact() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [company, setCompany] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const navigate = useNavigate(); // Usamos useNavigate en lugar de useRouter

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simulación de envío a la API
        console.log("Contacto agregado:", { name, lastName, company, address, phone, email, isPublic });
        navigate("/"); // Redirección a la página principal
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-card p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold mb-4">Agregar Contacto</h1>

                <div className="mb-4">
                    <Input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className="mb-4">
                    <Input type="text" placeholder="Apellido" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>

                <div className="mb-4">
                    <Input type="text" placeholder="Empresa" value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>

                <div className="mb-4">
                    <Input type="text" placeholder="Dirección" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>

                <div className="mb-4">
                    <Input type="tel" placeholder="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div className="mb-4">
                    <Input type="email" placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="mb-4 flex items-center">
                    <Checkbox id="isPublic" checked={isPublic} onChange={() => setIsPublic(!isPublic)} />
                    <label htmlFor="isPublic" className="ml-2">
                        Es público
                    </label>
                </div>

                <Button type="submit" className="w-full">
                    Agregar Contacto
                </Button>
            </form>
        </div>
    );
}
