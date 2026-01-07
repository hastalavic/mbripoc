// app/_repository/data/AminoAcids.constants.ts

// === 氨基酸 (Amino Acids) ===
export const AA_ELEMENTS = {  
  AA_GLY: { 
    element: {
      DisplayName_zh: "甘胺酸", 
      DisplayName_en: "Glycine",
      Name_en: "Glycine",
      Standard_Unit: "mg", 
      Category: "Bioactives",
      isAIRequired: true, 
      isVisible: true, 
    },
    model: {
      DefaultTarget: 3000, 
      DefaultHalfLife_hr: 4, 
    }
  },
  AA_D_NAC: { 
    element: {
      DisplayName_zh: "N-乙醯半胱胺酸", 
      DisplayName_en: "NAC",
      Name_en: "N-Acetyl Cysteine",
      Standard_Unit: "mg", 
      Category: "Bioactives",
      isAIRequired: true, 
      isVisible: true, 
    },
    model: {
      DefaultTarget: 600, 
      DefaultHalfLife_hr: 6, 
    }
  },
} as const;