export interface Note {
  key: string;
  length: number;
  /** 0-indexed position of a note within each row */
  position: number;
}
