import { Scelta } from '@/interface';
import React from 'react';

interface SceltaComputerProps {
  scelta: Scelta | null;
}

const SceltaComputer: React.FC<SceltaComputerProps> = ({ scelta }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Scelta del Computer:</h2>
      {scelta ? (
        <p className="text-lg">{scelta.charAt(0).toUpperCase() + scelta.slice(1)}</p>
      ) : (
        <p className="text-lg text-gray-500">In attesa...</p>
      )}
    </div>
  );
};

export default SceltaComputer;