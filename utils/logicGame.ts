import { Risultato, Scelta } from "@/interface";

export const scelte: Scelta[] = ['sasso', 'carta', 'forbice'];

export const computerMossa = () => {
  const indiceRandom = Math.floor(Math.random() * scelte.length);
  return scelte[indiceRandom];
}

export function vincitore(sceltaGiocatore: Scelta, sceltaComputer: Scelta): Risultato {
  if (sceltaGiocatore === sceltaComputer) return 'pareggio';
  
  if (
    (sceltaGiocatore === 'sasso' && sceltaComputer === 'forbice') ||
    (sceltaGiocatore === 'carta' && sceltaComputer === 'sasso') ||
    (sceltaGiocatore === 'forbice' && sceltaComputer === 'carta')
  ) {
    return 'vittoria';
  }
  
  return 'sconfitta';
}