import {
    calculateTotalMinutes,
    countWorkouts,
    validateDuration,
    validateWorkoutName,
} from './workoutUtils';

describe('workoutUtils', () => {
  test('calculateTotalMinutes returns total duration', () => {
    const workouts = [
      {
        id: '1',
        name: 'Push Day',
        duration: 45,
        date: '2025-06-18',
      },
      {
        id: '2',
        name: 'Leg Day',
        duration: 60,
        date: '2025-06-18',
      },
    ];

    expect(calculateTotalMinutes(workouts)).toBe(105);
  });

  test('calculateTotalMinutes returns 0 for empty array', () => {
    expect(calculateTotalMinutes([])).toBe(0);
  });

  test('validateWorkoutName accepts valid names', () => {
    expect(validateWorkoutName('Push Day')).toBe(true);
  });

  test('validateWorkoutName rejects empty string', () => {
    expect(validateWorkoutName('')).toBe(false);
  });

  test('validateWorkoutName rejects spaces only', () => {
    expect(validateWorkoutName('   ')).toBe(false);
  });

  test('validateDuration accepts positive numbers', () => {
    expect(validateDuration(45)).toBe(true);
  });

  test('validateDuration rejects zero', () => {
    expect(validateDuration(0)).toBe(false);
  });

  test('countWorkouts returns correct number', () => {
    const workouts = [
      {
        id: '1',
        name: 'Push Day',
        duration: 45,
        date: '2025-06-18',
      },
      {
        id: '2',
        name: 'Leg Day',
        duration: 60,
        date: '2025-06-18',
      },
    ];

    expect(countWorkouts(workouts)).toBe(2);
  });
});