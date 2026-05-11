import { useState } from 'react';
import styled from 'styled-components';
import { Button, FluidContainer, Select, Typography } from 'components';
import { Colors, Spaces } from 'theme';
import type { V2Policy, V2PageRow } from './types';

interface AccessPolicyEditorProps {
  policies: V2Policy[];
  pages: V2PageRow[];
  onAdd: (pageId: number, action: string, scope: string) => Promise<void>;
  onRemove: (policyId: number) => Promise<void>;
}

const PolicyChip = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${Spaces.sm};
  padding: ${Spaces.xs} ${Spaces.sm};
  background: ${Colors.greyLightest};
  border-radius: 4px;
`;

const RemoveBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 3px;
  background: transparent;
  color: ${Colors.greyDarker};
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background: ${Colors.greyLighter};
    color: ${Colors.black};
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

const AddForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: ${Spaces.sm};
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyNote = styled.div`
  padding: ${Spaces.xs} 0;
  color: ${Colors.greyDarker};
`;

export function AccessPolicyEditor({
  policies,
  pages,
  onAdd,
  onRemove,
}: AccessPolicyEditorProps) {
  const [selPageId, setSelPageId] = useState('');
  const [selAction, setSelAction] = useState('');
  const [selScope, setSelScope] = useState('');
  const [adding, setAdding] = useState(false);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const selectedPage = pages.find((p) => String(p.id) === selPageId);
  const pageItems = pages.map((p) => ({ label: p.title, value: String(p.id) }));
  const actionItems =
    selectedPage?.page_actions.map((a) => ({
      label: a.label,
      value: a.action,
    })) ?? [];
  const scopeItems =
    selectedPage?.page_scopes.map((s) => ({
      label: s.label,
      value: s.scope,
    })) ?? [];

  const handlePageChange = (val: string) => {
    setSelPageId(val);
    setSelAction('');
    setSelScope('');
  };

  const handleAdd = async () => {
    if (!selPageId || !selAction || !selScope || adding) return;
    setAdding(true);
    try {
      await onAdd(Number(selPageId), selAction, selScope);
      setSelPageId('');
      setSelAction('');
      setSelScope('');
    } finally {
      setAdding(false);
    }
  };

  const handleRemove = async (policyId: number) => {
    setRemovingId(policyId);
    try {
      await onRemove(policyId);
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <FluidContainer padding="0" flex flexDirection="column" gap={Spaces.sm}>
      {policies.length === 0 ? (
        <EmptyNote>
          <Typography as="span" variant="label" size="sm" weight="400">
            No direct policies assigned.
          </Typography>
        </EmptyNote>
      ) : (
        <FluidContainer padding="0" flex flexDirection="column" gap={Spaces.xs}>
          {policies.map((p) => (
            <PolicyChip key={p.id}>
              <Typography as="span" variant="label" size="sm" weight="400">
                {p.page_title}: {p.action} / {p.scope}
              </Typography>
              <RemoveBtn
                type="button"
                aria-label={`Remove ${p.page_title} ${p.action} policy`}
                onClick={() => handleRemove(p.id)}
                disabled={removingId === p.id}
              >
                ×
              </RemoveBtn>
            </PolicyChip>
          ))}
        </FluidContainer>
      )}

      <AddForm>
        <Select
          ariaLabel="Select page"
          placeholder="Page"
          items={pageItems}
          value={selPageId}
          onValueChange={handlePageChange}
          disabled={adding}
        />
        <Select
          ariaLabel="Select action"
          placeholder="Action"
          items={actionItems}
          value={selAction}
          onValueChange={setSelAction}
          disabled={!selPageId || adding}
        />
        <Select
          ariaLabel="Select scope"
          placeholder="Scope"
          items={scopeItems}
          value={selScope}
          onValueChange={setSelScope}
          disabled={!selPageId || adding}
        />
        <Button
          type="button"
          onClick={handleAdd}
          disabled={!selPageId || !selAction || !selScope || adding}
        >
          {adding ? 'Adding…' : 'Add'}
        </Button>
      </AddForm>
    </FluidContainer>
  );
}

export default AccessPolicyEditor;
