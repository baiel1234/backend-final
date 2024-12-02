import { SetMetadata } from '@nestjs/common';

export const ROLE_IDS_KEY = 'roleIds';
export const RoleIds = (...roleIds: number[]) => SetMetadata(ROLE_IDS_KEY, roleIds);
