import { User } from "../interface/user";

const API_BASE_URL = "https://apiflowershop.onrender.com/api/getUserLogin";

export async function GetLoginUser(email: string, password: string): Promise<User | null> {
    const userLoginData = { email: email, password: password }; // Datos a enviar

    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userLoginData)
        });

        if (!response) {
            throw new Error("Ocurrió un error al intentar iniciar sesión");
        }
        const userData: User = await response.json();

        console.log("Iniciado correctamente");
        return userData;



    } catch (error) {
        console.error(error);
        return null;
    }

}


