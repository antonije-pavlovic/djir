/* eslint-disable no-undef */

exports.shorthands = undefined;

exports.up = async pgm => {
//   CREATE temp_role
  await pgm.db.query(`INSERT INTO template_roles (id, name) VALUES (1,'publicUser')`);

  // CREATE temp permissions
  await pgm.db.query(`INSERT INTO template_permissions (id, name) VALUES (1, 'publicCommentRead')`);
  await pgm.db.query(`INSERT INTO template_permissions (id, name) VALUES (2, 'publicCommentWrite')`);
  await pgm.db.query(`INSERT INTO template_permissions (id, name) VALUES (3, 'publicCommentPost')`);


  // CREATE temp_role_temp_permission RELATION
  await pgm.db.query(`INSERT INTO temp_role_temp_permission (temp_role_id, temp_permission_id) VALUES(1, 1)`)
  await pgm.db.query(`INSERT INTO temp_role_temp_permission (temp_role_id, temp_permission_id) VALUES(1, 2)`)
  await pgm.db.query(`INSERT INTO temp_role_temp_permission (temp_role_id, temp_permission_id) VALUES(1, 3)`)


  // CREATE role
  await pgm.db.query(`INSERT INTO roles(id, name, temp_role_id) VALUES (1, 'publicUser', 1)`);

  // CREATE PERMISSIONS
  await pgm.db.query(`INSERT INTO permissions (id, name, temp_permission_id) VALUES (1, 'publicCommentRead', 1)`);
  await pgm.db.query(`INSERT INTO permissions (id, name, temp_permission_id) VALUES (2, 'publicCommentWrite', 2)`);
  await pgm.db.query(`INSERT INTO permissions (id, name, temp_permission_id) VALUES (3, 'publicCommentPost', 2)`);

  // CREATE ROLE PERMISSION RELEATION
  await pgm.db.query(`INSERT INTO role_permission (role_id, permission_id) VALUES(1, 1)`)
  await pgm.db.query(`INSERT INTO role_permission (role_id, permission_id) VALUES(1, 2)`)
  await pgm.db.query(`INSERT INTO role_permission (role_id, permission_id) VALUES(1, 3)`)

};

exports.down = async pgm => {
  // DELETE RELATIONS
  await pgm.db.query(`DELETE FROM temp_role_temp_permission WHERE temp_role_id=1`);
  await pgm.db.query(`DELETE FROM role_permission WHERE role_id=1`);

  // DELETE ROLES
  await pgm.db.query(`DELETE FROM roles WHERE id=1`);
  await pgm.db.query(`DELETE FROM template_roles WHERE id=1`);

  // DELETE PERMISSIONS
  await pgm.db.query(`DELETE FROM permissions WHERE id=1`);
  await pgm.db.query(`DELETE FROM permissions WHERE id=2`);
  await pgm.db.query(`DELETE FROM permissions WHERE id=3`);

  await pgm.db.query(`DELETE FROM template_permissions WHERE id=1`);
  await pgm.db.query(`DELETE FROM template_permissions WHERE id=2`);
  await pgm.db.query(`DELETE FROM template_permissions WHERE id=3`);
};
