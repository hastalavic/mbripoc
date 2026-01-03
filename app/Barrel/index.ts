// app/Barrel/index.ts

import PSPForm from "@/app/(FeaturePages)/PSP/components/PSPAdvancedForm.component";
import ProfileSettingsForm from "@/app/(FeaturePages)/PSP/components/PSPBasicForm.component";
import PSPSummaryAndDebug from "@/app/(FeaturePages)/PSP/components/PSPDisplayBlock.component";
import ButtonSavePSP from "@/app/(FeaturePages)/PSP/components/ButtonSavePSP.component";
import MBRIDebugPanel from "@/app/components/Debug/MBRIDebugPanel";

import usePSPForm from "@/app/(FeaturePages)/PSP/hooks/usePSPForm.hook";
import usePSPLocalStorage from "@/app/(FeaturePages)/PSP/hooks/usePSPLocalStorage.hook";

import { computeBMI } from "@/app/(FeaturePages)/PSP/utils/computeBMI";
import { defaultProfile, ProfileFormState } from "@/app/(FeaturePages)/PSP/utils/PSPForm.types";

import PageTitleBlock from "@/app/components/layout/PageTitleBlock";
import DateTimePicker from "@/app/components/ui/DateTimePicker/DateTimePicker";
import Spacing from "@/app/components/ui/Spacing.component";

import { LogPhysioDynamic, resetPhysioLog } from "@/app/_repository/PSPRecorder.db";

const MBRI = {
  PSPForm,
  ProfileSettingsForm,
  PSPSummaryAndDebug,
  ButtonSavePSP,
  MBRIDebugPanel,

  usePSPForm,
  usePSPLocalStorage,

  computeBMI,

  PageTitleBlock,
  DateTimePicker,
  Spacing,
  LogPhysioDynamic,
  resetPhysioLog,
};

// ⬅⬅⬅ 必須 export 這三個！
export default MBRI;

// 型別與資料要分開 export
export type { ProfileFormState };
export { defaultProfile };