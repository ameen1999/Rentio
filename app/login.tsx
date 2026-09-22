// Powered by OnSpace.AI
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/hooks/useApp';
import { useAlert } from '@/template';
import { Button } from '@/components/ui/Button';
import { Colors, Font, Radius, Spacing } from '@/constants/theme';

export default function Login() {
  const { login } = useApp();
  const { showAlert } = useAlert();
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!email.includes('@') || password.length < 4) {
      showAlert('Check your details', 'Enter a valid email and a password with at least 4 characters.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      login(email, mode === 'signup' ? name : undefined);
      setLoading(false);
    }, 700);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + Spacing.xl }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoWrap}>
          <Image source={require('@/assets/images/logo.png')} style={styles.logo} contentFit="contain" />
        </View>
        <Text style={styles.brand}>Rentio</Text>
        <Text style={styles.subtitle}>
          {mode === 'login' ? 'Welcome back. Sign in to continue.' : 'Create an account to start renting.'}
        </Text>

        <View style={styles.mockBadge}>
          <MaterialCommunityIcons name="information-outline" size={14} color={Colors.warning} />
          <Text style={styles.mockText}>MOCK LOGIN · use test@example.com / 123456</Text>
        </View>

        <View style={styles.form}>
          {mode === 'signup' ? (
            <Field icon="account-outline" placeholder="Full name" value={name} onChangeText={setName} />
          ) : null}
          <Field icon="email-outline" placeholder="Email address" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <Field icon="lock-outline" placeholder="Password" value={password} onChangeText={setPassword} secure />
        </View>

        <Button
          label={mode === 'login' ? 'Sign In' : 'Create Account'}
          onPress={submit}
          loading={loading}
          style={{ marginTop: Spacing.md }}
        />

        <View style={styles.switchRow}>
          <Text style={styles.switchText}>
            {mode === 'login' ? "New to Rentio?" : 'Already have an account?'}
          </Text>
          <Pressable onPress={() => setMode(mode === 'login' ? 'signup' : 'login')} hitSlop={8}>
            <Text style={styles.switchLink}>{mode === 'login' ? 'Sign Up' : 'Sign In'}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({
  icon,
  placeholder,
  value,
  onChangeText,
  secure,
  keyboardType,
}: {
  icon: string;
  placeholder: string;
  value: string;
  onChangeText: (t: string) => void;
  secure?: boolean;
  keyboardType?: 'default' | 'email-address';
}) {
  return (
    <View style={styles.field}>
      <MaterialCommunityIcons name={icon as any} size={20} color={Colors.textSubtle} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.textSubtle}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
        keyboardType={keyboardType ?? 'default'}
        accessibilityLabel={placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl, alignItems: 'center' },
  logoWrap: { width: 84, height: 84, borderRadius: 22, overflow: 'hidden' },
  logo: { width: '100%', height: '100%' },
  brand: { fontSize: Font.size.xxl, fontWeight: Font.weight.bold, color: Colors.textPrimary, marginTop: Spacing.sm },
  subtitle: { fontSize: Font.size.sm, color: Colors.textSecondary, marginTop: 4, marginBottom: Spacing.md, textAlign: 'center' },
  mockBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#FFF6E6', paddingHorizontal: 12, paddingVertical: 8, borderRadius: Radius.md,
    marginBottom: Spacing.lg,
  },
  mockText: { fontSize: Font.size.xs, color: '#8A6410', fontWeight: Font.weight.semibold },
  form: { alignSelf: 'stretch', gap: Spacing.sm },
  field: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    height: 54, paddingHorizontal: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.border,
  },
  input: { flex: 1, fontSize: Font.size.md, color: Colors.textPrimary, includeFontPadding: false, padding: 0 },
  switchRow: { flexDirection: 'row', gap: 6, marginTop: Spacing.lg, alignItems: 'center' },
  switchText: { fontSize: Font.size.sm, color: Colors.textSecondary },
  switchLink: { fontSize: Font.size.sm, color: Colors.blue, fontWeight: Font.weight.bold },
});
