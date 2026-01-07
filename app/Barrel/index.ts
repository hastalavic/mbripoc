// app/Barrel/index.ts

import PSPForm from "@/app/(pages)/PSP/components/PSPAdvancedForm.component";
import ProfileSettingsForm from "@/app/(pages)/PSP/components/PSPBasicForm.component";
import PSPSummaryAndDebug from "@/app/(pages)/PSP/components/PSPDisplayBlock.component";
import ButtonSavePSP from "@/app/(pages)/PSP/components/ButtonSavePSP.component";
import MBRIDebugPanel from "@/app/components/Debug/MBRIDebugPanel";

import usePSPForm from "@/app/(pages)/PSP/hooks/usePSPForm.hook";
import usePSPLocalStorage from "@/app/(pages)/PSP/hooks/usePSPLocalStorage.hook";

import { computeBMI } from "@/app/_engine/computes/personalize/BMI.compute";
import { defaultProfile, ProfileFormState } from "@/app/(pages)/PSP/utils/PSPForm.types";

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