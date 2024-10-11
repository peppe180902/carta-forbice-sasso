import { Scelta } from "@/interface";
import { computerMossa, vincitore } from "@/utils/logicGame";

describe('Logica del gioco', () => {
  test('ottieniSceltaComputer restituisce una scelta valida', () => {
    const sceltaValida: Scelta[] = ['sasso', 'carta', 'forbice'];
    const sceltaComputer = computerMossa();
    expect(sceltaValida).toContain(sceltaComputer);
  });

  test('determinaVincitore funziona correttamente', () => {
    expect(vincitore('sasso', 'forbice')).toBe('vittoria');
    expect(vincitore('sasso', 'carta')).toBe('sconfitta');
    expect(vincitore('sasso', 'sasso')).toBe('pareggio');
    expect(vincitore('carta', 'sasso')).toBe('vittoria');
    expect(vincitore('carta', 'forbice')).toBe('sconfitta');
    expect(vincitore('forbice', 'carta')).toBe('vittoria');
    expect(vincitore('forbice', 'sasso')).toBe('sconfitta');
  });
});