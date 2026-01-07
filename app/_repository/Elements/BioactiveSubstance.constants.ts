// app/_repository/data/BioactiveSubstance.constants.ts


export const PHY_ELEMENTS = {  
  PHY_CUR: { 
    element: {
      DisplayName_zh: "薑黃素", 
      DisplayName_en: "Curcumin",
      Name_en: "Curcumin",
      Standard_Unit: "mg", 
      Category: "Bioactives",
      isAIRequired: true, 
      isVisible: true, 
    },
    model: {
      DefaultTarget: 200, 
      DefaultHalfLife_hr: 8, 
    }
  },
} as const;