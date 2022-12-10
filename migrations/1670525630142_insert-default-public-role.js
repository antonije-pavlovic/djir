/* eslint-disable no-undef */

exports.shorthands = undefined;

exports.up = async pgm => {
  // CREATE temp_role
  await pgm.db.query(`INSERT INTO template_roles (name) VALUES ('publicRole')`);
  const tempRoleId = await pgm.db.query(`SELECT id FROM template_roles WHERE name='publicRole'`);

  // CREATE temp permissions
  await pgm.db.query(`INSERT INTO template_permissions (name, unique_permission_id) VALUES ('publicCommentRead', 1)`);
  await pgm.db.query(`INSERT INTO template_permissions (name, unique_permission_id) VALUES ('publicCommentWrite', 2)`);
  await pgm.db.query(`INSERT INTO template_permissions (name, unique_permission_id) VALUES ('publicCommentPost', 3)`);

  const allTempPublicPermissions = await pgm.db.query(`
    SELECT * FROM template_permissions WHERE name IN ('publicCommentRead', 'publicCommentWrite', 'publicCommentPost')`)

  // CREATE temp_role_temp_permission RELATION
  const tempPermissions = allTempPublicPermissions.rows;
  for (let i = 0; i < tempPermissions.length; i++) {
    await pgm.db.query(`
    INSERT INTO temp_role_temp_permission (temp_role_id, temp_permission_id)
    VALUES(${tempRoleId.rows[0].id}, ${tempPermissions[i].id})`)
  }

  // create relation to code_book
  await pgm.db.query(`INSERT INTO code_book (name, temp_role_id) VALUES ('publicRole', ${tempRoleId.rows[0].id})`);

  // CREATE role
  await pgm.db.query(
    `INSERT INTO roles(name, temp_role_id) VALUES ('publicRole', ${tempRoleId.rows[0].id })`);
  // CREATE permissions
  const roleId = await pgm.db.query(`SELECT id FROM roles WHERE name='publicRole'`);
  // create role_permission
  for(let i = 0; i < tempPermissions.length; i ++) {
    await pgm.db.query(`INSERT INTO permissions (name, temp_permission_id)
      VALUES ('${tempPermissions[i].name}', ${tempPermissions[i].id})`);
  }
  const allPermissions = await pgm.db.query(`
    SELECT * FROM permissions WHERE name IN ('publicCommentRead', 'publicCommentWrite', 'publicCommentPost')`);

  for(let i = 0; i < allPermissions.rows.length; i++) {
    await pgm.db.query(`
    INSERT INTO role_permission (role_id, permission_id)
    VALUES('${roleId.rows[0].id}', ${allPermissions.rows[i].id})`)
  }

};

exports.down = async pgm => {
  const tempRoleId = await pgm.db.query(`SELECT id FROM template_roles WHERE name='publicRole'`);
  const roleId = await pgm.db.query(`SELECT id FROM roles WHERE name='publicRole'`);


  await pgm.db.query(`DELETE FROM code_book WHERE name='publicRole'`);


  await pgm.db.query(`DELETE FROM temp_role_temp_permission WHERE temp_role_id=(${tempRoleId.rows[0].id})`);
  await pgm.db.query(`DELETE FROM role_permission WHERE role_id='${roleId.rows[0].id}'`);



  await pgm.db.query(`DELETE FROM roles WHERE name='publicRole'`);
  await pgm.db.query(`DELETE FROM template_roles WHERE name='publicRole'`);


  await pgm.db.query(`DELETE FROM permissions
      WHERE name IN ('publicCommentRead', 'publicCommentWrite', 'publicCommentPost')`);
  await pgm.db.query(`DELETE FROM template_permissions
      WHERE name IN ('publicCommentRead', 'publicCommentWrite', 'publicCommentPost')`);

};
