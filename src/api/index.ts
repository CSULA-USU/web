import { StatusType } from 'atoms';
import { Dispatch, SetStateAction } from 'react';
import { SetterOrUpdater } from 'recoil';

export * from './supabase';

export const fetchEvents = async (
  setEventsStatus: SetterOrUpdater<StatusType>,
) => {
  const events = await fetch(
    'https://api.presence.io/calstatela/v1/events',
  ).then((res) => {
    if (!res.ok) {
      setEventsStatus('failed');
      return [];
    } else {
      setEventsStatus('success');
      return res.json();
    }
  });
  return events;
};

export const fetchInstagramFeed = async (
  setInstagramResponseStatus: Dispatch<SetStateAction<StatusType>>,
  org: string,
) => {
  const data = await fetch(`/api/instagram?org=${org}`).then((res) => {
    if (!res.ok) {
      setInstagramResponseStatus('failed');
      return null;
    } else {
      setInstagramResponseStatus('success');
      return res.json();
    }
  });
  return await data;
};

export const fetchRequests = async () => {
  try {
    const data = await fetch('/api/notion');
    const requestFeed = await data.json();
    return requestFeed;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const fetchJotform = async (id: any) => {
  try {
    const data = await fetch(`/api/jotform?id=${id}`);
    const dataFeed = await data.json();
    return dataFeed;
  } catch (error) {
    console.error('Error fetching jotform data:', error);
  }
};

export const postJotform = async (formData: any) => {
  try {
    const res = await fetch('/api/jotformContact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to submit form');
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Error submitting to Jotform:', error);
    throw error;
  }
};
