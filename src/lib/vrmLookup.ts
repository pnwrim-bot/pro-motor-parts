// Mock VRM lookup service - simulates DVLA/vehicle data API
export interface VehicleData {
  vrm: string;
  make: string;
  model: string;
  year: number;
  engineCode: string;
  engineSize: string;
  fuelType: string;
  transmission: string;
  bodyType: string;
  colour: string;
  doors: number;
  motExpiry: string;
  taxStatus: string;
}

export interface CompatiblePart {
  id: string;
  name: string;
  brand: string;
  partNumber: string;
  oeNumbers: string[];
  price: number;
  originalPrice?: number;
  inStock: boolean;
  stockCount: number;
  category: string;
  isOeQuality: boolean;
  fitmentNotes?: string;
}

// Mock vehicle database
const mockVehicles: Record<string, VehicleData> = {
  "AB12CDE": {
    vrm: "AB12 CDE",
    make: "Volkswagen",
    model: "Golf GTI",
    year: 2019,
    engineCode: "DLBA",
    engineSize: "2.0 TSI",
    fuelType: "Petrol",
    transmission: "DSG Automatic",
    bodyType: "Hatchback",
    colour: "Pure White",
    doors: 5,
    motExpiry: "2025-08-15",
    taxStatus: "Taxed",
  },
  "MK67XYZ": {
    vrm: "MK67 XYZ",
    make: "BMW",
    model: "320d M Sport",
    year: 2017,
    engineCode: "B47D20",
    engineSize: "2.0 Diesel",
    fuelType: "Diesel",
    transmission: "8-Speed Auto",
    bodyType: "Saloon",
    colour: "Mineral Grey",
    doors: 4,
    motExpiry: "2025-03-22",
    taxStatus: "Taxed",
  },
  "YN19ABC": {
    vrm: "YN19 ABC",
    make: "Audi",
    model: "A4 S-Line",
    year: 2019,
    engineCode: "DETA",
    engineSize: "2.0 TDI",
    fuelType: "Diesel",
    transmission: "S-Tronic",
    bodyType: "Saloon",
    colour: "Mythos Black",
    doors: 4,
    motExpiry: "2025-11-30",
    taxStatus: "Taxed",
  },
  "WR21DEF": {
    vrm: "WR21 DEF",
    make: "Ford",
    model: "Focus ST",
    year: 2021,
    engineCode: "M9DA",
    engineSize: "2.3 EcoBoost",
    fuelType: "Petrol",
    transmission: "6-Speed Manual",
    bodyType: "Hatchback",
    colour: "Performance Blue",
    doors: 5,
    motExpiry: "2026-02-14",
    taxStatus: "Taxed",
  },
};

// Mock compatible parts by engine code
const mockPartsByEngine: Record<string, CompatiblePart[]> = {
  "DLBA": [
    {
      id: "1",
      name: "Timing Chain Kit with VVT Actuator",
      brand: "INA",
      partNumber: "INA-559003710",
      oeNumbers: ["06K109158BK", "06L109088E"],
      price: 189.99,
      originalPrice: 249.99,
      inStock: true,
      stockCount: 23,
      category: "Engine",
      isOeQuality: true,
      fitmentNotes: "Includes chain, tensioner, guides, and VVT actuator",
    },
    {
      id: "2",
      name: "Water Pump Assembly",
      brand: "HEPU",
      partNumber: "P659",
      oeNumbers: ["06L121011B", "06L121011H"],
      price: 78.50,
      inStock: true,
      stockCount: 45,
      category: "Cooling",
      isOeQuality: true,
    },
    {
      id: "3",
      name: "Turbocharger IS38",
      brand: "BorgWarner",
      partNumber: "BW-06K145722H",
      oeNumbers: ["06K145722H", "06K145702Q"],
      price: 1250.00,
      originalPrice: 1450.00,
      inStock: true,
      stockCount: 3,
      category: "Engine",
      isOeQuality: true,
      fitmentNotes: "OE specification turbo with actuator",
    },
    {
      id: "4",
      name: "Spark Plug Set (4pcs)",
      brand: "NGK",
      partNumber: "NGK-95770",
      oeNumbers: ["06K905601D"],
      price: 42.99,
      inStock: true,
      stockCount: 150,
      category: "Ignition",
      isOeQuality: true,
    },
    {
      id: "5",
      name: "Oil Filter",
      brand: "MANN",
      partNumber: "HU7020z",
      oeNumbers: ["06L115562"],
      price: 12.99,
      inStock: true,
      stockCount: 200,
      category: "Filtration",
      isOeQuality: true,
    },
    {
      id: "6",
      name: "Brake Pad Set Front",
      brand: "TRW",
      partNumber: "GDB1956",
      oeNumbers: ["5Q0698151S"],
      price: 54.99,
      inStock: true,
      stockCount: 67,
      category: "Braking",
      isOeQuality: true,
    },
  ],
  "B47D20": [
    {
      id: "7",
      name: "Timing Chain Kit Complete",
      brand: "Febi Bilstein",
      partNumber: "47978",
      oeNumbers: ["11318510014", "11318510015"],
      price: 215.00,
      originalPrice: 289.00,
      inStock: true,
      stockCount: 12,
      category: "Engine",
      isOeQuality: true,
    },
    {
      id: "8",
      name: "EGR Valve",
      brand: "Pierburg",
      partNumber: "7.03622.10.0",
      oeNumbers: ["11717810871"],
      price: 189.99,
      inStock: true,
      stockCount: 8,
      category: "Emissions",
      isOeQuality: true,
    },
    {
      id: "9",
      name: "Fuel Filter",
      brand: "MANN",
      partNumber: "WK820/18",
      oeNumbers: ["13328591019"],
      price: 28.50,
      inStock: true,
      stockCount: 89,
      category: "Filtration",
      isOeQuality: true,
    },
    {
      id: "10",
      name: "Brake Disc Set Front",
      brand: "Brembo",
      partNumber: "09.C401.13",
      oeNumbers: ["34116860907"],
      price: 165.00,
      inStock: true,
      stockCount: 24,
      category: "Braking",
      isOeQuality: true,
    },
  ],
  "DETA": [
    {
      id: "11",
      name: "DPF Pressure Sensor",
      brand: "Bosch",
      partNumber: "0281006082",
      oeNumbers: ["059906051C"],
      price: 68.99,
      inStock: true,
      stockCount: 15,
      category: "Emissions",
      isOeQuality: true,
    },
    {
      id: "12",
      name: "Injector Set (4pcs)",
      brand: "Bosch",
      partNumber: "0445110471",
      oeNumbers: ["04L130277AC"],
      price: 520.00,
      originalPrice: 620.00,
      inStock: true,
      stockCount: 6,
      category: "Fuel System",
      isOeQuality: true,
    },
    {
      id: "13",
      name: "Thermostat Housing",
      brand: "Wahler",
      partNumber: "410671.87D",
      oeNumbers: ["04L121111N"],
      price: 45.99,
      inStock: true,
      stockCount: 33,
      category: "Cooling",
      isOeQuality: true,
    },
  ],
  "M9DA": [
    {
      id: "14",
      name: "Turbo Inlet Pipe",
      brand: "Forge Motorsport",
      partNumber: "FMINLMK4",
      oeNumbers: ["LX6E-9F472-CE"],
      price: 189.00,
      inStock: true,
      stockCount: 7,
      category: "Induction",
      isOeQuality: false,
    },
    {
      id: "15",
      name: "Clutch Kit Complete",
      brand: "LuK",
      partNumber: "624393800",
      oeNumbers: ["G1FZ-7563-A"],
      price: 385.00,
      inStock: true,
      stockCount: 4,
      category: "Transmission",
      isOeQuality: true,
    },
    {
      id: "16",
      name: "Intercooler",
      brand: "Mishimoto",
      partNumber: "MMINT-RS-16",
      oeNumbers: ["G1FY-6K775-A"],
      price: 450.00,
      originalPrice: 520.00,
      inStock: false,
      stockCount: 0,
      category: "Cooling",
      isOeQuality: false,
      fitmentNotes: "Performance upgrade - larger core",
    },
  ],
};

// Default parts if engine code not found
const defaultParts: CompatiblePart[] = [
  {
    id: "d1",
    name: "Air Filter Element",
    brand: "MANN",
    partNumber: "C30189",
    oeNumbers: ["Various"],
    price: 18.99,
    inStock: true,
    stockCount: 100,
    category: "Filtration",
    isOeQuality: true,
  },
  {
    id: "d2",
    name: "Wiper Blade Set",
    brand: "Bosch",
    partNumber: "3397014208",
    oeNumbers: ["Various"],
    price: 28.99,
    inStock: true,
    stockCount: 50,
    category: "Accessories",
    isOeQuality: true,
  },
];

// Normalize VRM for lookup
function normalizeVrm(vrm: string): string {
  return vrm.replace(/\s+/g, "").toUpperCase();
}

// Simulate API delay
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function lookupVehicle(vrm: string): Promise<VehicleData | null> {
  await delay(800); // Simulate network delay
  
  const normalized = normalizeVrm(vrm);
  return mockVehicles[normalized] || null;
}

export async function getCompatibleParts(engineCode: string): Promise<CompatiblePart[]> {
  await delay(500); // Simulate network delay
  
  const parts = mockPartsByEngine[engineCode];
  return parts || defaultParts;
}

export function formatVrm(vrm: string): string {
  const normalized = normalizeVrm(vrm);
  if (normalized.length === 7) {
    return `${normalized.slice(0, 4)} ${normalized.slice(4)}`;
  }
  return vrm;
}
