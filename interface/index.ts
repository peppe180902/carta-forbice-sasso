export type Scelta = 'sasso' | 'carta' | 'forbice';
export type Risultato = 'vittoria' | 'sconfitta' | 'pareggio';
export type ModalitaGioco = 'umano-vs-computer' | 'computer-vs-computer';

export interface StatoGioco {
  sceltaGiocatore: Scelta | null;
  sceltaComputer: Scelta | null;
  risultato: Risultato | null;
  modalitaGioco: ModalitaGioco;
  punteggioGiocatore: number;
  punteggioComputer: number;
  vittoriaFinale: 'giocatore' | 'computer' | null;
}