import type React from 'react';
import styled from 'styled-components';
import { useState, useEffect, type FormEvent } from 'react';
import type { Document, Category } from 'types/Backoffice';
import { normalizeDateISO } from 'utils/dates';
import { useToast } from 'context/ToastContext';

interface DocumentModalProps {
  document: Document | null;
  initialCategory?: Category;
  onClose: () => void;
  onSubmit: (data: Omit<Document, 'id'>) => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
`;

const Modal = styled.div`
  background-color: #ffffff;
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
  color: #666666;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
    color: #333333;
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
  color: #333333;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  font-size: 14px;
  color: #333333;
  transition: all 0.2s ease;

  &:hover {
    border-color: #999999;
  }

  &:focus {
    outline: none;
    border-color: #0066cc;
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
  }

  &::placeholder {
    color: #999999;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  font-size: 14px;
  color: #333333;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #999999;
  }

  &:focus {
    outline: none;
    border-color: #0066cc;
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

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) =>
    props.variant === 'primary'
      ? `
    background-color: #0066cc;
    color: #ffffff;
    &:hover {
      background-color: #0052a3;
    }
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.3);
    }
  `
      : `
    background-color: #f0f0f0;
    color: #333333;
    &:hover {
      background-color: #e0e0e0;
    }
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
    }
  `}

  &:active {
    transform: translateY(1px);
  }
`;
interface DocumentModalProps {
  document: Document | null;
  onClose: () => void;
  onSubmit: (data: Omit<Document, 'id'>) => void;
}

export function DocumentModal({
  document,
  initialCategory,
  onClose,
  onSubmit,
}: DocumentModalProps) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<Omit<Document, 'id'>>({
    title: '',
    url: '',
    category:
      !initialCategory || initialCategory === 'Calendar'
        ? 'Agenda'
        : initialCategory,
    date: '',
    fy: '',
    is_download_all: false,
  });

  useEffect(() => {
    if (document) {
      setFormData({
        title: document.title,
        url: document.url,
        category: document.category,
        date: normalizeDateISO(document.date ?? ''),
        fy: document.fy,
        is_download_all: document.is_download_all,
      });
    } else {
      setFormData({
        title: '',
        url: '',
        category: !initialCategory ? 'Agenda' : initialCategory,
        date: '',
        fy: '',
        is_download_all: false,
      });
    }
  }, [document, initialCategory]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const isCalendar = formData.category === 'Calendar';
    const isDownloadAll = !!formData.is_download_all;
    const requiresDate = !isCalendar && !isDownloadAll;
    const uiDate = normalizeDateISO(formData.date ?? '');

    try {
      new URL(formData.url);
    } catch {
      showToast('Please enter a valid URL.', 'error');
      return;
    }

    const isIsoDate = /^\d{4}-\d{2}-\d{2}$/.test(uiDate);
    if (requiresDate && !isIsoDate) {
      showToast('Please select the meeting date (YYYY-MM-DD).', 'error');
      return;
    }

    const payloadDate: string | null = requiresDate ? uiDate || null : null;

    const payload: Omit<Document, 'id'> = {
      ...formData,
      date: payloadDate,
    };

    onSubmit(payload);
  };
  return (
    <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <Modal role="dialog" aria-labelledby="modal-title" aria-modal="true">
        <ModalHeader>
          <ModalTitle id="modal-title">
            {document ? 'Edit Document' : 'Add New Document'}
          </ModalTitle>
          <CloseButton onClick={onClose} aria-label="Close modal" type="button">
            ×
          </CloseButton>
        </ModalHeader>

        <ModalBody onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">Document Title *</Label>
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
            <Label htmlFor="url">Link URL *</Label>
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
            <Label htmlFor="category">Category *</Label>
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

          {formData.category !== 'Calendar' && !formData.is_download_all && (
            <FormGroup>
              <Label htmlFor="date">
                Meeting Date * (date the meeting occurred)
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
                pattern="\d{4}-\d{2}-\d{2}"
                placeholder="YYYY-MM-DD"
              />
            </FormGroup>
          )}

          <ModalFooter>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {document ? 'Update' : 'Add'} Document
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </Overlay>
  );
}
