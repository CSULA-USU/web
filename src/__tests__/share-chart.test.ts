import { getPercentLabelPosition } from 'modules/KeepTheUOpen/ShareChart';

describe('getPercentLabelPosition', () => {
  it('places a 33% slice label in the middle of its wedge', () => {
    const position = getPercentLabelPosition(33, -90);

    expect(position.x).toBeGreaterThan(290);
    expect(position.x).toBeLessThan(310);
    expect(position.y).toBeGreaterThan(130);
    expect(position.y).toBeLessThan(150);
  });
});
