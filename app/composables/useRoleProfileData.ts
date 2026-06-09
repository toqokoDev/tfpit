import { getTableNameByRole, type RoleTableName } from '~~/shared/utils/role-profiles';

type RoleDataMap = Map<string, Record<string, unknown>>;

export function useRoleProfileData() {
  const supabase = useSupabaseClient<Database>();

  async function fetchRoleProfileForUser(
    userId: string,
    roleTitle: string | null | undefined,
  ): Promise<Record<string, unknown> | null> {
    const tableName = roleTitle ? getTableNameByRole(roleTitle) : null;
    if (!tableName) return null;

    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async function fetchRoleProfilesForUsers(
    users: Array<{ id: string; role?: { title: string } | null }>,
  ): Promise<RoleDataMap> {
    const usersByTable = new Map<RoleTableName, string[]>();

    for (const user of users) {
      const tableName = user.role?.title ? getTableNameByRole(user.role.title) : null;
      if (!tableName) continue;

      const ids = usersByTable.get(tableName) || [];
      ids.push(user.id);
      usersByTable.set(tableName, ids);
    }

    const result: RoleDataMap = new Map();

    await Promise.all(
      [...usersByTable.entries()].map(async ([tableName, userIds]) => {
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .in('user_id', userIds);

        if (error) throw error;

        for (const row of data || []) {
          result.set(row.user_id, row);
        }
      }),
    );

    return result;
  }

  return {
    fetchRoleProfileForUser,
    fetchRoleProfilesForUsers,
  };
}
