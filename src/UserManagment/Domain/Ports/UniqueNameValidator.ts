
export interface UniqueNameValidator {
    isUnique(name: string): Promise<boolean>;
  }
  