import { Workout } from '../types/workout';

export function calculateTotalMinutes(
  workouts: Workout[]
): number {
  return workouts.reduce(
    (total, workout) => total + workout.duration,
    0
  );
}

export function countWorkouts(
  workouts: Workout[]
): number {
  return workouts.length;
}

export function calculateAverageDuration(
  workouts: Workout[]
): number {
  if (workouts.length === 0) {
    return 0;
  }

  return Math.round(
    calculateTotalMinutes(workouts) /
      workouts.length
  );
}

export function validateWorkoutName(
  name: string
): boolean {
  return name.trim().length > 0;
}

export function validateDuration(
  duration: number
): boolean {
  return duration > 0;
}

export function formatWorkoutDate(
  date: string
): string {
  return new Date(date).toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }
  );
}

export function getLastWorkout(
  workouts: Workout[]
): Workout | null {
  if (workouts.length === 0) {
    return null;
  }

  return workouts[0];
}