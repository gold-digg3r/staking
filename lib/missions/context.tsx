"use client"

import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { Mission, DeployedNFT, MissionResult, MissionState, MissionHistoryEntry } from "./types"
import { missions, missionHistory, leaderboard } from "@/data/missions"
import { calculateMissionResult } from "./calculations"

// Initial state
const initialState: MissionState = {
  availableMissions: missions,
  activeMissions: [],
  completedMissions: missionHistory,
  leaderboard: leaderboard,
  selectedMission: null,
  selectedTeam: [],
  missionResult: null,
  isLoading: false,
  error: null,
}

// Action types
type MissionAction =
  | { type: "SELECT_MISSION"; payload: Mission }
  | { type: "SELECT_TEAM"; payload: DeployedNFT[] }
  | { type: "START_MISSION"; payload: { mission: Mission; team: DeployedNFT[] } }
  | { type: "COMPLETE_MISSION"; payload: { missionId: string; result: MissionResult } }
  | { type: "FAIL_MISSION"; payload: { missionId: string; result: MissionResult } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "CLEAR_SELECTION" }
  | { type: "CLEAR_RESULT" }

// Reducer
function missionReducer(state: MissionState, action: MissionAction): MissionState {
  switch (action.type) {
    case "SELECT_MISSION":
      return {
        ...state,
        selectedMission: action.payload,
        missionResult: null,
      }
    case "SELECT_TEAM":
      return {
        ...state,
        selectedTeam: action.payload,
        missionResult: null,
      }
    case "START_MISSION":
      const { mission, team } = action.payload
      const updatedMission = {
        ...mission,
        status: "in_progress" as const,
      }
      return {
        ...state,
        availableMissions: state.availableMissions.filter((m) => m.id !== mission.id),
        activeMissions: [...state.activeMissions, updatedMission],
        selectedMission: null,
        selectedTeam: [],
        isLoading: true,
      }
    case "COMPLETE_MISSION":
      const { missionId, result } = action.payload
      const completedMission = state.activeMissions.find((m) => m.id === missionId)

      if (!completedMission) {
        return state
      }

      const historyEntry: MissionHistoryEntry = {
        id: `history-${Date.now()}`,
        missionId: completedMission.id,
        missionName: completedMission.name,
        difficulty: completedMission.difficulty,
        timestamp: new Date().toISOString(),
        team: state.selectedTeam,
        result,
      }

      return {
        ...state,
        activeMissions: state.activeMissions.filter((m) => m.id !== missionId),
        completedMissions: [historyEntry, ...state.completedMissions],
        missionResult: result,
        isLoading: false,
      }
    case "FAIL_MISSION":
      const { missionId: failedId, result: failResult } = action.payload
      const failedMission = state.activeMissions.find((m) => m.id === failedId)

      if (!failedMission) {
        return state
      }

      const failHistoryEntry: MissionHistoryEntry = {
        id: `history-${Date.now()}`,
        missionId: failedMission.id,
        missionName: failedMission.name,
        difficulty: failedMission.difficulty,
        timestamp: new Date().toISOString(),
        team: state.selectedTeam,
        result: failResult,
      }

      const updatedFailedMission = {
        ...failedMission,
        status: "cooldown" as const,
        cooldownEnds: failResult.cooldownEnds,
      }

      return {
        ...state,
        activeMissions: state.activeMissions.map((m) => (m.id === failedId ? updatedFailedMission : m)),
        completedMissions: [failHistoryEntry, ...state.completedMissions],
        missionResult: failResult,
        isLoading: false,
      }
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      }
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    case "CLEAR_SELECTION":
      return {
        ...state,
        selectedMission: null,
        selectedTeam: [],
      }
    case "CLEAR_RESULT":
      return {
        ...state,
        missionResult: null,
      }
    default:
      return state
  }
}

// Context
interface MissionContextType {
  state: MissionState
  selectMission: (mission: Mission) => void
  selectTeam: (team: DeployedNFT[]) => void
  startMission: (mission: Mission, team: DeployedNFT[]) => void
  clearSelection: () => void
  clearResult: () => void
}

const MissionContext = createContext<MissionContextType | undefined>(undefined)

// Provider
interface MissionProviderProps {
  children: ReactNode
}

export function MissionProvider({ children }: MissionProviderProps) {
  const [state, dispatch] = useReducer(missionReducer, initialState)

  const selectMission = (mission: Mission) => {
    dispatch({ type: "SELECT_MISSION", payload: mission })
  }

  const selectTeam = (team: DeployedNFT[]) => {
    dispatch({ type: "SELECT_TEAM", payload: team })
  }

  const startMission = async (mission: Mission, team: DeployedNFT[]) => {
    try {
      dispatch({ type: "START_MISSION", payload: { mission, team } })

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Calculate mission result
      const result = calculateMissionResult(mission, team)

      if (result.success) {
        dispatch({ type: "COMPLETE_MISSION", payload: { missionId: mission.id, result } })
      } else {
        dispatch({ type: "FAIL_MISSION", payload: { missionId: mission.id, result } })
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to start mission" })
    }
  }

  const clearSelection = () => {
    dispatch({ type: "CLEAR_SELECTION" })
  }

  const clearResult = () => {
    dispatch({ type: "CLEAR_RESULT" })
  }

  return (
    <MissionContext.Provider
      value={{
        state,
        selectMission,
        selectTeam,
        startMission,
        clearSelection,
        clearResult,
      }}
    >
      {children}
    </MissionContext.Provider>
  )
}

// Hook
export function useMission() {
  const context = useContext(MissionContext)

  if (context === undefined) {
    throw new Error("useMission must be used within a MissionProvider")
  }

  return context
}
