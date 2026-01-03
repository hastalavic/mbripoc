// app/_repository/data/AminoAcids.constants.ts

// === 氨基酸 (Amino Acids) ===
export const AA_ELEMENTS = {  
  AA_GLY:    { 
    DisplayName: "甘胺酸", 
    Category: "Bioactives",
    Standard_Unit: "mg", 
    isAIRequired: true, 
    isVisible: true, 
    DefaultTarget: 3000, 
    DefaultHalfLife_hr: 4, 
  },
  AA_D_NAC:  { 
    DisplayName: "N-乙醯半胱胺酸", 
    Category: "Bioactives",
    Standard_Unit: "mg", 
    isAIRequired: true, 
    isVisible: true, 
    DefaultTarget: 600, 
    DefaultHalfLife_hr: 6, 
    
  },
} as const;