import { jotformSubmissionsListState } from 'atoms';
import { useRecoilValue } from 'recoil';

export default function NuestraGrad() {
  const jotformSubmissions = useRecoilValue(jotformSubmissionsListState);
  console.log('jotform:', jotformSubmissions);
  return <div>yo</div>;
}
