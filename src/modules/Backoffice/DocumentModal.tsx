import styled from 'styled-components';
import { useState, useEffect, useCallback, type FormEvent } from 'react';
import type { BODMeetingDocs, Category } from 'types/Backoffice';
import { normalizeDateISO } from 'utils/dates';
import { useToast } from 'context/ToastContext';

interface DocumentModalProps {
  meetingDocs: BODMeetingDocs | null;
  initialCategory?: Category;
  onClose: () => void;
  onSubmit: (data: Omit<BODMeetingDocs, 'id'>) => void;
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
`;

const Modal = styled.div`
  background-color: #fff;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const ModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
    color: #333;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.3);
  }
`;

const ModalBody = styled.form`
  padding: 24px;
`;
const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  transition: all 0.2s ease;

  &:hover {
    border-color: #999;
  }
  &:focus {
    outline: none;
    border-color: #06c;
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
  }
  &::placeholder {
    color: #999;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #999;
  }
  &:focus {
    outline: none;
    border-color: #06c;
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
  }
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const RedAsterisk = styled.span`
  color: red;
  margin-left: 2px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ variant }) =>
    variant === 'primary'
      ? `
        background-color: #0066cc;
        color: #fff;
        &:hover { background-color: #0052a3; }
        &:focus { outline: none; box-shadow: 0 0 0 3px rgba(0,102,204,.3); }
      `
      : `
        background-color: #f0f0f0;
        color: #333;
        &:hover { background-color: #e0e0e0; }
        &:focus { outline: none; box-shadow: 0 0 0 3px rgba(0,0,0,.1); }
      `}

  &:active {
    transform: translateY(1px);
  }
`;

export function DocumentModal({
  meetingDocs,
  initialCategory,
  onClose,
  onSubmit,
}: DocumentModalProps) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<Omit<BODMeetingDocs, 'id'>>({
    title: '',
    url: '',
    category:
      !initialCategory || initialCategory === 'Calendar'
        ? 'Agenda'
        : initialCategory,
    date: '',
    isDownloadAll: false,
    fy: null,
    isArchived: false,
    createdAt: null,
    updatedAt: null,
  });

  useEffect(() => {
    if (meetingDocs) {
      setFormData({
        title: meetingDocs.title,
        url: meetingDocs.url,
        category: meetingDocs.category,
        date: normalizeDateISO(meetingDocs.date),
        fy: meetingDocs.fy ?? null,
        isArchived: !!meetingDocs.isArchived,
        isDownloadAll: !!meetingDocs.isDownloadAll,
        createdAt: meetingDocs.createdAt ?? null,
        updatedAt: meetingDocs.updatedAt ?? null,
      });
    } else {
      setFormData({
        title: '',
        url: '',
        category: !initialCategory ? 'Agenda' : initialCategory,
        date: '',
        fy: null,
        isArchived: false,
        isDownloadAll: false,
        createdAt: null,
        updatedAt: null,
      });
    }
  }, [meetingDocs, initialCategory]);
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const payload: Omit<BODMeetingDocs, 'id'> = {
        ...formData,
        date: normalizeDateISO(formData.date),
      };

      const isCalendar = payload.category === 'Calendar';
      const requiresDate = !isCalendar;
      const isIsoDate = /^\d{4}-\d{2}-\d{2}$/.test(payload.date ?? '');

      try {
        // validates both http(s) and file/blob URLs; adjust if needed
        new URL(payload.url);
      } catch {
        alert('Please enter a valid URL.');
        return;
      }
      if (requiresDate && !isIsoDate) {
        showToast('Please select the meeting date (YYYY-MM-DD).', 'error');
        return;
      }
      if (requiresDate && !isIsoDate) {
        alert('Please select the meeting date (YYYY-MM-DD).');
        return;
      }
      if (isCalendar) {
        alert('Calendar already exists. Please update existing calendar.');
        return;
      }

      onSubmit(payload);
    },
    [formData, onSubmit],
  );

  return (
    <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <Modal role="dialog" aria-labelledby="modal-title" aria-modal="true">
        <ModalHeader>
          <ModalTitle id="modal-title">
            {meetingDocs ? 'Edit Document' : 'Add New Document'}
          </ModalTitle>
          <CloseButton onClick={onClose} aria-label="Close modal" type="button">
            ×
          </CloseButton>
        </ModalHeader>

        <ModalBody onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">
              Document Title<RedAsterisk>*</RedAsterisk>
            </Label>
            <Input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g., Board of Directors Aug 22, 2025"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="url">
              Link URL<RedAsterisk>*</RedAsterisk>
            </Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              placeholder="https://example.com/document.pdf"
              inputMode="url"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="category">
              Category<RedAsterisk>*</RedAsterisk>
            </Label>
            <Select
              id="category"
              value={formData.category}
              onChange={(e) => {
                const next = e.target.value as Category;
                setFormData((prev) => ({
                  ...prev,
                  category: !document && next === 'Calendar' ? 'Agenda' : next,
                }));
              }}
              required
            >
              <option value="Agenda">Agenda</option>
              <option value="Minutes">Minutes</option>
              <option value="Calendar">Meeting Calendar</option>
            </Select>
          </FormGroup>

          {formData.category !== 'Calendar' && !formData.isDownloadAll && (
            <FormGroup>
              <Label htmlFor="date">
                Meeting Date * (the date the meeting occurred)
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    date: normalizeDateISO(e.target.value),
                  })
                }
                required
                pattern="\\d{4}-\\d{2}-\\d{2}"
                placeholder="YYYY-MM-DD"
              />
            </FormGroup>
          )}

          {/* Optional FY input — unhide if you want to capture it here
          <FormGroup>
            <Label htmlFor="fy">Fiscal Year (optional)</Label>
            <Input
              id="fy"
              type="text"
              value={formData.fy ?? ''}
              onChange={(e) => setFormData({ ...formData, fy: e.target.value || null })}
              placeholder="e.g., 2025–2026 or FY25"
            />
          </FormGroup>
          */}

          <ModalFooter>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {meetingDocs ? 'Update' : 'Add'} Document
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </Overlay>
  );
}
