import { TestPurposes, TestRoleNames, TestTypes } from '@eios/tests-common';
import { Nullable } from '../../../types/nullable.type';
import { Uuid } from '../../../types/uuid.type';

//УДАЛИТЬ как новую страницу сделаю настроек теста
export interface TestDataForSettings {
  id: string;
  shortName: string;
  fullName: string;
  objective: string | null;
  description: string | null;
  type: TestTypes;
  purpose: TestPurposes | null;
  disciplines: TestDiscipline[] | null;
  usersWithRoles: UserWithRole[];
  divisionsWithRoles: DivisionWithRole[];
  defaultSessionSettings: DataForDefaultTestSettings;
  created: string;
  updated: string;
  deleted: string | null;
}

export interface DataForTestSettingsGeneral {
  shortName: string;
  fullName: string;
  objective: string | null;
  description: string | null;
  type: TestTypes;
  purpose: TestPurposes | null;
  disciplines: TestDiscipline[] | null;
}
export interface DataForTestSettingsRights {
  testId: string;
  usersWithRoles: UserWithRole[];
  divisionsWithRoles: DivisionWithRole[];
}
export interface DataForDefaultTestSettings {
  duration: Nullable<number>;
  maxAttemptsCount: Nullable<number>;
  maxAttemptDuration: Nullable<number>;
}

export interface UserWithRole {
  id: Uuid;
  name: string;
  roleNames: TestRoleNames[];
}
export interface DivisionWithRole {
  id: Uuid;
  shortName: string;
  fullName: string;
  roleNames: TestRoleNames[];
}

//УДАЛИТЬ как новую страницу сделаю настроек теста
export interface TestDiscipline {
  id: string;
  fullName: string;
}
