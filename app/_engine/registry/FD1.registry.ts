// app/_engine/registry/FD1.registry.ts

/* ==================================================
 * FD1 – Various State Definition (Read Model)
 * ================================================== */

export interface RegistryState_Food {

  /** 食物營養元素 (已對齊 ElementKey) */
  nutrients?: FoodNutrientState;

  /** 代謝負擔因子 (已對齊 MBFKey) */
  mbf?: MBFState;

  /** 狀態時間戳 */
  timestamp?: number;
}

/* ==================================================
 * Macronutrients (基礎巨量營養素)
 * ================================================== */
export interface Macronutrients {
  /** 熱量 (Kcal) */
  NU_KCAL?: number;
  /** 碳水化合物 (g) */
  NU_CARB?: number;
  /** 總脂肪 (g) */
  NU_FAT?: number;
  /** 蛋白質 (g) */
  NU_PRO?: number;
  /** 膳食纖維 (g) */
  NU_FBR?: number;
  /** 水分 (g) */
  NU_WATER?: number;
  /** 糖分 (g)：高果糖攝取會直接升高尿酸。 */
  NU_SUGAR?: number; 
}

/* ==================================================
 * FattyAcids (脂肪酸家族 - 發炎控制核心)
 * ================================================== */
export interface FattyAcids {
  // --- 核心分類 ---
  /** 飽和脂肪酸 (Saturated FA) */
  FA_SAT?: number;
  /** 單元不飽和脂肪酸 (MUFA) */
  FA_MUFA?: number;
  /** 多元不飽和脂肪酸 (PUFA) */
  FA_PUFA?: number;
  /** 反式脂肪酸 (Trans FA) */
  FA_TFA?: number;
  /** 膽固醇 (Cholesterol) */
  FA_CHO?: number;

  // --- Omega-3 (抗發炎家族) ---
  /** Omega-3 總量：體內抗發炎能力的核心。 */
  FA_OM3?: number;
  /** ALA (α-亞麻酸)：植物來源 Omega-3。 */
  FA_ALA?: number;
  /** EPA：直接緩解發炎反應。 */
  FA_EPA?: number;
  /** DHA：保護神經與視網膜。 */
  FA_DHA?: number;

  // --- Omega-6 (發炎平衡/促發炎) ---
  /** Omega-6 總量：需與 Omega-3 保持比例平衡。 */
  FA_OM6?: number;
  /** LA (亞麻油酸) */
  FA_LA?: number;
  /** GLA (γ-次亞麻油酸)：抗發炎性質的 Omega-6。 */
  FA_GLA?: number;
  /** DGLA：抗發炎前驅物。 */
  FA_DGLA?: number;
  /** AA (花生四烯酸)：促發炎的主要來源，關節紅腫熱痛的推手。 */
  FA_AA?: number;

  // --- Omega-9 ---
  /** Omega-9 總量 (主要來自橄欖油) */
  FA_OM9?: number;
}

/* ==================================================
 * Vitamins (維生素)
 * ================================================== */
export interface Vitamins {
  /* --- Vitamins (A-K) --- */
  /** 維生素 A */
  VIT_A?: number;
  /** 維生素 B1 (硫胺素) */
  VIT_B1?: number;
  /** 維生素 B2 (核黃素) */
  VIT_B2?: number;
  /** 維生素 B3 (菸鹼酸)：注意過量可能干擾尿酸排泄。 */
  VIT_B3?: number;
  /** 維生素 B5 (泛酸) */
  VIT_B5?: number;
  /** 維生素 B6 (吡哆醇) */
  VIT_B6?: number;
  /** 維生素 B7 (生物素) */
  VIT_B7?: number;
  /** 維生素 B9 (葉酸)：協助代謝同半胱胺酸。 */
  VIT_B9?: number;
  /** 維生素 B12 (鈷胺素) */
  VIT_B12?: number;
  /** 維生素 C：強效抗氧化，協助尿酸排泄。 */
  VIT_C?: number;
  /** 維生素 D：調節免疫力。 */
  VIT_D?: number;
  /** 維生素 E：保護細胞膜。 */
  VIT_E?: number;
  /** 維生素 K(總量)：凝血與骨骼代謝。 */
  VIT_K?: number;
  /** 維生素 K1：凝血與骨骼代謝。 */
  VIT_K1?: number;
  /** 維生素 K2：凝血與骨骼代謝。 */
  VIT_K2?: number;
  /** 卵磷脂與膽鹼：維持脂肪代謝。 */
  VIT_LK_CHOL?: number;
}

/* ==================================================
 * Minerals (礦物質)
 * ================================================== */
export interface Minerals {
  /* --- Macrominerals (巨量礦物質) --- */
  /** 鈉 (Sodium)：過量會抑制尿酸排泄並增加腎負擔。 */
  MIN_NA?: number;
  /** 鉀 (Potassium)：鹼化尿液，中和鈉離子，促進尿酸排除。 */
  MIN_K?: number;
  /** 鈣 (Calcium) */
  MIN_CA?: number;
  /** 鎂 (Magnesium)：調節肌肉收縮與代謝能量。 */
  MIN_MG?: number;
  /** 磷 (Phosphorus) */
  MIN_P?: number;
  /** 氯 (Chloride) */
  MIN_CL?: number;
  /** 硫 (Sulfur) */
  MIN_S?: number;

  /* --- Trace Minerals (微量礦物質) --- */
  /** 鐵 (Iron) */
  MIN_FE?: number;
  /** 鋅 (Zinc) */
  MIN_ZN?: number;
  /** 硒 (Selenium)：抗氧化酵素 GPx 的核心。 */
  MIN_SE?: number;
  /** 銅 (Copper) */
  MIN_CU?: number;
  /** 錳 (Manganese) */
  MIN_MN?: number;
  /** 碘 (Iodine) */
  MIN_I?: number;
  /** 氟 (Fluoride) */
  MIN_F?: number;
  /** 鉻 (Chromium)：協助胰島素穩定血糖。 */
  MIN_CR?: number;
  /** 鉬 (Molybdenum)：普林代謝酵素 (XO) 的輔因子。 */
  MIN_MO?: number;
  /** 鈷 (Cobalt) */
  MIN_CO?: number;
}


/* ==================================================
 * Amino Acids (Proteinogenic + Functional)
 * ==================================================
 * 說明：
 * - Proteinogenic Amino Acids：20 種標準蛋白質胺基酸
 * - Functional / Derivatives：功能性衍生物（如 NAC）
 */

/* =========================
 * Essential Amino Acids (9)
 * ========================= */
export interface EssentialAminoAcids {
  /** 異白胺酸 Isoleucine */
  AA_ILE?: number;
  /** 白胺酸 Leucine */
  AA_LEU?: number;
  /** 纈胺酸 Valine */
  AA_VAL?: number;
  /** 離胺酸 Lysine */
  AA_LYS?: number;
  /** 甲硫胺酸 Methionine */
  AA_MET?: number;
  /** 苯丙胺酸 Phenylalanine */
  AA_PHE?: number;
  /** 蘇胺酸 Threonine */
  AA_THR?: number;
  /** 色胺酸 Tryptophan */
  AA_TRP?: number;
  /** 組胺酸 Histidine */
  AA_HIS?: number;
}

/* =========================
 * Non-Essential Amino Acids (11)
 * ========================= */
export interface NonEssentialAminoAcids {
  /** 丙胺酸 Alanine */
  AA_ALA?: number;
  /** 天門冬胺酸 Aspartic Acid */
  AA_ASP?: number;
  /** 天門冬醯胺 Asparagine */
  AA_ASN?: number;
  /** 麩胺酸 Glutamic Acid */
  AA_GLU?: number;
  /** 麩醯胺 Glutamine */
  AA_GLN?: number;
  /** 甘胺酸 Glycine */
  AA_GLY?: number;
  /** 脯胺酸 Proline */
  AA_PRO?: number;
  /** 絲胺酸 Serine */
  AA_SER?: number;
  /** 酪胺酸 Tyrosine（條件必需） */
  AA_TYR?: number;
  /** 半胱胺酸 Cysteine（條件必需） */
  AA_CYS?: number;
  /** 精胺酸 Arginine（條件必需） */
  AA_ARG?: number;
}

/* =========================
 * Functional / Derivative Amino Acids
 * ========================= */
export interface FunctionalAminoAcids {
  /** 乙醯半胱氨酸（N-Acetyl-Cysteine） */
  AA_D_NAC?: number;
  /** 牛磺酸 Taurine（非蛋白質胺基酸，但高度代謝相關） */
  AA_TAU?: number;
  /** 肌酸 Creatine（能量代謝核心） */
  AA_CREA?: number;
}

/* ==================================================
 * AminoAcids (總接口)
 * ================================================== */
export interface AminoAcids
  extends EssentialAminoAcids,
    NonEssentialAminoAcids,
    FunctionalAminoAcids {}


/* ==================================================
 * Bioactives (生物活性成分)
 * ================================================== */
export interface Bioactives {
  /** 茶多酚：強效抗氧化，促進尿酸排泄。 */
  PHY_TP?: number;
  /** 總花青素：食物整體的天然抗氧化背景。 */
  PHY_ANT_TOTAL?: number;
  /** 矢車菊素 (Cyanidin)：抑制 XO 酵素、攔截尿酸生成的特種兵力。 */
  PHY_CYANIDIN?: number;
  /** 薑黃素：緩解發炎引起的紅腫與疼痛。 */
  PHY_CUR?: number;
}

/* ==================================================
 * 總結接口：FoodNutrientState (組合型別)
 * ================================================== */
export interface FoodNutrientState extends 
  Macronutrients, 
  FattyAcids, 
  Vitamins, 
  Minerals,
  AminoAcids,
  Bioactives {}

/* ==================================================
 * MBF State (代謝負擔因子 - 促發炎與氧化壓力源)
 * ================================================== */
export interface MBFState {
  /** 氧化油脂 (Oxidized Lipids)：源自高溫油炸，引發血管發炎。 */
  MBF_OXL?: number;

  /** 糖基化終產物 (AGEs)：源自高溫乾熱烹飪，加劇組織老化。 */
  MBF_AGEs?: number;

  /** 丙烯醯胺 (Acrylamide)：澱粉高溫後的產物。 */
  MBF_ACR?: number;

  /** 多環芳香烴 (PAHs)：燒烤煙燻產生的致癌物。 */
  MBF_PAHs?: number;

  /** 呋喃 (Furan)：加工罐頭或高溫食品產生的毒素。 */
  MBF_FUR?: number;

  /** 普林 (Purines)：尿酸生成的原料。 */
  MBF_PUR?: number;

  /** * 果糖 (Fructose Surge)：源自含糖飲料、加工甜點、白砂糖。 */
  MBF_FRU?: number;

  /** * 反式脂肪 (Trans Fats)：源自氫化植物油、人造奶油、精煉加工食品。 */
  MBF_TFA?: number;
}

/* ==================================================
 * Empty State
 * ================================================== */
export const EMPTY_MBRI_REGISTRY_STATE: RegistryState_Food = {};