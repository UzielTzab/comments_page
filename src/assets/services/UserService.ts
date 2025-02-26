import { User } from "../interface/user";

const API_BASE_URL = "https://apiflowershop.onrender.com/api/users";


export async function GetLoginUser(email: string, password: string): Promise<User | null> {
    const userLoginData = { email: email, password: password }; // Datos a enviar

    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userLoginData)
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Credenciales incorrectas");
            } else {
                throw new Error("Ocurrió un error al intentar iniciar sesión");
            }
        }

        const userData: User = await response.json();
        console.log("Iniciado correctamente");
        return userData;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function SignUser(user: User): Promise<User | null> {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error("Ocurrió un error al intentar registrar el usuario");
        }
        const userData: User = await response.json();

        console.log("Registrado correctamente");
        return userData;
    } catch (error) {
        console.error(error);
        return null;
    }
}


