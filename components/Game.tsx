'use client'
import React, { useState } from 'react';
import { Scelta, StatoGioco, Risultato } from '../interface';
import Image from 'next/image';
import { computerMossa, vincitore } from '../utils/logicGame';
import SceltaGiocatore from './SceltaGiocatore';
import SceltaComputer from './SceltaComputer';
import RisultatoGioco from './RisultatoGioco';
import Punteggio from './Punteggio';
import ButtonNuovoGame from './ButtonNuovoGame';

const Gioco: React.FC = () => {
    const [statoGioco, setStatoGioco] = useState<StatoGioco>({
        sceltaGiocatore: null,
        sceltaComputer: null,
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
        if (statoGioco.vittoriaFinale) return;  // Impedisce ulteriori mosse dopo la vittoria finale

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
        if (statoGioco.vittoriaFinale) return;  // Impedisce ulteriori mosse dopo la vittoria finale

        const scelta1 = computerMossa();
        const scelta2 = computerMossa();
        const risultato = vincitore(scelta1, scelta2);
        const { punteggioGiocatore, punteggioComputer } = aggiornaPunteggio(risultato);
        const vittoriaFinale = controllaVittoriaFinale(punteggioGiocatore, punteggioComputer);

        setStatoGioco({
            sceltaGiocatore: scelta1,
            sceltaComputer: scelta2,
            risultato,
            modalitaGioco: 'computer-vs-computer',
            punteggioGiocatore,
            punteggioComputer,
            vittoriaFinale,
        });
    };

    const iniziaNuovaPartita = () => {
        setStatoGioco({
            sceltaGiocatore: null,
            sceltaComputer: null,
            risultato: null,
            modalitaGioco: 'umano-vs-computer',
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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Image src={'/img/logo.png'} width={100} height={100} alt="" className='mb-4'/>
            <div className="bg-white p-8 rounded-lg shadow-md">
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
                <div className='flex flex-col'>
                    <button
                        onClick={cambiaModalitaGioco}
                        className="mb-4 bg-blue-500 text-white px-4 py-4 rounded hover:bg-blue-600 transition-colors"
                    >
                        {statoGioco.modalitaGioco === 'umano-vs-computer' ? 'Passa a Computer vs Computer' : 'Passa a Umano vs Computer'}
                    </button>
                    {statoGioco.modalitaGioco === 'umano-vs-computer' ? (
                        <SceltaGiocatore onScelta={gestisciSceltaGiocatore} />
                    ) : (
                        <button
                            onClick={gestisciComputerVsComputer}
                            className="bg-green-500 text-white px-4 py-4 mb-5 rounded hover:bg-green-600 transition-colors"
                        >
                            Avvia Computer vs Computer
                        </button>
                    )}
                </div>

                <SceltaComputer scelta={statoGioco.sceltaComputer} />
                <RisultatoGioco risultato={statoGioco.risultato} />
                <ButtonNuovoGame onClick={iniziaNuovaPartita} />
            </div>
        </div>
    );
};

export default Gioco;