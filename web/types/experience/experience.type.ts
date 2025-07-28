export type ExperienceBase = {
  position: string;
  description?: string;
  starting_date: string;
  ending_date?: string | null;
};

export type ExperienceCreate = ExperienceBase;

export type ExperienceUpdate = {
  position?: string;
  description?: string;
  starting_date?: string;
  ending_date?: string | null;
};

export type ExperienceOut = ExperienceBase & {
  id: string;
};