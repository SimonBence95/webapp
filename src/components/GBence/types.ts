export interface House {
    id: string | undefined;
    houseId: string;
    name: string;
    image: string;
    commonRoom: string;
    element: string;
    animal: string;
    ghost: string;
    founder: string;
    traits: string[];
    houseColors: string[];
    heads: string[];
    points: number; // Only visible to logged-in users
  }