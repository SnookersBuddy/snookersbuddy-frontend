export enum AssignmentAvailability {
  Free = "FREE",
  Reserved = "RESERVED",
  Occupied = "OCCUPIED",
  Blocked = "BLOCKED",
}

export type Assignment = {
  id: number;
  abbreviation: string;
  custom: boolean;
  displayName: string;
  availability: AssignmentAvailability;
};
