export type Scelta = 'sasso' | 'carta' | 'forbice';

export const scelte: { valore: Scelta; immagine: string }[] = [
  { valore: 'sasso', immagine: '/img/sasso.png' },
  { valore: 'carta', immagine: '/img/carta.png' },
  { valore: 'forbice', immagine: '/img/forbice.png' },
];

export const regolaVittoria: Record<Scelta, Scelta[]> = {
  sasso: ['forbice'],
  carta: ['sasso'],
  forbice: ['carta'],
};