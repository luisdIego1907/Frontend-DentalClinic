import type { PatientDetails } from "../data/patient";
import {config} from "../config"

const API_URL = `${config.api.url}/api/patients`;

export async function getPatients() : Promise<PatientDetails[]>{

    try{

        const response = await fetch(API_URL);

        if(!response.ok){
            throw new Error("Error al obtener los productos");
        }

        return await response.json();
    } catch(error){
        console.error("Error en patientservice: " , error);
        throw error;
    }
}