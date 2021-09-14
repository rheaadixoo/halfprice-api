export class Query {
  static getActiveUserAndPermissions(userId: number | string) {
    return `
        SELECT user_id, user_name, status,
        ARRAY_AGG (DISTINCT trim(role_name)) AS roles, 
        ARRAY_AGG (DISTINCT trim(permission_name)) AS permissions 
        FROM user_role_permissions 
        WHERE user_id = ${userId} 
        GROUP BY user_id,user_name, status;
    `;
  }
}
