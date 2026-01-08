// app/_repository/Elements/AminoAcids.constants.ts

/* ==================================================
 * Amino Acids (Proteinogenic + Functional)
 * ==================================================
 * 規則：
 * - Key 與 FD1.registry 完全對齊（AA_xxx）
 * - Category 統一使用 "AminoAcids"
 * - DisplayName_en：常用顯示名
 * - FullName_en：正式化學 / 學術全名
 */

export const AA_ELEMENTS = {
  /* =========================
   * Essential Amino Acids (9)
   * ========================= */
  AA_ILE: {
    element: {
      DisplayName_zh: "異白胺酸",
      DisplayName_en: "Isoleucine",
      FullName_en: "Isoleucine",
      Standard_Unit: "mg",
      Category: "AminoAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 1300, DefaultHalfLife_hr: 3 },
  },

  AA_LEU: {
    element: {
      DisplayName_zh: "白胺酸",
      DisplayName_en: "Leucine",
      FullName_en: "Leucine",
      Standard_Unit: "mg",
      Category: "AminoAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 3000, DefaultHalfLife_hr: 2 },
  },

  AA_VAL: {
    element: {
      DisplayName_zh: "纈胺酸",
      DisplayName_en: "Valine",
      FullName_en: "Valine",
      Standard_Unit: "mg",
      Category: "AminoAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 2000, DefaultHalfLife_hr: 3 },
  },

  AA_LYS: {
    element: {
      DisplayName_zh: "離胺酸",
      DisplayName_en: "Lysine",
      FullName_en: "Lysine",
      Standard_Unit: "mg",
      Category: "AminoAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 2500, DefaultHalfLife_hr: 4 },
  },

  AA_MET: {
    element: {
      DisplayName_zh: "甲硫胺酸",
      DisplayName_en: "Methionine",
      FullName_en: "Methionine",
      Standard_Unit: "mg",
      Category: "AminoAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 1200, DefaultHalfLife_hr: 5 },
  },

  AA_PHE: {
    element: {
      DisplayName_zh: "苯丙胺酸",
      DisplayName_en: "Phenylalanine",
      FullName_en: "Phenylalanine",
      Standard_Unit: "mg",
      Category: "AminoAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 2000, DefaultHalfLife_hr: 4 },
  },

  AA_THR: {
    element: {
      DisplayName_zh: "蘇胺酸",
      DisplayName_en: "Threonine",
      FullName_en: "Threonine",
      Standard_Unit: "mg",
      Category: "AminoAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 1500, DefaultHalfLife_hr: 3 },
  },

  AA_TRP: {
    element: {
      DisplayName_zh: "色胺酸",
      DisplayName_en: "Tryptophan",
      FullName_en: "Tryptophan",
      Standard_Unit: "mg",
      Category: "AminoAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 300, DefaultHalfLife_hr: 6 },
  },

  AA_HIS: {
    element: {
      DisplayName_zh: "組胺酸",
      DisplayName_en: "Histidine",
      FullName_en: "Histidine",
      Standard_Unit: "mg",
      Category: "AminoAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 1000, DefaultHalfLife_hr: 5 },
  },

  /* =========================
   * Non-Essential / Conditional (11)
   * ========================= */
  AA_ALA: {
    element: {
      DisplayName_zh: "丙胺酸",
      DisplayName_en: "Alanine",
      FullName_en: "Alanine",
      Standard_Unit: "mg",
      Category: "AminoAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 2000, DefaultHalfLife_hr: 2 },
  },

  AA_ASP: {
    element: {
      DisplayName_zh: "天門冬胺酸",
      DisplayName_en: "Aspartic Acid",
      FullName_en: "Aspartic Acid",
      Standard_Unit: "mg",
      Category: "AminoAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 2000, DefaultHalfLife_hr: 2 },
  },

  AA_ASN: {
    element: {
      DisplayName_zh: "天門冬醯胺",
      DisplayName_en: "Asparagine",
      FullName_en: "Asparagine",
      Standard_Unit: "mg",
      Category: "AminoAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 1500, DefaultHalfLife_hr: 3 },
  },

  AA_GLU: {
    element: {
      DisplayName_zh: "麩胺酸",
      DisplayName_en: "Glutamic Acid",
      FullName_en: "Glutamic Acid",
      Standard_Unit: "mg",
      Category: "AminoAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 3000, DefaultHalfLife_hr: 2 },
  },

  AA_GLN: {
    element: {
      DisplayName_zh: "麩醯胺",
      DisplayName_en: "Glutamine",
      FullName_en: "Glutamine",
      Standard_Unit: "mg",
      Category: "AminoAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 5000, DefaultHalfLife_hr: 1 },
  },

  AA_GLY: {
    element: {
      DisplayName_zh: "甘胺酸",
      DisplayName_en: "Glycine",
      FullName_en: "Glycine",
      Standard_Unit: "mg",
      Category: "AminoAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 3000, DefaultHalfLife_hr: 4 },
  },

  AA_PRO: {
    element: {
      DisplayName_zh: "脯胺酸",
      DisplayName_en: "Proline",
      FullName_en: "Proline",
      Standard_Unit: "mg",
      Category: "AminoAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 2000, DefaultHalfLife_hr: 4 },
  },

  AA_SER: {
    element: {
      DisplayName_zh: "絲胺酸",
      DisplayName_en: "Serine",
      FullName_en: "Serine",
      Standard_Unit: "mg",
      Category: "AminoAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 1500, DefaultHalfLife_hr: 3 },
  },

  AA_TYR: {
    element: {
      DisplayName_zh: "酪胺酸",
      DisplayName_en: "Tyrosine",
      FullName_en: "Tyrosine",
      Standard_Unit: "mg",
      Category: "AminoAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 1500, DefaultHalfLife_hr: 4 },
  },

  AA_CYS: {
    element: {
      DisplayName_zh: "半胱胺酸",
      DisplayName_en: "Cysteine",
      FullName_en: "Cysteine",
      Standard_Unit: "mg",
      Category: "AminoAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 1000, DefaultHalfLife_hr: 5 },
  },

  AA_ARG: {
    element: {
      DisplayName_zh: "精胺酸",
      DisplayName_en: "Arginine",
      FullName_en: "Arginine",
      Standard_Unit: "mg",
      Category: "AminoAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 4000, DefaultHalfLife_hr: 2 },
  },

  /* =========================
   * Functional / Derivatives
   * ========================= */
  AA_D_NAC: {
    element: {
      DisplayName_zh: "N-乙醯半胱胺酸",
      DisplayName_en: "NAC",
      FullName_en: "N-Acetyl Cysteine",
      Standard_Unit: "mg",
      Category: "AminoAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 600, DefaultHalfLife_hr: 6 },
  },

  AA_TAU: {
    element: {
      DisplayName_zh: "牛磺酸",
      DisplayName_en: "Taurine",
      FullName_en: "Taurine",
      Standard_Unit: "mg",
      Category: "AminoAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 3000, DefaultHalfLife_hr: 6 },
  },

  AA_CREA: {
    element: {
      DisplayName_zh: "肌酸",
      DisplayName_en: "Creatine",
      FullName_en: "Creatine",
      Standard_Unit: "mg",
      Category: "AminoAcids",
      isAIRequired: true,
      isVisible: true,
    },
    model: { DefaultTarget: 5000, DefaultHalfLife_hr: 24 },
  },
} as const;