import React from 'react';
import Image from 'next/image';
import { Scelta, scelte } from '../config/gameConfig';

interface SceltaGiocatoreProps {
  onScelta: (scelta: Scelta) => void;
}

const SceltaGiocatore: React.FC<SceltaGiocatoreProps> = ({ onScelta }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Fai la tua scelta:</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {scelte.map(({ valore, immagine }) => (
          <button
            key={valore}
            onClick={() => onScelta(valore)}
            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <Image 
              src={immagine} 
              alt={valore} 
              width={60} 
              height={60} 
              className="object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SceltaGiocatore;