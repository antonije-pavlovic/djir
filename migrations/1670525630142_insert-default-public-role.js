/* eslint-disable no-undef */

exports.shorthands = undefined;
const roleName = 'publicUser'
const roleIdentifier = 1;

const templatePermissions = ['publicCommentRead', 'publicCommentWrite', 'publicCommentPost'];
exports.up = async pgm => {
  // CREATE temp_role
  await pgm.db.query(`INSERT INTO template_roles (name) VALUES ('${roleName}')`);
  const tempRoleId = await pgm.db.query(`SELECT id FROM template_roles WHERE name='${roleName}'`);

  // // CREATE temp permissions
  for(let i = 0 ; i< templatePermissions.length; i++) {
    await pgm.db.query(`INSERT INTO template_permissions (name) VALUES ('${templatePermissions[i]}')`);
  }

  const allTempPublicPermissions = await pgm.db.query(`
    SELECT * FROM template_permissions`)

  // // CREATE temp_role_temp_permission RELATION
  const tempPermissions = allTempPublicPermissions.rows;
  for (let i = 0; i < tempPermissions.length; i++) {
    await pgm.db.query(`
    INSERT INTO temp_role_temp_permission (temp_role_id, temp_permission_id)
    VALUES(${tempRoleId.rows[0].id}, ${tempPermissions[i].id})`)
  }

  // // CREATE role
  await pgm.db.query(
    `INSERT INTO roles(temp_role_id, refers_to) VALUES (${tempRoleId.rows[0].id }, ${roleIdentifier})`);
  const roleId = await pgm.db.query(`SELECT id FROM roles WHERE temp_role_id='${tempRoleId.rows[0].id }'`);

  // // create role_permission
  const tempPermissionIds = [];
  for(let i = 0; i < tempPermissions.length; i ++) {
    await pgm.db.query(`INSERT INTO permissions (temp_permission_id)
      VALUES (${tempPermissions[i].id})`);
    tempPermissionIds.push(tempPermissions[i].id);
  }
  const allPermissions = await pgm.db.query(`
    SELECT * FROM permissions WHERE temp_permission_id IN (${tempPermissionIds})`);

  for(let i = 0; i < allPermissions.rows.length; i++) {
    await pgm.db.query(`
      INSERT INTO role_permission (role_id, permission_id)
      VALUES('${roleId.rows[0].id}', ${allPermissions.rows[i].id})`)
  }

};

exports.down = async pgm => {
  const tempRoleId = await pgm.db.query(`SELECT id FROM template_roles WHERE name='${roleName}'`);
  const roleId = await pgm.db.query(`SELECT id FROM roles WHERE refers_to='${roleIdentifier}'`);


  await pgm.db.query(`DELETE FROM temp_role_temp_permission WHERE temp_role_id=(${tempRoleId.rows[0].id})`);
  await pgm.db.query(`DELETE FROM role_permission WHERE role_id='${roleId.rows[0].id}'`);


  await pgm.db.query(`DELETE FROM roles WHERE temp_role_id='${tempRoleId.rows[0].id}'`);
  await pgm.db.query(`DELETE FROM template_roles WHERE name='${roleName}'`);

  await pgm.db.query(`DELETE FROM permissions `);
  await pgm.db.query(`DELETE FROM template_permissions`);
};
