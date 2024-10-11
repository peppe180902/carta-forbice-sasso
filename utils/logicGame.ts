import { regolaVittoria, scelte } from "@/config/gameConfig";
import { Risultato, Scelta } from "@/interface";

export const computerMossa = () => {
    const indiceRandom = Math.floor(Math.random() * scelte.length);
    return scelte[indiceRandom].valore;
}

export function vincitore(sceltaGiocatore: Scelta, sceltaComputer: Scelta): Risultato {
    if (sceltaGiocatore === sceltaComputer) return 'pareggio';
  
    if (regolaVittoria[sceltaGiocatore].includes(sceltaComputer)) {
      return 'vittoria';
    }
    
    return 'sconfitta';
}