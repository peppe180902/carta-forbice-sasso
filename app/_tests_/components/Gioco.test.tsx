import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Gioco from '@/components/Game';

describe('Componente Gioco', () => {
  test('Renderizza correttamente', () => {
    render(<Gioco />);
    expect(screen.getByText('Sasso Carta Forbice')).toBeInTheDocument();
  });

  test('Cambia modalità di gioco', () => {
    render(<Gioco />);
    const cambiaModalitaButton = screen.getByText('Passa a Computer vs Computer');
    fireEvent.click(cambiaModalitaButton);
    expect(screen.getByText('Passa a Umano vs Computer')).toBeInTheDocument();
  });

  test('Gioca un round umano vs computer', () => {
    render(<Gioco />);
    const sceltaSasso = screen.getByAltText('sasso');
    fireEvent.click(sceltaSasso);
    expect(screen.getByText(/in questo round!/)).toBeInTheDocument();
  });

  test('Inizia una nuova partita', () => {
    render(<Gioco />);
    const nuovaPartitaButton = screen.getByText('Nuova Partita');
    fireEvent.click(nuovaPartitaButton);
    expect(screen.queryByText(/vince il round!/)).not.toBeInTheDocument();
  });
});