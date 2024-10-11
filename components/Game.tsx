'use client'

import React, { useState } from 'react';
import { Scelta, StatoGioco, Risultato } from '../interface';
import SceltaGiocatore from './SceltaGiocatore';
import SceltaComputer from './SceltaComputer';
import Punteggio from './Punteggio';
import { computerMossa, vincitore } from '@/utils/logicGame';
import ButtonNuovoGame from './ButtonNuovoGame';

const Gioco: React.FC = () => {
    const [statoGioco, setStatoGioco] = useState<StatoGioco>({
        sceltaGiocatore: null,
        sceltaComputer: null,
        sceltaComputer2: null,
        risultato: null,
        modalitaGioco: 'umano-vs-computer',
        punteggioGiocatore: 0,
        punteggioComputer: 0,
        vittoriaFinale: null,
    });

    const aggiornaPunteggio = (risultato: Risultato) => {
        let { punteggioGiocatore, punteggioComputer } = statoGioco;
        if (risultato === 'vittoria') {
            punteggioGiocatore++;
        } else if (risultato === 'sconfitta') {
            punteggioComputer++;
        }
        return { punteggioGiocatore, punteggioComputer };
    };

    const controllaVittoriaFinale = (punteggioGiocatore: number, punteggioComputer: number) => {
        if (punteggioGiocatore === 3) return 'giocatore';
        if (punteggioComputer === 3) return 'computer';
        return null;
    };

    const gestisciSceltaGiocatore = (scelta: Scelta) => {
        if (statoGioco.vittoriaFinale) return;

        const sceltaComputer = computerMossa();
        const risultato = vincitore(scelta, sceltaComputer);
        const { punteggioGiocatore, punteggioComputer } = aggiornaPunteggio(risultato);
        const vittoriaFinale = controllaVittoriaFinale(punteggioGiocatore, punteggioComputer);

        setStatoGioco({
            ...statoGioco,
            sceltaGiocatore: scelta,
            sceltaComputer,
            risultato,
            punteggioGiocatore,
            punteggioComputer,
            vittoriaFinale,
        });
    };

    const gestisciComputerVsComputer = () => {
        if (statoGioco.vittoriaFinale) return;

        const scelta1 = computerMossa();
        const scelta2 = computerMossa();
        const risultato = vincitore(scelta1, scelta2);
        const { punteggioGiocatore, punteggioComputer } = aggiornaPunteggio(risultato);
        const vittoriaFinale = controllaVittoriaFinale(punteggioGiocatore, punteggioComputer);

        setStatoGioco({
            ...statoGioco,
            sceltaGiocatore: scelta1,
            sceltaComputer: scelta2,
            risultato,
            punteggioGiocatore,
            punteggioComputer,
            vittoriaFinale,
        });
    };

    const iniziaNuovaPartita = () => {
        setStatoGioco({
            sceltaGiocatore: null,
            sceltaComputer: null,
            sceltaComputer2: null,
            risultato: null,
            modalitaGioco: statoGioco.modalitaGioco,
            punteggioGiocatore: 0,
            punteggioComputer: 0,
            vittoriaFinale: null,
        });
    };

    const cambiaModalitaGioco = () => {
        setStatoGioco(prevState => ({
            ...prevState,
            modalitaGioco: prevState.modalitaGioco === 'umano-vs-computer' ? 'computer-vs-computer' : 'umano-vs-computer',
            sceltaGiocatore: null,
            sceltaComputer: null,
            sceltaComputer2: null,
            risultato: null,
            punteggioGiocatore: 0,
            punteggioComputer: 0,
            vittoriaFinale: null,
        }));
    };

    const getNomeVincitore = () => {
        if (statoGioco.modalitaGioco === 'umano-vs-computer') {
            return statoGioco.vittoriaFinale === 'giocatore' ? 'Giocatore' : 'Computer';
        } else {
            return statoGioco.vittoriaFinale === 'giocatore' ? 'Computer 1' : 'Computer 2';
        }
    };

    const getRisultatoPcVsPc = () => {
        if (statoGioco.modalitaGioco === 'computer-vs-computer' && statoGioco.risultato) {
            switch (statoGioco.risultato) {
                case 'vittoria':
                    return 'Computer 1 vince il round!';
                case 'sconfitta':
                    return 'Computer 2 vince il round!';
                case 'pareggio':
                    return 'Pareggio in questo round!';
            }
        }
        return null;
    };

    const getRisultatoPlayerVsPc = () => {
        if (statoGioco.modalitaGioco === 'umano-vs-computer' && statoGioco.risultato) {
            switch (statoGioco.risultato) {
                case 'vittoria':
                    return 'Giocatore vince il round!';
                case 'sconfitta':
                    return 'Computer vince il round!';
                case 'pareggio':
                    return 'Pareggio in questo round!';
            }
        }
        return null;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8 text-blue-600">Sasso Carta Forbice</h1>
            <div className="bg-white p-8 rounded-lg w-full shadow-md">
                <Punteggio
                    punteggioGiocatore={statoGioco.punteggioGiocatore}
                    punteggioComputer={statoGioco.punteggioComputer}
                    modalitaGioco={statoGioco.modalitaGioco}
                />
                
                {statoGioco.vittoriaFinale && (
                    <div className="mb-6 text-center">
                        <h2 className="text-3xl font-bold text-green-600">
                            {`${getNomeVincitore()} ha vinto la partita!`}
                        </h2>
                    </div>
                )}

                <div className='flex justify-between flex-col md:flex-row'>
                    <button
                        onClick={cambiaModalitaGioco}
                        className="mb-4 bg-blue-500 text-white px-4 py-4 rounded hover:bg-blue-600 transition-colors"
                    >
                        {statoGioco.modalitaGioco === 'umano-vs-computer' ? 'Passa a Computer vs Computer' : 'Passa a Umano vs Computer'}
                    </button>

                    {statoGioco.modalitaGioco === 'computer-vs-computer' && (
                        <button
                            onClick={gestisciComputerVsComputer}
                            className="bg-green-500 text-white px-4 py-4 rounded hover:bg-green-600 transition-colors"
                        >
                            Avvia Computer vs Computer
                        </button>
                    )}
                </div>


                {statoGioco.modalitaGioco === 'umano-vs-computer' && (
                    <SceltaGiocatore onScelta={gestisciSceltaGiocatore} />
                )}


                <div className="flex justify-around mt-4">
                    <SceltaComputer
                        scelta={statoGioco.sceltaGiocatore}
                        etichetta={statoGioco.modalitaGioco === 'computer-vs-computer' ? 'Computer 1' : 'Giocatore'}
                    />
                    <SceltaComputer
                        scelta={statoGioco.sceltaComputer}
                        etichetta={statoGioco.modalitaGioco === 'computer-vs-computer' ? 'Computer 2' : 'Computer'}
                    />
                </div>
                {getRisultatoPcVsPc() && (
                    <div className="mt-4 text-center font-bold text-lg text-blue-600">
                        {getRisultatoPcVsPc()}
                    </div>
                )}
                {getRisultatoPlayerVsPc() && (
                    <div className="mt-4 text-center font-bold text-lg text-blue-600">
                        {getRisultatoPlayerVsPc()}
                    </div>
                )}
                
                <ButtonNuovoGame onClick={iniziaNuovaPartita} />
            </div>
        </div>
    );
};

export default Gioco;