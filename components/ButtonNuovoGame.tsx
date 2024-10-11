import React from 'react';

interface ButtonNuovoGameProps {
  onClick: () => void;
}

const ButtonNuovoGame: React.FC<ButtonNuovoGameProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 mt-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
    >
      Nuova Partita
    </button>
  );
};

export default ButtonNuovoGame;