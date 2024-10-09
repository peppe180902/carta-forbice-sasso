import React from 'react';

interface PunteggioProps {
  punteggioGiocatore: number;
  punteggioComputer: number;
  modalitaGioco: 'umano-vs-computer' | 'computer-vs-computer';
}

const Punteggio: React.FC<PunteggioProps> = ({ punteggioGiocatore, punteggioComputer, modalitaGioco }) => {
  const giocatore1 = modalitaGioco === 'umano-vs-computer' ? 'Giocatore' : 'Computer 1';
  const giocatore2 = 'Computer' + (modalitaGioco === 'computer-vs-computer' ? ' 2' : '');

  return (
    <div className="mb-6 text-center">
      <h2 className="text-2xl font-bold mb-2">Punteggio</h2>
      <div className="flex justify-center space-x-8">
        <div>
          <p className="font-semibold">{giocatore1}</p>
          <p className="text-3xl font-bold">{punteggioGiocatore}</p>
        </div>
        <div>
          <p className="font-semibold">{giocatore2}</p>
          <p className="text-3xl font-bold">{punteggioComputer}</p>
        </div>
      </div>
    </div>
  );
};

export default Punteggio;