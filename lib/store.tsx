// filepath: c:\Users\olaro\femiweb-apps\eventpass-saas\lib\store.tsx
"use client"

import { createContext, useContext, useReducer, ReactNode } from 'react'

// Types
interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  price: number
  capacity: number
  attendees: number
  revenue: number
  checkinRate: number
  rating: number
  status: "live" | "upcoming" | "completed"
  createdAt: string
  updatedAt: string
}

interface User {
  id: string
  name: string
  email: string
  role: 'organizer' | 'admin'
  avatar?: string
}

interface AppState {
  user: User | null
  events: Event[]
  currentEvent: Event | null
  isLoading: boolean
  checkedInAttendees: Array<{
    id: string
    name: string
    passCode: string
    checkedInAt: string
    eventId: string
  }>
}

// Initial State
const initialState: AppState = {
  user: {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'organizer',
    avatar: '/avatar.jpg'
  },
  events: [
    {
      id: '1',
      title: 'Tech Conference 2024',
      description: 'Annual technology conference',
      date: '2024-07-15',
      time: '14:00',
      location: 'Convention Center',
      price: 99,
      capacity: 500,
      attendees: 127,
      revenue: 2540,
      checkinRate: 65,
      rating: 4.8,
      status: 'upcoming',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '2',
      title: 'Business Summit',
      description: 'Leadership and innovation summit',
      date: '2024-07-20',
      time: '09:00',
      location: 'Business Center',
      price: 149,
      capacity: 300,
      attendees: 89,
      revenue: 1850,
      checkinRate: 78,
      rating: 4.5,
      status: 'live',
      createdAt: '2024-01-02',
      updatedAt: '2024-01-02'
    }
  ],
  currentEvent: null,
  isLoading: false,
  checkedInAttendees: []
}

// Actions
type AppAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_EVENT'; payload: Event }
  | { type: 'UPDATE_EVENT'; payload: { id: string; updates: Partial<Event> } }
  | { type: 'DELETE_EVENT'; payload: string }
  | { type: 'SET_CURRENT_EVENT'; payload: Event | null }
  | { type: 'CHECK_IN_ATTENDEE'; payload: { id: string; name: string; passCode: string; eventId: string } }

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    
    case 'SET_USER':
      return { ...state, user: action.payload }
    
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] }
    
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id
            ? { ...event, ...action.payload.updates }
            : event
        )
      }
    
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload)
      }
    
    case 'SET_CURRENT_EVENT':
      return { ...state, currentEvent: action.payload }
    
    case 'CHECK_IN_ATTENDEE':
      const newAttendee = {
        ...action.payload,
        checkedInAt: new Date().toISOString()
      }
      return {
        ...state,
        checkedInAttendees: [...state.checkedInAttendees, newAttendee]
      }
    
    default:
      return state
  }
}

// Context
const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// Hook
export function useAppState() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppState must be used within AppProvider')
  }
  return context
}

// Helper functions
export const appActions = {
  setLoading: (loading: boolean): AppAction => ({ type: 'SET_LOADING', payload: loading }),
  setUser: (user: User | null): AppAction => ({ type: 'SET_USER', payload: user }),
  addEvent: (event: Event): AppAction => ({ type: 'ADD_EVENT', payload: event }),
  updateEvent: (id: string, updates: Partial<Event>): AppAction => ({ type: 'UPDATE_EVENT', payload: { id, updates } }),
  deleteEvent: (id: string): AppAction => ({ type: 'DELETE_EVENT', payload: id }),
  setCurrentEvent: (event: Event | null): AppAction => ({ type: 'SET_CURRENT_EVENT', payload: event }),
  checkInAttendee: (attendee: { id: string; name: string; passCode: string; eventId: string }): AppAction => ({ type: 'CHECK_IN_ATTENDEE', payload: attendee })
}