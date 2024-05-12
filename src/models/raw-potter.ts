import { Potter } from "./potter";

export interface RawPotter extends Omit<Potter, "release_date"> {
  release_date: string;
}
