import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';

import { Workout } from '../types/workout';

type WorkoutContextType = {
  workouts: Workout[];
  loading: boolean;
  addWorkout: (workout: Workout) => void;
  deleteWorkout: (id: string) => void;
};

const WorkoutContext = createContext<
  WorkoutContextType | undefined
>(undefined);

const STORAGE_KEY = 'workouts';

export function WorkoutProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkouts();
  }, []);

  useEffect(() => {
    if (!loading) {
      saveWorkouts();
    }
  }, [workouts]);

  const loadWorkouts = async () => {
    try {
      const storedWorkouts =
        await AsyncStorage.getItem(STORAGE_KEY);

      if (storedWorkouts) {
        setWorkouts(JSON.parse(storedWorkouts));
      }
    } catch (error) {
      console.error(
        'Failed to load workouts:',
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const saveWorkouts = async () => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(workouts)
      );
    } catch (error) {
      console.error(
        'Failed to save workouts:',
        error
      );
    }
  };

  const addWorkout = (workout: Workout) => {
    setWorkouts((current) => [
      workout,
      ...current,
    ]);
  };

  const deleteWorkout = (id: string) => {
    setWorkouts((current) =>
      current.filter(
        (workout) => workout.id !== id
      )
    );
  };

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        loading,
        addWorkout,
        deleteWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkouts() {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      'useWorkouts must be used inside WorkoutProvider'
    );
  }

  return context;
}