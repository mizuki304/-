import fs from 'node:fs';
import path from 'node:path';
import { Booking, EmergencyContact, ItineraryDay } from './types';

const dataDir = path.join(process.cwd(), 'data');

function readJsonFile<T>(fileName: string): T | null {
  const filePath = path.join(dataDir, fileName);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`Failed to read ${filePath}:`, error);
    return null;
  }
}

export function loadItinerary(): ItineraryDay[] {
  const data = readJsonFile<ItineraryDay[]>('itinerary.json');
  if (!data) return [];
  return data
    .map((day) => ({
      ...day,
      entries: day.entries?.map((entry) => ({ ...entry, links: entry.links ?? [] })) ?? [],
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function loadBookings(): Booking[] {
  const data = readJsonFile<Booking[]>('bookings.json');
  if (!data) return [];
  return data;
}

export function loadEmergencyContacts(): EmergencyContact[] {
  const data = readJsonFile<EmergencyContact[]>('emergency.json');
  if (!data) return [];
  return data;
}
