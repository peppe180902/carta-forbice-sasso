import { Risultato } from '@/interface';
import React from 'react';

interface RisultatoGiocoProps {
  risultato: Risultato | null;
}

const RisultatoGioco: React.FC<RisultatoGiocoProps> = ({ risultato }) => {
  const getColorClass = (risultato: Risultato | null): string => {
    switch (risultato) {
      case 'vittoria':
        return 'text-green-600';
      case 'sconfitta':
        return 'text-red-600';
      case 'pareggio':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Risultato:</h2>
      {risultato ? (
        <p className={`text-2xl font-bold ${getColorClass(risultato)}`}>
          {risultato.charAt(0).toUpperCase() + risultato.slice(1)}
        </p>
      ) : (
        <p className="text-lg text-gray-500">In attesa del risultato...</p>
      )}
    </div>
  );
};

export default RisultatoGioco;