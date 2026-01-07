// app/Barrel/index.ts

import PSPForm from "@/app/(Pages)/PSP/components/PSPAdvancedForm.component";
import ProfileSettingsForm from "@/app/(Pages)/PSP/components/PSPBasicForm.component";
import PSPSummaryAndDebug from "@/app/(Pages)/PSP/components/PSPDisplayBlock.component";
import ButtonSavePSP from "@/app/(Pages)/PSP/components/ButtonSavePSP.component";
import MBRIDebugPanel from "@/app/design/widgets/Debug/MBRIDebugPanel";

import usePSPForm from "@/app/(Pages)/PSP/hooks/usePSPForm.hook";
import usePSPLocalStorage from "@/app/(Pages)/PSP/hooks/usePSPLocalStorage.hook";

import { computeBMI } from "@/app/_engine/computes/personalize/BMI.compute";
import { defaultProfile, ProfileFormState } from "@/app/(Pages)/PSP/utils/PSPForm.types";

import PageTitleBlock from "@/app/design/layout/PageTitleBlock";
import DateTimePicker from "@/app/design/ui/DateTimePicker/DateTimePicker";
import Spacing from "@/app/design/ui/Spacing.component";

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