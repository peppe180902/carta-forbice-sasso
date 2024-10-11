import React from 'react';
import Image from 'next/image';
import { Scelta, scelte } from '../config/gameConfig';

interface SceltaComputerProps {
  scelta: Scelta | null;
  etichetta: string;
}

const SceltaComputer: React.FC<SceltaComputerProps> = ({ scelta, etichetta }) => {
  return (
    <div className="mb-6 text-center">
      <h2 className="text-xl font-semibold mb-2">Scelta {etichetta}:</h2>
      {scelta ? (
        <div className="p-2 bg-white rounded-full shadow-md inline-block">
          <Image 
            src={scelte.find(s => s.valore === scelta)?.immagine || ''}
            alt={scelta}
            width={60}
            height={60}
            className="object-contain"
          />
        </div>
      ) : (
        <p className="text-lg text-gray-500">In attesa...</p>
      )}
    </div>
  );
};

export default SceltaComputer;