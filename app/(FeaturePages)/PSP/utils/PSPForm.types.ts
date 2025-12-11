export type Sex = "" | "male" | "female" | "other";

export interface ProfileFormState {
  nickname: string;
  age: number | "";
  sex: Sex;
  heightCm: number | "";
  weightKg: number | "";
  tdee: number | "";
  stressLevel: 1 | 2 | 3 | 4 | 5 | "";
  reproductiveStatus: "" | "none" | "pregnant_1" | "pregnant_2" | "pregnant_3" | "lactating";
  bodyFatPercentage: number | "";
  activityScore: 1 | 2 | 3 | 4 | 5 | "";
  sleepQuality: 1 | 2 | 3 | 4 | 5 | "";
  kidneyScore: 1 | 2 | 3 | 4 | 5 | "";
  liverScore: 1 | 2 | 3 | 4 | 5 | "";
}

export const defaultProfile: ProfileFormState = {
  nickname: "",
  age: "",
  sex: "",
  heightCm: "",
  weightKg: "",
  tdee: "",
  stressLevel: "",
  reproductiveStatus: "",
  bodyFatPercentage: "",
  activityScore: "",
  sleepQuality: "",
  kidneyScore: "",
  liverScore: "",
};

// localStorage key
export const PSP_STORAGE_KEY = "psp_profile_v1";