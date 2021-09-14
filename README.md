# Create View Query For User, Role and Permission

# Please ensure all related table must have data

# Query Start

CREATE VIEW user_role_permissions AS
SELECT u.id AS user_id,
u.name AS user_name,
urp.role_id,
roles.name AS role_name,
rpm.permission_id,
permissions.name AS permission_name,
u.status
FROM ((((users u
JOIN user_role urp ON ((u.id = urp.user_id)))
JOIN role_permission rpm ON ((urp.role_id = rpm.role_id)))
JOIN roles ON ((rpm.role_id = roles.id)))
JOIN permissions ON ((rpm.permission_id = permissions.id)))
ORDER BY u.id, urp.role_id, rpm.permission_id;

# Query End

