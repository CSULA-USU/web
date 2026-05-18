import { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import { Button, FluidContainer, Input, Typography } from 'components';
import BaseModal from 'modules/Modals/BaseModal';
import { Colors, Spaces } from 'theme';
import { useToast } from 'context/ToastContext';
import type { V2PageRow, V2PageAction, V2PageScope } from './types';

interface AccessManagementPageModalProps {
  page: V2PageRow | null;
  onClose: () => void;
  onSaved: () => void;
}

const SectionTitle = styled.div`
  padding-bottom: ${Spaces.xs};
  border-bottom: 1px solid ${Colors.grey};
  margin-bottom: ${Spaces.sm};
`;

const Field = styled.label`
  display: grid;
  gap: ${Spaces.xs};
`;

const Form = styled.form`
  display: grid;
  gap: ${Spaces.md};
`;

const ItemChip = styled.div`
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

const AddRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: ${Spaces.sm};
  align-items: end;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyNote = styled.div`
  color: ${Colors.greyDarker};
`;

export function AccessManagementPageModal({
  page,
  onClose,
  onSaved,
}: AccessManagementPageModalProps) {
  const { showToast } = useToast();
  const isCreate = page === null;

  const [pageKey, setPageKey] = useState(page?.page_key ?? '');
  const [title, setTitle] = useState(page?.title ?? '');
  const [route, setRoute] = useState(page?.route ?? '');
  const [description, setDescription] = useState(page?.description ?? '');
  const [savingBasics, setSavingBasics] = useState(false);

  const [localActions, setLocalActions] = useState<V2PageAction[]>(
    page?.page_actions ?? [],
  );
  const [localScopes, setLocalScopes] = useState<V2PageScope[]>(
    page?.page_scopes ?? [],
  );

  const [newActionKey, setNewActionKey] = useState('');
  const [newActionLabel, setNewActionLabel] = useState('');
  const [addingAction, setAddingAction] = useState(false);
  const [removingActionId, setRemovingActionId] = useState<number | null>(null);

  const [newScopeKey, setNewScopeKey] = useState('');
  const [newScopeLabel, setNewScopeLabel] = useState('');
  const [addingScope, setAddingScope] = useState(false);
  const [removingScopeId, setRemovingScopeId] = useState<number | null>(null);

  const handleBasicsSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !route.trim()) return;
    if (isCreate && !pageKey.trim()) return;

    setSavingBasics(true);
    try {
      if (isCreate) {
        const res = await fetch('/api/backoffice/pages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page_key: pageKey.trim(),
            title: title.trim(),
            route: route.trim(),
            description: description.trim() || null,
          }),
        });
        if (!res.ok) {
          const data = await res.json();
          showToast(data.error ?? 'Failed to create page.', 'error');
          return;
        }
        showToast('Page created.', 'success');
        onSaved();
        onClose();
      } else {
        const res = await fetch(`/api/backoffice/pages/${page.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: title.trim(),
            route: route.trim(),
            description: description.trim() || null,
          }),
        });
        if (!res.ok) {
          const data = await res.json();
          showToast(data.error ?? 'Failed to update page.', 'error');
          return;
        }
        showToast('Page updated.', 'success');
        onSaved();
      }
    } finally {
      setSavingBasics(false);
    }
  };

  const handleAddAction = async () => {
    if (!page || !newActionKey.trim() || !newActionLabel.trim() || addingAction)
      return;
    setAddingAction(true);
    try {
      const res = await fetch(`/api/backoffice/pages/${page.id}/actions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: newActionKey.trim(),
          label: newActionLabel.trim(),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        showToast(data.error ?? 'Failed to add action.', 'error');
        return;
      }
      const created: V2PageAction = await res.json();
      setLocalActions((prev) => [...prev, created]);
      setNewActionKey('');
      setNewActionLabel('');
      showToast('Action added.', 'success');
      onSaved();
    } finally {
      setAddingAction(false);
    }
  };

  const handleRemoveAction = async (actionId: number) => {
    if (!page) return;
    setRemovingActionId(actionId);
    try {
      const res = await fetch(`/api/backoffice/pages/${page.id}/actions`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action_id: actionId }),
      });
      if (!res.ok) {
        const data = await res.json();
        showToast(data.error ?? 'Failed to remove action.', 'error');
        return;
      }
      setLocalActions((prev) => prev.filter((a) => a.id !== actionId));
      showToast('Action removed.', 'success');
      onSaved();
    } finally {
      setRemovingActionId(null);
    }
  };

  const handleAddScope = async () => {
    if (!page || !newScopeKey.trim() || !newScopeLabel.trim() || addingScope)
      return;
    setAddingScope(true);
    try {
      const res = await fetch(`/api/backoffice/pages/${page.id}/scopes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scope: newScopeKey.trim(),
          label: newScopeLabel.trim(),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        showToast(data.error ?? 'Failed to add scope.', 'error');
        return;
      }
      const created: V2PageScope = await res.json();
      setLocalScopes((prev) => [...prev, created]);
      setNewScopeKey('');
      setNewScopeLabel('');
      showToast('Scope added.', 'success');
      onSaved();
    } finally {
      setAddingScope(false);
    }
  };

  const handleRemoveScope = async (scopeId: number) => {
    if (!page) return;
    setRemovingScopeId(scopeId);
    try {
      const res = await fetch(`/api/backoffice/pages/${page.id}/scopes`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scope_id: scopeId }),
      });
      if (!res.ok) {
        const data = await res.json();
        showToast(data.error ?? 'Failed to remove scope.', 'error');
        return;
      }
      setLocalScopes((prev) => prev.filter((s) => s.id !== scopeId));
      showToast('Scope removed.', 'success');
      onSaved();
    } finally {
      setRemovingScopeId(null);
    }
  };

  return (
    <BaseModal
      title={isCreate ? 'Add Page' : `Edit Page: ${page.title}`}
      onClose={onClose}
      maxWidth="640px"
    >
      <FluidContainer padding="0" flex flexDirection="column" gap={Spaces.lg}>
        {/* ── Basics ─────────────────────────────────────────── */}
        <div>
          <SectionTitle>
            <Typography as="h3" variant="labelTitle" size="sm">
              {isCreate ? 'Page Details' : 'Basics'}
            </Typography>
          </SectionTitle>
          <Form id="page-basics-form" onSubmit={handleBasicsSubmit}>
            {isCreate && (
              <Field>
                <Typography as="span" variant="label" size="sm" weight="600">
                  Page Key
                </Typography>
                <Input
                  type="text"
                  value={pageKey}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPageKey(e.target.value)
                  }
                  placeholder="e.g. events"
                  required
                />
              </Field>
            )}
            <Field>
              <Typography as="span" variant="label" size="sm" weight="600">
                Title
              </Typography>
              <Input
                type="text"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                required
              />
            </Field>
            <Field>
              <Typography as="span" variant="label" size="sm" weight="600">
                Route
              </Typography>
              <Input
                type="text"
                value={route}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setRoute(e.target.value)
                }
                placeholder="/backoffice/..."
                required
              />
            </Field>
            <Field>
              <Typography as="span" variant="label" size="sm" weight="600">
                Description
              </Typography>
              <Input
                type="text"
                value={description}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDescription(e.target.value)
                }
              />
            </Field>
            <div>
              <Button
                type="submit"
                form="page-basics-form"
                disabled={savingBasics}
              >
                {savingBasics
                  ? 'Saving…'
                  : isCreate
                  ? 'Create Page'
                  : 'Save Changes'}
              </Button>
            </div>
          </Form>
        </div>

        {/* ── Actions (edit mode only) ────────────────────────── */}
        {!isCreate && (
          <div>
            <SectionTitle>
              <Typography as="h3" variant="labelTitle" size="sm">
                Actions
              </Typography>
            </SectionTitle>
            <FluidContainer
              padding="0"
              flex
              flexDirection="column"
              gap={Spaces.sm}
            >
              {localActions.length === 0 ? (
                <EmptyNote>
                  <Typography as="span" variant="label" size="sm" weight="400">
                    No actions defined.
                  </Typography>
                </EmptyNote>
              ) : (
                <FluidContainer
                  padding="0"
                  flex
                  flexDirection="column"
                  gap={Spaces.xs}
                >
                  {localActions.map((a) => (
                    <ItemChip key={a.id}>
                      <Typography
                        as="span"
                        variant="label"
                        size="sm"
                        weight="400"
                      >
                        {a.action} — {a.label}
                      </Typography>
                      <RemoveBtn
                        type="button"
                        aria-label={`Remove action ${a.action}`}
                        onClick={() => handleRemoveAction(a.id)}
                        disabled={removingActionId === a.id}
                      >
                        ×
                      </RemoveBtn>
                    </ItemChip>
                  ))}
                </FluidContainer>
              )}
              <AddRow>
                <Input
                  type="text"
                  value={newActionKey}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewActionKey(e.target.value)
                  }
                  placeholder="Key (e.g. edit)"
                  disabled={addingAction}
                />
                <Input
                  type="text"
                  value={newActionLabel}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewActionLabel(e.target.value)
                  }
                  placeholder="Label (e.g. Edit)"
                  disabled={addingAction}
                />
                <Button
                  type="button"
                  onClick={handleAddAction}
                  disabled={
                    !newActionKey.trim() ||
                    !newActionLabel.trim() ||
                    addingAction
                  }
                >
                  {addingAction ? 'Adding…' : 'Add'}
                </Button>
              </AddRow>
            </FluidContainer>
          </div>
        )}

        {/* ── Scopes (edit mode only) ─────────────────────────── */}
        {!isCreate && (
          <div>
            <SectionTitle>
              <Typography as="h3" variant="labelTitle" size="sm">
                Scopes
              </Typography>
            </SectionTitle>
            <FluidContainer
              padding="0"
              flex
              flexDirection="column"
              gap={Spaces.sm}
            >
              {localScopes.length === 0 ? (
                <EmptyNote>
                  <Typography as="span" variant="label" size="sm" weight="400">
                    No scopes defined.
                  </Typography>
                </EmptyNote>
              ) : (
                <FluidContainer
                  padding="0"
                  flex
                  flexDirection="column"
                  gap={Spaces.xs}
                >
                  {localScopes.map((s) => (
                    <ItemChip key={s.id}>
                      <Typography
                        as="span"
                        variant="label"
                        size="sm"
                        weight="400"
                      >
                        {s.scope} — {s.label}
                      </Typography>
                      <RemoveBtn
                        type="button"
                        aria-label={`Remove scope ${s.scope}`}
                        onClick={() => handleRemoveScope(s.id)}
                        disabled={removingScopeId === s.id}
                      >
                        ×
                      </RemoveBtn>
                    </ItemChip>
                  ))}
                </FluidContainer>
              )}
              <AddRow>
                <Input
                  type="text"
                  value={newScopeKey}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewScopeKey(e.target.value)
                  }
                  placeholder="Key (e.g. own)"
                  disabled={addingScope}
                />
                <Input
                  type="text"
                  value={newScopeLabel}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewScopeLabel(e.target.value)
                  }
                  placeholder="Label (e.g. Own records)"
                  disabled={addingScope}
                />
                <Button
                  type="button"
                  onClick={handleAddScope}
                  disabled={
                    !newScopeKey.trim() || !newScopeLabel.trim() || addingScope
                  }
                >
                  {addingScope ? 'Adding…' : 'Add'}
                </Button>
              </AddRow>
            </FluidContainer>
          </div>
        )}
      </FluidContainer>
    </BaseModal>
  );
}

export default AccessManagementPageModal;
