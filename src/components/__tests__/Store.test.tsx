import { describe, it, expect } from 'vitest';
import { store } from '../../store/store';
import { countriesReducer } from '../../store/countriesSlice';
import { clearProfiles, setProfile } from '../../store/profileSlice';
import { clearPhotos, setPhoto } from '../../store/photoSlice';
import type { Profile } from '../../types&interfaces/Profile';
import photoReducer from '../../store/photoSlice';
import profileReducer from '../../store/profileSlice';

describe('Redux store integration', () => {
  it('should update photo state after dispatch', () => {
    store.dispatch(setPhoto('testImg'));
    const state = store.getState().photo;
    expect(state.base64).toContain('testImg');
  });

  it('should update profiles state after dispatch', () => {
    store.dispatch(
      setProfile({
        name: 'Bob',
        age: '30',
        email: 'bob@test.com',
        country: 'France',
        gender: 'male',
        photo: 'base64img',
        password: 'StrongPass1!',
        confirmPassword: 'StrongPass1!',
        terms: true,
      })
    );

    const state = store.getState().profiles;
    expect(state.list).toHaveLength(1);
    expect(state.list[0].name).toBe('Bob');
  });
});

describe('countriesSlice', () => {
  it('should return the initial state', () => {
    const state = countriesReducer(undefined, { type: '' });
    expect(state).toContain('Germany');
    expect(Array.isArray(state)).toBe(true);
    expect(state.length).toBeGreaterThan(0);
  });
});

describe('profileSlice', () => {
  const mockProfile: Profile = {
    name: 'Alice',
    age: '25',
    email: 'alice@test.com',
    country: 'Germany',
    gender: 'female',
    photo: 'base64img',
    password: 'Password123!',
    confirmPassword: 'Password123!',
    terms: true,
  };

  it('should return the initial state', () => {
    expect(profileReducer(undefined, { type: '' })).toEqual({ list: [] });
  });

  it('should handle setProfile', () => {
    const state = profileReducer({ list: [] }, setProfile(mockProfile));
    expect(state.list).toHaveLength(1);
    expect(state.list[0]).toEqual(mockProfile);
  });

  it('should handle clearProfiles', () => {
    const state = profileReducer({ list: [mockProfile] }, clearProfiles());
    expect(state.list).toEqual([]);
  });
});

describe('photoSlice', () => {
  it('should return the initial state', () => {
    expect(photoReducer(undefined, { type: '' })).toEqual({ base64: [] });
  });

  it('should handle setPhoto', () => {
    const state = photoReducer({ base64: [] }, setPhoto('abc123'));
    expect(state.base64).toContain('abc123');
  });

  it('should handle clearPhotos', () => {
    const state = photoReducer({ base64: ['img1', 'img2'] }, clearPhotos());
    expect(state.base64).toEqual([]);
  });
});
