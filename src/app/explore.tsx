import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useWorkouts } from '../context/WorkoutContext';
import {
  calculateTotalMinutes,
  countWorkouts,
  formatWorkoutDate,
} from '../utils/workoutUtils';

export default function ExploreScreen() {
  const { workouts } = useWorkouts();

  const totalWorkouts = countWorkouts(workouts);
  const totalMinutes = calculateTotalMinutes(workouts);

  const averageDuration =
    workouts.length > 0
      ? Math.round(totalMinutes / workouts.length)
      : 0;

  const lastWorkout =
    workouts.length > 0
      ? workouts[workouts.length - 1]
      : null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          📊 Workout Statistics
        </Text>

        <Text style={styles.subtitle}>
          Monitor your progress and consistency.
        </Text>

        <View style={styles.grid}>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              📈 Workouts
            </Text>

            <Text style={styles.value}>
              {totalWorkouts}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              ⏱ Minutes
            </Text>

            <Text style={styles.value}>
              {totalMinutes}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              ⚡ Average
            </Text>

            <Text style={styles.value}>
              {averageDuration}
            </Text>

            <Text style={styles.unit}>
              min
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              🗓 Last Workout
            </Text>

            <Text style={styles.smallValue}>
              {lastWorkout
                ? formatWorkoutDate(lastWorkout.date)
                : 'None'}
            </Text>
          </View>

        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>
            💪 Progress Summary
          </Text>

          <Text style={styles.summaryText}>
            {totalWorkouts === 0
              ? 'Start tracking workouts today and build your fitness journey.'
              : `You've completed ${totalWorkouts} workouts for a total of ${totalMinutes} minutes, averaging ${averageDuration} minutes per session.`}
          </Text>
        </View>

        <View style={styles.goalCard}>
          <Text style={styles.goalTitle}>
            🚀 Stay Consistent
          </Text>

          <Text style={styles.goalText}>
            Small daily improvements lead to long-term results.
          </Text>
        </View>

        <Text style={styles.footer}>
          Built with React Native + Expo
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },

  content: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    padding: 20,
  },

  title: {
    color: '#00A6FF',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
  },

  subtitle: {
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
    fontSize: 16,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    backgroundColor: '#1f1f1f',
    width: '48%',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#00A6FF',
  },

  cardTitle: {
    color: '#bbb',
    fontSize: 17,
    marginBottom: 15,
  },

  value: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },

  unit: {
    color: '#888',
    marginTop: 5,
  },

  smallValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  summaryCard: {
    backgroundColor: '#00A6FF',
    padding: 25,
    borderRadius: 20,
    marginTop: 10,
  },

  summaryTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  summaryText: {
    color: 'white',
    fontSize: 17,
    lineHeight: 28,
  },

  goalCard: {
    backgroundColor: '#1f1f1f',
    borderRadius: 20,
    padding: 25,
    marginTop: 20,
  },

  goalTitle: {
    color: '#00A6FF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  goalText: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 26,
  },

  footer: {
    color: '#666',
    textAlign: 'center',
    marginTop: 35,
    marginBottom: 30,
  },
});