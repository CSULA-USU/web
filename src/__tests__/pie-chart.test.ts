import {
  formatLegendValue,
  getPercentLabelPosition,
  getViewBox,
  PERCENT_LABEL_SIZE,
  type PieSegment,
} from 'components/PieChart/PieChart';

const segment = (overrides: Partial<PieSegment> = {}): PieSegment => ({
  id: 'bond',
  label: 'Bond payment',
  percentage: 33,
  color: 'gold',
  ...overrides,
});

describe('getPercentLabelPosition', () => {
  it('places a 33% slice label in the middle of its wedge', () => {
    const position = getPercentLabelPosition(33, -90);

    expect(position.x).toBeGreaterThan(290);
    expect(position.x).toBeLessThan(310);
    expect(position.y).toBeGreaterThan(130);
    expect(position.y).toBeLessThan(150);
  });
});

describe('getViewBox', () => {
  it('crops the donut past its stroke, to clear the labels that sit outside it', () => {
    expect(getViewBox('donut')).toBe('56 56 288 288');
  });

  /* A 1% segment at the top of the ring is the tightest case on the fee page:
     its label sits nearly straight up, so any crop taken from the stroke alone
     cuts the digits off. */
  it('leaves room for a sliver label at the top of the donut ring', () => {
    const { y } = getPercentLabelPosition(1, 266.4);
    const [, top] = getViewBox('donut').split(' ').map(Number);

    expect(y - PERCENT_LABEL_SIZE).toBeGreaterThan(top);
  });

  it('leaves the wider pie almost uncropped', () => {
    expect(getViewBox('pie')).toBe('12 12 376 376');
  });

  it('keeps both variants centered on the same point the wedges rotate about', () => {
    for (const variant of ['donut', 'pie'] as const) {
      const [x, y, width, height] = getViewBox(variant).split(' ').map(Number);

      expect(x + width / 2).toBe(200);
      expect(y + height / 2).toBe(200);
    }
  });
});

describe('formatLegendValue', () => {
  it('joins the percentage to an amount and its suffix', () => {
    expect(
      formatLegendValue(segment({ amount: '$75.00' }), 'of your fee'),
    ).toBe('33% · $75.00 of your fee');
  });

  it('omits the suffix when the caller passes none', () => {
    expect(formatLegendValue(segment({ amount: '$75.00' }))).toBe(
      '33% · $75.00',
    );
  });

  it('drops the separator entirely for a segment with no amount', () => {
    expect(formatLegendValue(segment(), 'of your fee')).toBe('33%');
  });
});
