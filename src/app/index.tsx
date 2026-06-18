import * as Notifications from 'expo-notifications';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useWorkouts } from '../context/WorkoutContext';

export default function HomeScreen() {
  const { workouts, addWorkout, deleteWorkout } = useWorkouts();

  const [workoutName, setWorkoutName] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');

  const handleAddWorkout = () => {
    if (!workoutName.trim()) {
      setError('Please enter a workout name');
      return;
    }

    if (!duration.trim()) {
      setError('Please enter a duration');
      return;
    }

    if (Number(duration) <= 0) {
      setError('Duration must be greater than 0');
      return;
    }

    addWorkout({
      id: Date.now().toString(),
      name: workoutName,
      duration: Number(duration),
      date: new Date().toISOString().split('T')[0],
    });

    setWorkoutName('');
    setDuration('');
    setError('');
  };

  const sendReminder = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '💪 Workout Reminder',
        body: "Don't forget today's workout!",
      },
      trigger: null,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Workout Tracker 💪</Text>

        <Text style={styles.description}>
          Track your fitness journey.
        </Text>

        <View style={styles.statsCard}>
          <Text style={styles.statsLabel}>
            📈 Total Workouts
          </Text>

          <Text style={styles.statsNumber}>
            {workouts.length}
          </Text>
        </View>

        {error !== '' && (
          <Text style={styles.error}>
            {error}
          </Text>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Workout Name"
            placeholderTextColor="#888"
            value={workoutName}
            onChangeText={setWorkoutName}
          />

          <TextInput
            style={styles.input}
            placeholder="Duration (minutes)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={duration}
            onChangeText={setDuration}
          />

          <Pressable
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.pressed,
            ]}
            onPress={handleAddWorkout}
          >
            <Text style={styles.buttonText}>
              Add Workout
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.reminderButton,
              pressed && styles.pressed,
            ]}
            onPress={sendReminder}
          >
            <Text style={styles.buttonText}>
              Send Reminder
            </Text>
          </Pressable>
        </View>

        {workouts.length === 0 && (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              No workouts yet 💪
            </Text>

            <Text style={styles.emptyText}>
              Start tracking today!
            </Text>
          </View>
        )}

        {workouts.map((workout) => (
          <View key={workout.id} style={styles.card}>
            <Text style={styles.workoutName}>
              🏋 {workout.name}
            </Text>

            <Text style={styles.info}>
              ⏱ {workout.duration} min
            </Text>

            <Text style={styles.info}>
              📅 {new Date(workout.date).toLocaleDateString(
                'en-US',
                {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }
              )}
            </Text>

            <Pressable
              style={({ pressed }) => [
                styles.deleteButton,
                pressed && styles.pressed,
              ]}
              onPress={() => deleteWorkout(workout.id)}
            >
              <Text style={styles.buttonText}>
                Delete Workout
              </Text>
            </Pressable>
          </View>
        ))}

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
    maxWidth: 800,
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

  description: {
    color: '#999',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 25,
  },

  statsCard: {
    backgroundColor: '#1f1f1f',
    padding: 20,
    borderRadius: 20,
    marginBottom: 25,
    borderLeftWidth: 5,
    borderLeftColor: '#00A6FF',
  },

  statsLabel: {
    color: '#ccc',
    fontSize: 18,
  },

  statsNumber: {
    color: 'white',
    fontSize: 38,
    fontWeight: 'bold',
    marginTop: 10,
  },

  error: {
    color: '#ff5c5c',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
  },

  inputContainer: {
    backgroundColor: '#1f1f1f',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },

  input: {
    backgroundColor: '#2b2b2b',
    color: 'white',
    padding: 16,
    borderRadius: 15,
    marginBottom: 15,
    fontSize: 16,
  },

  addButton: {
    backgroundColor: '#00A6FF',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
  },

  reminderButton: {
    backgroundColor: '#3A86FF',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
  },

  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },

  pressed: {
    opacity: 0.8,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#1f1f1f',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#00A6FF',
  },

  workoutName: {
    color: '#00A6FF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  info: {
    color: '#ddd',
    fontSize: 17,
    marginBottom: 8,
  },

  emptyCard: {
    backgroundColor: '#1f1f1f',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 25,
  },

  emptyTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },

  emptyText: {
    color: '#999',
    marginTop: 10,
    fontSize: 16,
  },

  footer: {
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
});