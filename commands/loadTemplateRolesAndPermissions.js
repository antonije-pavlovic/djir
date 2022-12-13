/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');

async function load() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    max: 20
  });

  await client.connect();

  const res = await client.query(`SELECT *, TR.name as role_name, TP.name as permission_name
                    FROM template_roles TR
                    JOIN temp_role_temp_permission TEMP_RP
                      ON TR.id = TEMP_RP.temp_role_id
                    JOIN template_permissions TP
                      ON TEMP_RP.temp_permission_id = TP.id`)
  const rolePermissionMap = {};

  for(let i = 0; i < res.rows.length; i++) {
    if(rolePermissionMap[res.rows[i].role_name]) {
      rolePermissionMap[res.rows[i].role_name].permissions.push({
        name: res.rows[i].permission_name,
        id: res.rows[i].temp_permission_id
      });
    } else {
      rolePermissionMap[res.rows[i].role_name] = {
        id: res.rows[i].temp_role_id,
        permissions: [
          {
            name: res.rows[i].permission_name,
            id: res.rows[i].temp_permission_id
          }
        ]
      }
    }
  }

  await client.end();
  const file = './global/templateRolesAndPermissions.json'
  fs.writeFileSync(file, JSON.stringify(rolePermissionMap), 'utf8');
  // eslint-disable-next-line @typescript-eslint/no-loss-of-precision, no-octal
  fs.chmodSync(file, 0444);
}
load();